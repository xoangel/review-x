<script setup lang="ts">
import { useUserStore } from "./../../helpers/stores/useUserStore";
import AccountMenu from '../../ui/AccountMenu/AccountMenu.vue';
import ContentTypeAPI from "./../../helpers/api/ContentTypeAPI";
import MultiSelect from "./../../ui/MultiSelect/MultiSelect.vue";
import SearchInput from "./../../ui/SearchInput/SearchInput.vue";
import SquareButton from "./../../ui/SquareButton/SquareButton.vue";
import ActionButton from "../../ui/ActionButton/ActionButton.vue";
import IconContainer from "../../ui/icon/IconContainer.vue";
import { useDiscStore } from "./../../helpers/stores/useDiscStore";
import { onMounted, ref } from "vue";

const genres = ref([]);

const userStore = useUserStore();
const discStore = useDiscStore();
const ctAPI = new ContentTypeAPI();
const genresData = async() => genres.value = await ctAPI.getGenres();

genresData();

let discsContainer: Element;
let discItems: Element[];

onMounted(()=>{
    discsContainer = document.getElementsByClassName("content_container")[0];
    discItems = Array.from(document.getElementsByClassName("disc_card"));
});

function toggleView(){
    if(discsContainer){
        if(!discsContainer.classList.contains('collapsed_discs')){
            discsContainer.classList.add('collapsed_discs');
        } else {
            discsContainer.classList.remove('collapsed_discs');
        }
    }
}

const searchDiscs = (newQuery: string) => {
    discStore.searchQuery = newQuery;
};


</script>

<template>
    <div class="toolbar">
        <div class="toolbar__bar">
            <MultiSelect v-model="discStore.selectedGenres" :placeholder="'Все жанры'" :options="genres"/>
            <MultiSelect v-model="discStore.selectedAuthors":placeholder="'Все авторы'" :options="discStore.authorsList"/>
        </div>
        <SearchInput @search-discs="searchDiscs" />
        <div class="toolbar__bar right_bar">
            <ActionButton v-if="userStore.isAuthorizated()" @click="discStore.createDiscVisibility = true" :submit="false"><IconContainer :src="'/icons/cross.svg'"/><p>Добавить диск</p> </ActionButton>
            <AccountMenu v-if="userStore.isAuthorizated()"/>
            <RouterLink v-else :to="'/auth/'"><SquareButton :icon="'/icons/auth.svg'" :isFilled="false"/></RouterLink>
            <SquareButton @click="toggleView" :icon="'/icons/collapse_cards.svg'" :swapIcon="'/icons/expand_cards.svg'" :isFilled="true"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "./ToolBar.scss";
</style>