import { AxiosResponse } from "axios";
import StrapiAPI from "./StrapiAPI";

export default class DiscAPI extends StrapiAPI{
    constructor(){
        super();
    }

    async getAll(){
        try{
            const response: AxiosResponse = await this.axiosInstanse.get("/discs");
            return(response);
        } catch(error){
            throw error;
        }
    }

    async getById(id: number){
        try{
            const response: AxiosResponse = await this.axiosInstanse.get(`/discs/${id}`);
            return(response);
        } catch(error){
            throw error;
        }
    }
}