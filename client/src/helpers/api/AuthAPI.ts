import { UserData} from "../types/typeDisc";
import StrapiAPI from "./StrapiAPI";

export default class AuthAPI extends StrapiAPI{
    constructor(){
        super();
    }

    async authUser(login: string, password: string){
        try{
            const response = await this.axiosInstance.post("/auth/local", {"identifier": login, "password": password});
            return response;
        } catch(error){
            throw error;
        }
    }

    async getMe(): Promise<UserData>{
        try{
            const response = await this.axiosInstance.get("/users/me", {headers:{Authorization: `Bearer ${localStorage.getItem("jwt")}`}});
            console.log(response);
            return response.data;
        } catch(error){
            throw error;
        }
    }
}