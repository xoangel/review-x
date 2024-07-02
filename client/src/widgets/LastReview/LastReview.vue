<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IDisc } from '../../helpers/types/typeDisc';
import AuthorLabel from '../../ui/AuthorLabel/AuthorLabel.vue';
import IconContainer from '../../ui/icon/IconContainer.vue';
import { gsap } from "gsap";

const props = defineProps<{
    disc: IDisc
}>();

const rate = ref(0);

onMounted(() => {
    gsap.to(rate, {
        duration: 3,
        ease: 'circ.out',
        value: props.disc.attributes.total_rate,
        onUpdate: () => {
            rate.value = Math.ceil(rate.value);
        }
    });
});

</script>
<template>
<div class="last_review">
    <div class="last_review__content">
        <h3 class="last_review__headline">Последний добавленный диск</h3>
        <div class="last_review__data_container">
        <img :src="`${disc.attributes.cover_link}`" alt="" class="last_review__cover">
        <div class="last_review__data">
            <div class="last_review__titles_section">
                <div class="last_review__titles_container">
                    <h1 class="last_review__title">
                    {{ disc.attributes.title }}
                    <span v-if="disc.attributes.release_year" class="last_review__year">{{ disc.attributes.release_year }}</span>
                </h1>
                <h2 class="last_review__artist">{{ disc.attributes.artist }}</h2>
                </div>
                <div class="last_review__type_container">
                    <IconContainer :src="'/icons/album.svg'"/>
                    <p class="last_review__type_text"> {{ disc.attributes.type }}</p>
                </div>
            </div>
            <div class="last_review__bottom">
                <!-- @vue-ignore -->
                <AuthorLabel :name="disc.attributes.users_permissions_user?.data.attributes.username" /> 
                <p class="last_review__rate">{{ rate }}/10</p>
                <!-- <ActionButton :submit="false"><IconContainer :src="'/icons/flash.svg'"/><p>Подробнее</p></ActionButton> -->
            </div>
        </div>
        </div>
    </div>
    <div class="last_review__opinion">
        <h2 class="last_review__opinion_title">Мнение</h2>
        <el-divider />
        <div class="last_review__opinion_text_container">
            <p class="last_review__opinion_text">{{ disc.attributes.description }}</p>
        </div>
    </div>
</div>
</template>

<style scoped lang="scss">
@import "./LastReview.scss";
</style>