import { defineStore } from 'pinia';
import { computed, Ref, ref } from 'vue';
import { UserAttributes } from '../types/typeDisc';


export const useUserStore = defineStore('users', ()=>{
    const me: Ref<UserAttributes | null> = ref(null);
    const getMe = computed(()=>me.value)
    const isAuthorizated = (): boolean => localStorage.getItem("jwt") ? true : false;

    return{me, getMe, isAuthorizated}
})