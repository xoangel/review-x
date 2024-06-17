<script setup lang="ts">

</script>

<template>
    <div class="logo_container">
        <!-- <img class="logo_container__logo" src="/other/logo.svg" alt="Логотип отошел"> -->
         <h1 class="logo_container__text">REVIEWX</h1>
    </div>
</template>

<style scoped lang="scss">
    .logo_container{
        width: 100%;
        display: flex;
        align-items: center;  
        justify-content: center;
        height: 80px;  
    }

    .logo_container__logo{
        height: 32px;
    }

    .logo_container__text{
        font-size: 32px;
        background-color: aqua;
        background-clip: text;
    }
</style>