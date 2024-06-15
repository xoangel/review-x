<script setup lang="ts">
import ShowLogo from "./../../ui/ShowLogo/ShowLogo.vue";
import AuthForm from "../../widgets/AuthForm/AuthForm.vue";
</script>

<template>
    <section id="auth-section">
        <ShowLogo />
        <AuthForm />
    </section>
</template>

<style lang="scss">
    @import "./AuthView.scss";
</style>