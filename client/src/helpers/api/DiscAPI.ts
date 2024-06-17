import { AxiosResponse } from "axios";
import StrapiAPI from "./StrapiAPI";
import { DiscResponse, AllDiscsResponse } from "./../types/typeDisc"

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
}