<template>
    <div>
        <div class="h-screen flex justify-center p-8">
            <div class="w-full flex flex-col">
                <AuthTitle />
                <RegisterForm />
            </div>
        </div>
        <AuthWave />
    </div>
</template>

<script setup lang="ts">
import AuthTitle from '@/components/AuthTitle.vue'
import RegisterForm from './RegisterForm.vue'
import AuthWave from '@/components/AuthWave.vue'
</script>

<style scoped lang="less">
:deep(.van-field__left-icon) {
    display: flex;
}

:deep(.van-field__right-icon) {
    display: flex;
}
</style>