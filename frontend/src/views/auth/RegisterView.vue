<template>
  <div class="register">
    <h1 class="text-2xl font-bold text-center my-10">Register</h1>
    <section>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="username" name="Username" label="Username" placeholder="Username"
            :rules="[{ required: true, message: 'Please enter a username' }]" />
          <van-field v-model="password" type="password" name="Password" label="Password" placeholder="Password"
            :rules="[{ required: true, message: 'Please enter a password' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            Register
          </van-button>
        </div>
        <div class="links">
          <div @click="toLogin" class="link-left">Already have an account? Click to login</div>
        </div>
      </van-form>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { showSuccessToast, showFailToast } from 'vant';
import apiClient from '@/utils/axios';
import axios from 'axios';

const username = ref('');
const password = ref('');
const router = useRouter();

const onSubmit = async () => {
  try {
    const response = await apiClient.post('/api/users/register', {
      username: username.value,
      password: password.value,
    });
    console.log('Registration successful', response.data);

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

<style scoped>
.register {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
</style>
