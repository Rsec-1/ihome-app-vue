<template>
    <div class="auth-title">
        <img src="@/assets/logo.svg" alt="logo" class="logo-img" />
        <div class="app-name">iHome</div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.auth-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30%;
    /* Adjust this value to move the logo down */
}

.logo-img {
    width: 80px;
    height: 80px;
    // border-radius: 50%;
    margin-bottom: 10px;
    /* Add space between the logo and the app name */
}

.app-name {
    color: #003366;
    /* Adjust this color as needed */
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
}
</style>
