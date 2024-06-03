<template>
  <div class="login">
    <h1 class="text-2xl font-bold text-center my-10">登录</h1>
    <section>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
            @blur="onUsernameBlur"
            :rules="[{ required: true, message: '请填写用户名' }]" />
          <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit" :disabled="!checked">
            登录
          </van-button>
        </div>
        <div class="links">
          <div @click="toRegister" class="link-left">无账号？点击注册</div>
          <div @click="forgotPassword" class="link-right">忘记密码？</div>
        </div>
        <van-field name="remember">
          <template #input>
            <div class="checkbox-label small-font">
              <van-checkbox v-model="rememberPassword" class="small-checkbox"></van-checkbox>
              <span>记住密码</span>
            </div>
          </template>
        </van-field>
        <van-field name="checkbox">
          <template #input>
            <div class="checkbox-label small-font">
              <van-checkbox v-model="checked" class="small-checkbox"></van-checkbox>
              <span>已阅读并同意<a class="font-bold" href="#">《用户协议》</a></span>
            </div>
          </template>
        </van-field>
      </van-form>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { showSuccessToast, showFailToast } from 'vant';
import apiClient from '@/utils/axios';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { useUserStore } from '@/stores/user';

const username = ref('');
const password = ref('');
const checked = ref(false);
const rememberPassword = ref(false);
const router = useRouter();
const secretKey = import.meta.env.VITE_APP_SECRET_KEY; // 从环境变量中获取加密密钥
// console.log("secretKey: ", secretKey);

const userStore = useUserStore();

onMounted(() => {
  const savedUsername = localStorage.getItem('username');
  const savedPassword = localStorage.getItem('password');
  if (savedUsername && savedPassword) {
    username.value = savedUsername;
    password.value = CryptoJS.AES.decrypt(savedPassword, secretKey).toString(CryptoJS.enc.Utf8);
    rememberPassword.value = true;
  }

  const sessionActive = sessionStorage.getItem('sessionActive');
  if (sessionActive) {
    // console.log('检测到活动会话，自动登录');
    router.push('/home');
  }
});

const onUsernameBlur = () => {
  const savedPassword = localStorage.getItem(username.value);
  if (savedPassword) {
    password.value = CryptoJS.AES.decrypt(savedPassword, secretKey).toString(CryptoJS.enc.Utf8);
    rememberPassword.value = true; // 自动填充密码时勾选 "记住密码"
  } else {
    password.value = '';
  }
};

const onSubmit = async () => {
  try {
    // console.log('提交的表单值:', { username: username.value, password: password.value, rememberPassword: rememberPassword.value });
    const response = await apiClient.post('/api/users/login', {
      username: username.value,
      password: password.value,
    });
    // console.log('登录成功', response.data);

    userStore.setToken(response.data.token);

    if (rememberPassword.value) {
      const encryptedPassword = CryptoJS.AES.encrypt(password.value, secretKey).toString();
      localStorage.setItem(username.value, encryptedPassword);
    } else {
      localStorage.removeItem(username.value);
    }

    sessionStorage.setItem('sessionActive', 'true');

    showSuccessToast('登录成功');
    setTimeout(() => {
      // router.push('/home');
      location.reload(); // 自动刷新页面
    }, 1000);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('登录失败', error.response?.data);
      showFailToast(`登录失败: ${error.response?.data?.message || '未知错误'}`);
    } else {
      console.error('发生意外错误', error);
      showFailToast('发生意外错误');
    }
  }
};

const toRegister = () => {
  router.push('/register');
};

const forgotPassword = () => {
  router.push('/forgot');
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.checkbox-label {
  display: flex;
  align-items: center;
}

.checkbox-label span {
  margin-left: 8px;
}

.small-font {
  font-size: 12px;
}

.links {
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
}

.link-left {
  cursor: pointer;
  color: #007bff;
}

.link-right {
  cursor: pointer;
  color: #007bff;
}
</style>
