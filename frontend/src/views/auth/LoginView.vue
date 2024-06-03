<template>
  <div class="login">
    <h1 class="text-2xl font-bold text-center my-10">Login</h1>
    <section>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="username" name="username" label="Username" placeholder="Username" @blur="onUsernameBlur"
            :rules="[{ required: true, message: 'Please enter username' }]" />
          <van-field v-model="password" type="password" name="password" label="Password" placeholder="Password"
            :rules="[{ required: true, message: 'Please enter password' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit" :disabled="!checked">
            Login
          </van-button>
        </div>
        <div class="links">
          <div @click="toRegister" class="link-left">No account? Register here</div>
          <div @click="forgotPassword" class="link-right">Forgot password?</div>
        </div>
        <van-field name="remember">
          <template #input>
            <div class="checkbox-label small-font">
              <van-checkbox v-model="rememberPassword" class="small-checkbox"></van-checkbox>
              <span>Remember password</span>
            </div>
          </template>
        </van-field>
        <van-field name="checkbox">
          <template #input>
            <div class="checkbox-label small-font">
              <van-checkbox v-model="checked" class="small-checkbox"></van-checkbox>
              <span>I have read and agree to the <a class="font-bold" href="#">User Agreement</a></span>
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
const secretKey = import.meta.env.VITE_APP_SECRET_KEY || 'your-secret-key';

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
    router.push('/home');
  }
});

const onUsernameBlur = () => {
  const savedPassword = localStorage.getItem(username.value);
  if (savedPassword) {
    password.value = CryptoJS.AES.decrypt(savedPassword, secretKey).toString(CryptoJS.enc.Utf8);
    rememberPassword.value = true; // Automatically check "Remember password" when password is autofilled
  } else {
    password.value = '';
  }
};

const onSubmit = async () => {
  try {
    const response = await apiClient.post('/api/users/login', {
      username: username.value,
      password: password.value,
    });
    userStore.setUsername(username.value);

    if (rememberPassword.value) {
      const encryptedPassword = CryptoJS.AES.encrypt(password.value, secretKey).toString();
      localStorage.setItem(username.value, encryptedPassword);
    } else {
      localStorage.removeItem(username.value);
    }

    sessionStorage.setItem('sessionActive', 'true');

    showSuccessToast('Login successful');
    setTimeout(() => {
      router.push('/home');
    }, 1000);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Login failed', error.response?.data);
      showFailToast(`Login failed: ${error.response?.data?.message || 'Unknown error'}`);
    } else {
      console.error('Unexpected error occurred', error);
      showFailToast('Unexpected error occurred');
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
