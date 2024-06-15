import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUserStore = defineStore('users', ()=>{
    const jwt = ref('');
    const getJwt = computed(()=>jwt)

    return{jwt, getJwt}
})