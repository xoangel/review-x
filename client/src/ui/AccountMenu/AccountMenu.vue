<script setup lang="ts">
import SquareButton from "../SquareButton/SquareButton.vue";

 
</script>

<template>
<div class="account_menu">
    <SquareButton :icon="'/icons/person.svg'" :is-filled="true"></SquareButton>
</div>
</template>

<style lang="scss">
@import "./AccountMenu.scss";
</style>