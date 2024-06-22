import StrapiAPI from "./StrapiAPI";

export default class ContentTypeAPI extends StrapiAPI{
    constructor(){
        super();
    }

    async getGenres(){
        try{
            const response = await this.axiosInstance.get("/content-type-builder/content-types/api::disc.disc", {
                // Этот токен безопасен и ограничен в правах
                headers: {Authorization: `Bearer ${localStorage.getItem('jwt')}`}
            })
            const genres = response.data?.data?.schema?.attributes?.genre?.enum;
            return genres;
        } catch(error){
            throw error;
        }
    }
}