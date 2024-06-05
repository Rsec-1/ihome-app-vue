<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { showSuccessToast, showLoadingToast, showFailToast } from 'vant';
import apiClient from '@/utils/axios';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdilAccount, mdilEmail, mdilLock } from '@mdi/light-js';

const usernameOrEmail = ref('');
const verificationCode = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const step = ref(1);
const router = useRouter();

const onSendVerificationCode = async () => {
    try {
        showLoadingToast('Sending verification code...');
        await apiClient.post('/api/users/send-verification-code', {
            usernameOrEmail: usernameOrEmail.value,
        });
        showSuccessToast('Verification code sent');
        step.value = 2;
    } catch (error) {
        showFailToast('Failed to send verification code');
    }
};

const onResetPassword = async () => {
    if (newPassword.value !== confirmPassword.value) {
        showFailToast('Passwords do not match');
        return;
    }

    try {
        showLoadingToast('Resetting password...');
        await apiClient.post('/api/users/reset-password', {
            usernameOrEmail: usernameOrEmail.value,
            verificationCode: verificationCode.value,
            newPassword: newPassword.value,
        });
        showSuccessToast('Password reset successful');
        router.push('/login');
    } catch (error) {
        showFailToast('Failed to reset password');
    }
};

const toLogin = () => {
    router.push('/login');
};
</script>

<template>
    <div class="reset-password-container">
        <van-form ref="formRef" @submit.prevent="step === 1 ? onSendVerificationCode : onResetPassword">
            <van-field v-if="step === 1" v-model="usernameOrEmail" name="usernameOrEmail"
                placeholder="Username or Email" :rules="[{ required: true, message: 'Please enter username or email' }]"
                class="input-field">
                <template #left-icon>
                    <svg-icon type="mdi" :path="mdilAccount"></svg-icon>
                </template>
            </van-field>

            <van-field v-if="step === 2" v-model="verificationCode" name="verificationCode"
                placeholder="Verification Code" :rules="[{ required: true, message: 'Please enter verification code' }]"
                class="input-field">
                <template #left-icon>
                    <svg-icon type="mdi" :path="mdilEmail"></svg-icon>
                </template>
            </van-field>

            <van-field v-if="step === 2" v-model="newPassword" type="password" name="newPassword"
                placeholder="New Password" :rules="[{ required: true, message: 'Please enter new password' }]"
                class="input-field">
                <template #left-icon>
                    <svg-icon type="mdi" :path="mdilLock"></svg-icon>
                </template>
            </van-field>

            <van-field v-if="step === 2" v-model="confirmPassword" type="password" name="confirmPassword"
                placeholder="Confirm Password" :rules="[{ required: true, message: 'Please confirm your password' }]"
                class="input-field">
                <template #left-icon>
                    <svg-icon type="mdi" :path="mdilLock"></svg-icon>
                </template>
            </van-field>

            <van-button round block type="primary" native-type="submit" class="action-button">
                {{ step === 1 ? 'Send Verification Code' : 'Reset Password' }}
            </van-button>
            <div class="login-link" @click="toLogin">
                Remembered password? Go to login
            </div>
        </van-form>
    </div>
</template>

<style scoped lang="less">
.reset-password-container {
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

.action-button {
    margin-top: 20px;
}

.login-link {
    text-align: center;
    color: #007bff;
    cursor: pointer;
    margin-top: 20px;
}
</style>
