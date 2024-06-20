<script setup lang="ts">
import ToolBar from './../../widgets/ToolBar/ToolBar.vue';
import ShowLogo from './../../ui/ShowLogo/ShowLogo.vue';
import DiscCard from '../../widgets/DiscCard/DiscCard.vue';
import DiscAPI from '../../helpers/api/DiscAPI';
import IconContainer from '../../ui/icon/IconContainer.vue';
import { useDiscStore } from '../../helpers/stores/useDiscStore';
import { IDisc } from './../../helpers/types/typeDisc';
import { Ref, ref } from 'vue';

const discs: Ref<IDisc[]> = ref([]);
const discAPIInstance = new DiscAPI();
let dialogVisible: Ref<boolean> = ref(false);
let selectedDisc: Ref<IDisc | null> = ref(null);
const discStore = useDiscStore();

const getDiscsData = async() => {
    const res = await discAPIInstance.getAll();
    discs.value = Array.from(res.data);
};

getDiscsData();

function showDetails(disc: IDisc){
    selectedDisc.value = disc;
    dialogVisible.value = true;
}

</script>

<template>
    <section class="main_section">
        <ShowLogo />
        <el-divider />
        <ToolBar />
        <div class="content_container">
            <DiscCard @click="showDetails(disc)" v-for="disc in discStore.filteredDiscs" :key="disc.id" :data="disc" />
        </div>
    </section>
    
    <el-dialog
    v-model="dialogVisible"
    width="960"
    >
        <div class="disc_popup">
            <div class="disc_popup__cover" :style="`background: center / cover no-repeat url(${(selectedDisc as any).attributes.cover_link})`" alt="Обложка альбома"></div>
            <div class="disc_popup__data">
                <div class="disc_popup__header">
                    <h1 class="disc_popup__title">
                        {{ (selectedDisc as any).attributes.title }}
                        <span v-if="(selectedDisc as any).attributes.release_year" class="disc_popup__year">{{ (selectedDisc as any).attributes.release_year }}</span>
                    </h1>
                    <h2 class="disc_card__artist">{{ (selectedDisc as any).attributes.artist }}</h2>
                </div>
                <div class="disc_popup__bottom">
                    <div class="disc_popup__range_container full_rate">
                        <p class="disc_popup__range_title">Общая оценка</p>
                        <div class="disc_popup__range">
                            <IconContainer :src="'/icons/trash_disc.svg'"/>
                            <el-progress
                            :text-inside="false"
                            :show-text="false"
                            :width="256"
                            :color="'linear-gradient(90deg, rgba(119,119,112,1) 0%, rgba(244,211,94,1) 100%)'"
                            :stroke-width="8"
                            :percentage="(selectedDisc as any).attributes.total_rate*10"
                            />
                            <IconContainer :src="'/icons/great_disc.svg'"/>
                            <p class="disc_popup__rate">{{ (selectedDisc as any).attributes.total_rate }}/10</p>
                        </div>
                    </div>
                    <div class="disc_popup__range_container dynamic_rate">
                        <p class="disc_popup__range_title">Динамика</p>
                        <div class="disc_popup__range">
                            <IconContainer :src="'/icons/melancholic_disc.svg'"/>
                            <el-progress
                            :text-inside="false"
                            :show-text="false"
                            :width="256"
                            :color="'linear-gradient(90deg, rgba(60,121,139,1) 0%, rgba(229,73,39,1) 100%)'"
                            :stroke-width="8"
                            :percentage="(selectedDisc as any).attributes.dynamic_rate*10"
                            />
                            <IconContainer :src="'/icons/fire_disc.svg'"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="(selectedDisc as any).attributes.description" class="disc_popup__review">
            {{ (selectedDisc as any).attributes.description }}
        </div>
    </el-dialog>
</template>

<style lang="scss">
@import "./IndexView.scss"; 
</style>
