<script setup lang="ts">
import { useUserStore } from "./../../helpers/stores/useUserStore";
import ContentTypeAPI from "./../../helpers/api/ContentTypeAPI";
import MultiSelect from "./../../ui/MultiSelect/MultiSelect.vue";
import SearchInput from "./../../ui/SearchInput/SearchInput.vue";
import SquareButton from "./../../ui/SquareButton/SquareButton.vue";
import { ref } from "vue";

const genres = ref([]);

const userStore = useUserStore();
const ctAPI = new ContentTypeAPI();
const genresData = async() => genres.value = await ctAPI.getGenres();

genresData()

</script>

<template>
    <div class="toolbar">
        <div class="toolbar__bar">
            <MultiSelect :placeholder="'Все жанры'" :options="genres"/>
            <MultiSelect :placeholder="'Все авторы'" :options="genres"/>
        </div>
        <SearchInput />
        <div class="toolbar__bar right_bar">
            <SquareButton :icon="'/icons/collapse_cards.svg'" :swapIcon="'/icons/expand_cards.svg'" :isFilled="true"/>
            <SquareButton :icon="'/icons/auth.svg'" :isFilled="false"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "./ToolBar.scss";
</style>