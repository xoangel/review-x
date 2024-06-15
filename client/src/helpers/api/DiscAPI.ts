import { AxiosResponse } from "axios";
import StrapiAPI from "./StrapiAPI";
import IDisc from "./../types/typeDisc"

export default class DiscAPI extends StrapiAPI{
    constructor(){
        super();
        
    }

    async getAll(): Promise<IDisc[]>{
        try{
            const response: AxiosResponse = await this.axiosInstanse.get("/discs");
            return(response.data);
        } catch(error){
            throw error;
        }
    }

    async getById(id: number): Promise<IDisc>{
        try{
            const response: AxiosResponse = await this.axiosInstanse.get(`/discs/${id}`);
            return(response.data);
        } catch(error){
            throw error;
        }
    }
}