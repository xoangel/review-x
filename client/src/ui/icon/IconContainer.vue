<script setup lang="ts">
    defineProps({
        src: String
    })
</script>

<template>
    <div class="icon" :style="`background: center / contain no-repeat url(${src})`"></div>
</template>

<style scoped lang="scss">
    .icon{
        width: 24px;
        aspect-ratio: 1;
    }
</style>