<script lang="ts" setup>
import { ref } from 'vue';
import { showSuccessToast, showFailToast, showLoadingToast } from 'vant';
import apiClient from '@/utils/axios';
import { useRouter } from 'vue-router';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdilAccount, mdilLock, mdilTooltipText } from '@mdi/light-js';
import axios from 'axios';

const step = ref(1); // 当前步骤
const usernameOrEmail = ref('');
const resetToken = ref('');
const newPassword = ref('');
const router = useRouter();

const sendResetCode = async () => {
    try {
        showLoadingToast('Sending reset code...');
        const response = await apiClient.post('/api/users/forgot-password', {
            usernameOrEmail: usernameOrEmail.value,
        });
        showSuccessToast(response.data.message);
        step.value = 2; // 切换到第二步
    } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.message) {
            showFailToast(`Failed to send reset code: ${error.response.data.message}`);
        } else {
            showFailToast('Failed to send reset code');
        }
    }
};

const resetPassword = async () => {
    try {
        showLoadingToast('Resetting password...');
        const response = await apiClient.post('/api/users/reset-password', {
            usernameOrEmail: usernameOrEmail.value,
            resetToken: resetToken.value,
            newPassword: newPassword.value,
        });
        showSuccessToast(response.data.message);
        router.push('/login');
    } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.message) {
            showFailToast(`Failed to reset password: ${error.response.data.message}`);
        } else {
            showFailToast('Failed to reset password');
        }
    }
};

const toLogin = () => {
    router.push('/login');
};
</script>

<template>
    <div class="forgot-reset-password-container">
        <van-form v-if="step === 1" @submit="sendResetCode">
            <van-field v-model="usernameOrEmail" name="usernameOrEmail" placeholder="Username or Email"
                :rules="[{ required: true, message: 'Please enter your username or email' }]">
                <template #left-icon>
                    <svg-icon type="mdi" :path="mdilAccount"></svg-icon>
                </template>
            </van-field>
            <van-button round block type="primary" native-type="submit">
                Send Reset Code
            </van-button>
        </van-form>
        <van-form v-else @submit="resetPassword">
            <van-field v-model="usernameOrEmail" name="usernameOrEmail" placeholder="Username or Email"
                :rules="[{ required: true, message: 'Please enter your username or email' }]" disabled>
                <template #left-icon>
                    <svg-icon type="mdi" :path="mdilAccount"></svg-icon>
                </template>
            </van-field>
            <van-field v-model="resetToken" name="resetToken" placeholder="Reset Code"
                :rules="[{ required: true, message: 'Please enter the reset code' }]">
                <template #left-icon>
                    <svg-icon type="mdi" :path="mdilTooltipText"></svg-icon>
                </template>
            </van-field>
            <van-field v-model="newPassword" type="password" name="newPassword" placeholder="New Password"
                :rules="[{ required: true, message: 'Please enter your new password' }]">
                <template #left-icon>
                    <svg-icon type="mdi" :path="mdilLock"></svg-icon>
                </template>
            </van-field>
            <van-button round block type="primary" native-type="submit">
                Reset Password
            </van-button>
        </van-form>

        <div class="login-link" @click="toLogin">
            Remembered password? Go to login
        </div>
    </div>
</template>

<style scoped>
.forgot-reset-password-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
}

.login-link {
    text-align: center;
    color: #007bff;
    cursor: pointer;
    margin-top: 20px;
}
</style>
