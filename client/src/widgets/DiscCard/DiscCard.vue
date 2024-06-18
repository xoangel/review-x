<script setup lang="ts">
import { IDisc } from "./../../helpers/types/typeDisc";
import IconContainer from "../../ui/icon/IconContainer.vue";
import AuthorLabel from "../../ui/AuthorLabel/AuthorLabel.vue";
//import ActionButton from "../../ui/ActionButton/ActionButton.vue";

defineProps<{
    data: IDisc
}>();


</script>

<template>

    <div class="disc_card">
        <div class="disc_card__cover" :style="`background: center / cover no-repeat url(${data.attributes.cover_link})`" alt="Обложка альбома"></div>
        <div class="disc_card__content">
            <div class="disc_card__titles_section">
                <div class="disc_card__titles_container">
                    <h1 class="disc_card__title">
                    {{ data.attributes.title }}
                    <span v-if="data.attributes.release_year" class="disc_card__year">{{ data.attributes.release_year }}</span>
                </h1>
                <h2 class="disc_card__artist">{{ data.attributes.artist }}</h2>
                </div>
                <div class="disc_card__type_container">
                    <IconContainer :src="'/icons/album.svg'"/>
                    <p class="disc_card__type_text"> {{ data.attributes.type }}</p>
                </div>
            </div>
            <div class="disc_card__bottom">
                <AuthorLabel :name="data.attributes.users_permissions_user.data.attributes.username" /> 
                <p class="disc_card__rate">{{ data.attributes.total_rate }}/10</p>
                <!-- <ActionButton :submit="false"><IconContainer :src="'/icons/flash.svg'"/><p>Подробнее</p></ActionButton> -->
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "./DiscCard.scss";
</style>