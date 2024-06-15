import StrapiAPI from "./StrapiAPI";

export default class DiscAPI extends StrapiAPI{
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
}