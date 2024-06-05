<template>
    <div class="main-container">
        <router-view></router-view>
        <van-tabbar v-model="active" route>
            <van-tabbar-item replace to="/home" @click="onTabClick(0)" :class="{ active: active === 0 }">
                <template #icon>
                    <svg-icon type="mdi" :path="homePath"></svg-icon>
                </template>
                Home
            </van-tabbar-item>
            <van-tabbar-item replace to="/automation" @click="onTabClick(1)" :class="{ active: active === 1 }">
                <template #icon>
                    <svg-icon type="mdi" :path="automationPath"></svg-icon>
                </template>
                Automation
            </van-tabbar-item>
            <van-tabbar-item replace to="/profile" @click="onTabClick(2)" :class="{ active: active === 2 }">
                <template #icon>
                    <svg-icon type="mdi" :path="profilePath"></svg-icon>
                </template>
                Profile
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { useRouter } from 'vue-router';
import { mdiHome, mdiHomeOutline, mdiCheckboxMultipleMarkedCircle, mdiCheckboxMultipleMarkedCircleOutline, mdiAccount, mdiAccountOutline } from '@mdi/js';

const active = ref(0);
const router = useRouter();

const homePath = computed(() => active.value === 0 ? mdiHome : mdiHomeOutline);
const automationPath = computed(() => active.value === 1 ? mdiCheckboxMultipleMarkedCircle : mdiCheckboxMultipleMarkedCircleOutline);
const profilePath = computed(() => active.value === 2 ? mdiAccount : mdiAccountOutline);

const onTabClick = (index: number) => {
    active.value = index;
    switch (index) {
        case 0:
            router.push('/home');
            break;
        case 1:
            router.push('/automation');
            break;
        case 2:
            router.push('/profile');
            break;
    }
};
</script>

<style scoped lang="less">
.main-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.van-tabbar-item {
    &.active {
        color: inherit;
        font-weight: bold;

        svg {
            color: inherit;
        }
    }
}

.van-tabbar-item svg {
    width: 24px;
    height: 24px;
}
</style>