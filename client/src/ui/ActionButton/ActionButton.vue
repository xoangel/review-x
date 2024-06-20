<script setup lang="ts">
defineProps<{
    submit: boolean
}>()
</script>

<template>
    <button :type="submit? 'submit' : 'button'" class="action_button">
        <slot></slot>
    </button>
</template>

<style lang="scss">
@import "./ActionButton.scss";
</style>