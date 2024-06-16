<script setup lang="ts">
import ActionButton from './../../ui/ActionButton/ActionButton.vue';
import AuthAPI from "./../../helpers/api/AuthAPI.ts";
//import UseLoader from "./../../ui/UseLoader/UseLoader.vue";
import { ref } from 'vue';
import { useUserStore } from '../../helpers/stores/useUserStore.ts';
import { router } from '../../config/router.ts';

const userStore = useUserStore();
const login = ref('');
const password = ref('');
let isLoading = ref(false);

async function auth(){
    if(login && password){
        const authApi = new AuthAPI();
        try{
            isLoading.value = true;
            const response = await authApi.authUser(login.value, password.value);
            userStore.jwt = response.data.jwt;
            router.push('/');
        } catch(error){
            throw error;
        } finally {
            isLoading.value = false;
        }
    }
}
</script>

<template>
    <form @submit.prevent="auth" class="auth-form">
        <h1 class="auth_form__title">Авторизация</h1>
        <input v-model="login" type="text" class="default_input" placeholder="Логин" required>
        <input v-model="password" type="password" class="default_input" placeholder="Пароль" required>
        <ActionButton :submit="true"> Войти </ActionButton>
    </form>
</template>

<style scoped lang="scss">
    @import "./AuthForm.scss";
</style>