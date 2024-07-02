<script setup lang="ts">
import { IDisc, UserResponse } from "./../../helpers/types/typeDisc";
import IconContainer from "../../ui/icon/IconContainer.vue";
import AuthorLabel from "../../ui/AuthorLabel/AuthorLabel.vue";
import { useDiscStore } from "../../helpers/stores/useDiscStore";
import { useUserStore } from "../../helpers/stores/useUserStore";
import { ref, watchEffect } from "vue";
const props = defineProps<{
    data: IDisc
}>();

const discStore = useDiscStore();
const userStore = useUserStore();

const me = ref<UserResponse | null>(null);

const getMe = async () => {
    me.value = await userStore.authAPIInterface.getMe();
};

getMe();

function editDisc(): void{
    discStore.discToEdit = props.data;
    discStore.editMode = true;
    discStore.createDiscVisibility = true;
}

const isMine = ref(false);

watchEffect(() => {
    if (me.value) {
        isMine.value = me.value.id === props.data.attributes.users_permissions_user?.data.id;
    }
});
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
                <!-- @vue-ignore -->
                <AuthorLabel :name="data.attributes.users_permissions_user?.data.attributes.username" /> 
                <p class="disc_card__rate">{{ data.attributes.total_rate }}/10</p>
                <!-- <ActionButton :submit="false"><IconContainer :src="'/icons/flash.svg'"/><p>Подробнее</p></ActionButton> -->
            </div>
            <div v-if="isMine" @click.stop="editDisc" class="disc_card__edit">
                <IconContainer :src="'/icons/edit.svg'" />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "./DiscCard.scss";
</style>