import { defineStore } from "pinia";
import { computed, ref, Ref, watch } from "vue";
import DiscAPI from "../api/DiscAPI";
import { IDisc } from "../types/typeDisc";

export const useDiscStore = defineStore('discs', () => {
    const discAPIInstance = new DiscAPI()
    const discList: Ref<IDisc[]> = ref([]);

    async function getDiscs() {
        discList.value = (await discAPIInstance.getAll()).data;
    }
    getDiscs();

    const authorsList = computed(() => {
        const authorsSet = new Set<string>();
        discList.value.forEach(disc => {
            if (disc.attributes && disc.attributes.users_permissions_user.data.attributes.username) {
                authorsSet.add(disc.attributes.users_permissions_user.data.attributes.username);
            }
        });
        return Array.from(authorsSet);
    });

    const genresList = computed(() => {
        const genresSet = new Set<string>();
        discList.value.forEach(disc => {
            if (disc.attributes && disc.attributes.genre) {
                genresSet.add(disc.attributes.genre);
            }
        });
        return Array.from(genresSet);
    });

    const selectedGenres = ref([]);
    const selectedAuthors = ref([]);
    const searchQuery = ref('');

    const filteredDiscs = computed(() => {
        return discList.value.filter(disc => {
            const matchesGenre = selectedGenres.value.length === 0 || selectedGenres.value.includes(disc.attributes.genre);
            const matchesAuthor = selectedAuthors.value.length === 0 || selectedAuthors.value.includes(disc.attributes.artist);
            const matchesSearch = searchQuery.value === '' ||
                disc.attributes.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                disc.attributes.artist.toLowerCase().includes(searchQuery.value.toLowerCase());
            return matchesGenre && matchesAuthor && matchesSearch;
        });
    });

    console.log(filteredDiscs)

    return { discList, authorsList, getDiscs, filteredDiscs, genresList, selectedGenres, selectedAuthors, searchQuery};
})