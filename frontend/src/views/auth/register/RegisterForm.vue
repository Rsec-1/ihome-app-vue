<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { showSuccessToast, showFailToast } from 'vant';
import apiClient from '@/utils/axios';
import axios from 'axios';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdilAccount, mdilLock } from '@mdi/light-js';

const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const checked = ref(false);
const router = useRouter();

const validateConfirmPassword = (value: string) => {
    return value === password.value ? true : 'Passwords do not match';
};


const onSubmit = async () => {
    if (password.value !== confirmPassword.value) {
        showFailToast('Passwords do not match');
        return;
    }

    try {
        const response = await apiClient.post('/api/users/register', {
            username: username.value,
            password: password.value,
        });

        showSuccessToast('Registration successful');
        setTimeout(() => {
            router.push('/login');
        }, 1000);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Registration failed', (error.response?.data as any)?.message || 'Unknown error');
            showFailToast(`Registration failed: ${(error.response?.data as any)?.message || 'Unknown error'}`);
        } else {
            console.error('Unexpected error occurred', error);
            showFailToast('Unexpected error occurred');
        }
    }
};

const toLogin = () => {
    router.push('/login');
};
</script>

<template>
    <div class="register-container">
        <van-form ref="formRef" @submit="onSubmit">
            <van-field v-model="username" name="username" placeholder="Username"
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

            <van-field v-model="confirmPassword" type="password" name="confirmPassword" placeholder="Confirm Password"
                :rules="[{ required: true, message: 'Please confirm your password' }, { validator: validateConfirmPassword }]" class="input-field">
                <template #left-icon>
                    <svg-icon type="mdi" :path="mdilLock"></svg-icon>
                </template>
            </van-field>

            <van-field name="checkbox" class="agreement">
                <template #input>
                    <div class="checkbox-container">
                        <div class="checkbox-wrapper">
                            <van-checkbox v-model="checked"></van-checkbox>
                        </div>
                        <span class="agreement-text">I have read and agree to the <a href="#" class="detail-agreement">User Agreement</a></span>
                    </div>
                </template>
            </van-field>
            
            <van-button round block type="primary" native-type="submit" :disabled="!checked" class="register-button">
                Sign up
            </van-button>
            
            <div class="login-link" @click="toLogin">
                Already have an account? Click to login
            </div>
        </van-form>
    </div>
</template>

<style scoped lang="less">
.register-container {
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

.register-button {
    margin-bottom: 20px;
}

.login-link {
    text-align: center;
    color: #007bff;
    cursor: pointer;
    margin-top: 20px;
}
</style>
