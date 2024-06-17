<script setup lang="ts">
import IconContainer from '../icon/IconContainer.vue';
defineProps<{
    name: string
}>()
</script>

<template>
    <div class="author_label">
        <IconContainer :src="'/icons/person.svg'" />
        <p class="author_label__text">Автор: {{ name }}</p>
    </div>
</template>

<style scoped lang="scss">
@import "./AuthorLabel.scss";
</style>