<template>
  <div class="home">
    <h1 class="text-2xl font-bold text-center my-10">主页</h1>
    <h2>你好, {{ username }}~</h2>
    <div class="logout-button">
      <van-button round block type="danger" @click="logout">
        退出登录
      </van-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { showSuccessToast, showFailToast } from 'vant';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();
const username = computed(() => userStore.username);

const logout = () => {
  try {
    userStore.clearUsername();
    sessionStorage.removeItem('sessionActive'); // 移除活动会话

    showSuccessToast('退出登录成功');
    // setTimeout(() => {
    router.push('/login'); // 重定向到登录页面
    // }, 1000);

  } catch (error) {
    console.error('退出登录失败', error);
    showFailToast('退出登录失败');
  }
};
</script>

<style scoped>
.home {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

.logout-button {
  margin-top: 20px;
}
</style>
