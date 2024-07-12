<script setup lang="ts">
import ToolBar from './../../widgets/ToolBar/ToolBar.vue';
import ShowLogo from './../../ui/ShowLogo/ShowLogo.vue';
import DiscCard from './../../widgets/DiscCard/DiscCard.vue';
import DiscAPI from './../../helpers/api/DiscAPI';
import DiscDialog from './../../widgets/DiscDialog/DiscDialog.vue';
import CreateDisc from './../../widgets/CreateDisc/CreateDisc.vue';
import LastReview from './../../widgets/LastReview/LastReview.vue';
import { useDiscStore } from './../../helpers/stores/useDiscStore';
import { useUserStore } from './../../helpers/stores/useUserStore';
import { IDisc } from './../../helpers/types/typeDisc';
import { Ref, ref } from 'vue';
import { ElLoading } from 'element-plus';

const discs: Ref<IDisc[]> = ref([]);
const discAPIInstance = new DiscAPI();
let selectedDisc: Ref<IDisc | null> = ref(null);
const discStore = useDiscStore();
const userStore = useUserStore();

const getDiscsData = async() => {
    const loading = ElLoading.service({
        lock: false,
        text: 'Загрузка данных',
        background: 'rgba(0, 0, 0, 0.7)', 
    });
    const res = await discAPIInstance.getAll();
    loading.close();
    discs.value = Array.from(res.data);
};

getDiscsData();

function showDetails(disc: IDisc){
    selectedDisc.value = disc;
    discStore.dialogVisibility = true;
}

</script>

<template>
    <section class="main_section">
        <ShowLogo />
        <el-divider />
        <ToolBar />
        <LastReview v-if="discStore.lastReview" :disc="discStore.lastReview"/>
        <h1 class="content_headline">Все диски</h1>
        <div class="content_container">
            <DiscCard @click="showDetails(disc)" v-for="disc in discStore.filteredDiscs" :key="disc.id" :data="disc" />
        </div>
    </section>
    <DiscDialog :selected-disc="selectedDisc" />
    <CreateDisc v-if="userStore.isAuthorizated()" />
</template>

<style lang="scss">
@import "./IndexView.scss"; 
</style>
