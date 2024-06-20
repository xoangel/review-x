<script setup lang="ts">

</script>

<template>
    <div class="logo_container">
        <!-- <img class="logo_container__logo" src="/other/logo.svg" alt="Логотип отошел"> -->
         <RouterLink :to="'/'">
            <h1 class="logo_container__text">REVIEWX</h1>
        </RouterLink>
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
        height: 64px;
    }

    .logo_container a{
        text-decoration: none;
    }

    .logo_container__text{
        font-size: 64px;
        background-color: white;
        background-image: url(/other/logo_mask.png);
        background-position: -400px 400px;
        background-size: 101%;
        background-repeat: no-repeat;
        -webkit-background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: "Racing Sans One";
        transition: background-position .5s ease;
    }

    .logo_container__text:hover{
        background-position: center;
        transition: background-position .5s ease;
    }
    
</style>