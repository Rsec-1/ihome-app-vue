<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { showSuccessToast, showLoadingToast, showFailToast } from 'vant';
import apiClient from '@/utils/axios';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdilAccount, mdilLock } from '@mdi/light-js';

const username = ref('');
const password = ref('');
const checked = ref(false);
const rememberPassword = ref(false);
const router = useRouter();
const secretKey = import.meta.env.VITE_APP_SECRET_KEY; // 从环境变量中读取密钥

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
        showLoadingToast('Logging in...');
        const response = await apiClient.post('/api/users/login', {
            username: username.value,
            password: password.value,
        });

        userStore.setUsername(username.value);
        userStore.setToken(response.data.token);

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

<template>
    <div class="login-container">
        <van-form ref="formRef" @submit="onSubmit">
            <van-field v-model="username" name="username" placeholder="Username" @blur="onUsernameBlur"
                :rules="[{ required: true, message: 'Please enter username' }]" class="input-field">
                <template #left-icon>
                    <svg-icon type="mdi" :path="mdilAccount"></svg-icon>
                </template>
            </van-field>

            <van-field v-model="password" type="password" name="password" placeholder="Password"
                :rules="[{ required: true, message: 'Please enter password' }]" class="input-field">
                <template #left-icon>
                    <svg-icon type="mdi" :path="mdilLock"></svg-icon>
                </template>
            </van-field>

            <div class="remember-forgot">
                <div class="remember">
                    <van-switch v-model="rememberPassword" size="18px" /> <span class="remember-text">Remember Me</span>
                </div>
                <a @click="forgotPassword" class="forgot-password">Forgot Password</a>
            </div>

            <van-button round block type="primary" native-type="submit" :disabled="!checked" class="login-button">
                Sign in
            </van-button>
            <van-button round plain block type="primary" @click="toRegister" class="register-button">
                Sign up
            </van-button>

            <van-field name="checkbox" class="agreement">
                <template #input>
                    <div class="checkbox-container">
                        <div class="checkbox-wrapper">
                            <van-checkbox v-model="checked"></van-checkbox>
                        </div>
                        <span class="agreement-text">I've read and agree to the <a href="#"
                                class="detail-agreement">User Agreement</a> and <a href="#"
                                class="detail-agreement">Privacy Policy</a> </span>
                    </div>
                </template>
            </van-field>
        </van-form>
    </div>
</template>

<style scoped lang="less">
.login-container {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
}

.input-field {
    margin-bottom: 15px;
}

.remember-forgot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.remember {
    display: flex;
    align-items: center;
    margin-right: 10px;
}

.remember-text {
    margin-left: 10px;
}

.forgot-password {
    color: #007bff;
    text-decoration: none;
}

.login-button {
    margin-bottom: 10px;
}

.register-button {
    margin-bottom: 20px;
}

.agreement {
    display: flex;
    align-items: center;
    justify-content: center;
}

.checkbox-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
}

.checkbox-wrapper {
    min-width: 20px;
}

.checkbox-container span {
    // margin-left: 5px;
    flex: 1;
}

.agreement-text {
    margin-left: 10px;
    font-size: 14px;
}

.detail-agreement {
    color: #007bff;
    text-decoration: none;
}
</style>
