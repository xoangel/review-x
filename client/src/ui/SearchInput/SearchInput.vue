<script setup lang="ts">
import IconContainer from '../icon/IconContainer.vue';
</script>

<template>
    <div class="search_input">
        <IconContainer :src="'/icons/search.svg'" />
        <input class="search_input__field" type="text" placeholder="Поиск...">
    </div>
</template>

<style scoped lang="scss">
@import "./SearchInput.scss";
</style>