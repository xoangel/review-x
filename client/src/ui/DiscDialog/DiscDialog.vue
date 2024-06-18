<script setup lang="ts">
import { computed, Ref, ref } from "vue";
import { IDisc } from "./../../helpers/types/typeDisc";
import IconContainer from "../icon/IconContainer.vue";
const props = defineProps<{
    selectedDisc: IDisc | null,
    visibilityController: boolean
}>()

let dialogVisible:Ref<boolean> = ref(false);
</script>

<template>
    <el-dialog
    v-model="dialogVisible"
    width="960"
    >
        <div class="disc_popup">
            <div class="disc_popup__cover" :style="`background: center / cover no-repeat url(${(selectedDisc as any).attributes.cover_link})`" alt="Обложка альбома"></div>
            <div class="disc_popup__data">
                <div class="disc_popup__header">
                    <h1 class="disc_card__title">
                        {{ (selectedDisc as any).attributes.title }}
                        <span v-if="(selectedDisc as any).attributes.release_year" class="disc_card__year">{{ (selectedDisc as any).attributes.release_year }}</span>
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
                            :color="'linear-gradient(90deg, rgba(119,119,112,1) 0%, rgba(244,211,94,1) 100%)'"
                            :stroke-width="8"
                            :percentage="(selectedDisc as any).attributes.total_rate*10"
                            />
                            <IconContainer :src="'/icons/great_disc.svg'"/>
                        </div>
                    </div>
                    <div class="disc_popup__range_container dynamic_rate">
                        <p class="disc_popup__range_title">Динамика</p>
                        <div class="disc_popup__range">
                            <IconContainer :src="'/icons/melancholic_disc.svg'"/>
                            <el-progress
                            :text-inside="false"
                            :show-text="false"
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

<style scoped lang="scss">
    .el-dialog{
        background: #121212 !important;
        border-radius: 16px !important;
        padding: 0 !important;
    }

    .disc_popup{
        display: flex;
        gap: 12px;
    }

    .disc_popup__data{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .disc_popup__cover{
        width: 256px;
        aspect-ratio: 1;
        border-radius: 8px;
    }

    .disc_popup__review{
        background-color: white;
        width: 100%;
        border-radius: 0 0 16px 16px;
        color: #121212;
        padding: 32px 36px;
        box-shadow: inset 0 8px 8px #3a3a3a25;
    }
</style>