import { AxiosResponse } from "axios";
import StrapiAPI from "./StrapiAPI";
import { DiscResponse, AllDiscsResponse, DiscAttributes } from "./../types/typeDisc";
import { useUserStore } from "../stores/useUserStore";

export default class DiscAPI extends StrapiAPI{
    constructor(){
        super();
        
    }

    async getAll(): Promise<AllDiscsResponse>{
        try{
            const response: AxiosResponse = await this.axiosInstanse.get("/discs?populate=users_permissions_user");
            return(response.data);
        } catch(error){
            throw error;
        }
    }

    async getById(id: number): Promise<DiscResponse>{
        try{
            const response: AxiosResponse = await this.axiosInstanse.get(`/discs/${id}?populate=users_permissions_user`);
            return(response.data);
        } catch(error){
            throw error;
        }
    }

    async createDisc(disc: DiscAttributes){
        const userStore = useUserStore();
        try {
            const me = await userStore.authAPIInterface.getMe();
            console.log(me)
            const body = { 
                data:{
                    title: disc.title,
                    artist: disc.artist,
                    release_year: disc.release_year,
                    total_rate: disc.total_rate,
                    dynamic_rate: disc.dynamic_rate,
                    genre: disc.genre, 
                    description: disc.description,
                    cover_link: disc.cover_link,
                    users_permissions_user: me.id,
                    type: disc.type,
                    publishedAt: null
                }
            }
            console.log(body);
            const response = await this.axiosInstance.post('/discs', body, {headers:{Authorization: `Bearer ${localStorage.getItem("jwt")}`}});
            console.log('Диск успешно создан:', response.data);
          } catch (error) {
            console.error('Ошибка при создании диска:', error);
          }
    }
}