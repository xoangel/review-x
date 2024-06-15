<script setup lang="ts">
import ActionButton from './../../ui/ActionButton/ActionButton.vue';
import AuthAPI from "./../../helpers/api/AuthAPI.ts";
import { ref } from 'vue';

const login = ref('');
const password = ref('')

async function auth(){
    const authApi = new AuthAPI();
    if(login && password){
        const response = await authApi.authUser(login.value, password.value);
        console.log(response);
    }
}
</script>

<template>
    <form class="auth-form">
        <h1 class="auth_form__title">Авторизация</h1>
        <input v-model="login" type="text" class="default_input" placeholder="Логин" required>
        <input v-model="password" type="password" class="default_input" placeholder="Пароль" required>
        <ActionButton @click="auth" :submit="false">Войти</ActionButton>
    </form>
</template>

<style scoped lang="scss">
    @import "./AuthForm.scss";
</style>