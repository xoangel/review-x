<script setup lang="ts">
import {ref} from "vue"
import { ElOption, ElSelect } from "element-plus";
    const value2 = ref([]);
    defineProps<{
        options: Array<string | number>,
        placeholder: string
    }>()
</script>

<template>
    <el-select
        v-model="value2"
        multiple
        collapse-tags
        collapse-tags-tooltip
        :placeholder="placeholder"
        style="max-width: 240px"
    >
        <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item"
        />
    </el-select>
</template>

<style lang="scss">
@import "./MultiSelect.scss";
</style>