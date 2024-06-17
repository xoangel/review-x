<script setup lang="ts">
import ToolBar from './../../widgets/ToolBar/ToolBar.vue';
import ShowLogo from './../../ui/ShowLogo/ShowLogo.vue';
import DiscCard from '../../widgets/DiscCard/DiscCard.vue';
import DiscAPI from '../../helpers/api/DiscAPI';
import { IDisc } from './../../helpers/types/typeDisc';
import { Ref, ref } from 'vue';

const discs: Ref<IDisc[]> = ref([]);
const discAPIInstance = new DiscAPI();

const getDiscsData = async() => {
    const res = await discAPIInstance.getAll();
    discs.value = Array.from(res.data);
};

getDiscsData();

</script>

<template>
    <section class="main_section">
        <ShowLogo />
        <el-divider />
        <ToolBar />
        <div class="content_container">
            <DiscCard v-for="disc in discs" :key="disc.id" :data="disc" />
        </div>
    </section>
</template>

<style scoped lang="scss">
@import "./IndexView.scss"; 
</style>
