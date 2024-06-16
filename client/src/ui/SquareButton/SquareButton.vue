<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';

const props = defineProps<{
    icon: string,
    swapIcon?: string,
    isFilled: boolean
}>();

const currentIcon = ref('');

onMounted(() => {
    currentIcon.value = props.icon;
});

function swapIcons() {
    if (props.swapIcon) {
        currentIcon.value = currentIcon.value === props.icon ? props.swapIcon : props.icon;
    }
}
</script>

<template>
    <button @click="swapIcons" :class="'square_button'+`${isFilled? ' filled_square_button' : ''}`"><img :src=currentIcon alt=""></button>
</template>

<style scoped lang="scss">
@import "./../../assets/css/variables.scss";

    .square_button{
        width: 36px;
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        cursor: pointer;
    }

    .square_button{
        img{
            height: 24px;
        }
    }

    .filled_square_button{
        border-radius: 8px;
        background-color: $orange;
        box-shadow: 0 4px 0px #792715;
        margin-bottom: 4px;
        transition: .3s all ease;
    }

    .filled_square_button:hover{
        background-color: #e85e40;
        transition: .3s all ease;
    }

    .filled_square_button:active{
        box-shadow: 0 0px 0px #792715;
        transform: translateY(4px);
        transition: .3s all ease;
    }

</style>