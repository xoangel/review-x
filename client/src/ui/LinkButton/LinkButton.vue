<script setup lang="ts">
    defineProps<{
        link_to: string
    }>()
</script>

<template>
    <router-link class :to="link_to"></router-link>
</template>

