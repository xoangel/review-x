<script setup lang="ts">
import { ref } from 'vue';
import IconContainer from '../icon/IconContainer.vue';
const searchQuery = ref('');
</script>

<template>
    <div class="search_input">
        <IconContainer :src="'/icons/search.svg'" />
        <input v-model="searchQuery" @input="$emit('searchDiscs', searchQuery)" class="search_input__field" type="text" placeholder="Поиск...">
    </div>
</template>

<style scoped lang="scss">
@import "./SearchInput.scss";
</style>