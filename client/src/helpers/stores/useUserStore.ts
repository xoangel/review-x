import { defineStore } from 'pinia';
import AuthAPI from '../api/AuthAPI';


export const useUserStore = defineStore('users', ()=>{
    const authAPIInterface = new AuthAPI();

    const isAuthorizated = (): boolean => localStorage.getItem("jwt") ? true : false;

    return{authAPIInterface, isAuthorizated}
})