import StrapiAPI from "./StrapiAPI";

export default class ContentTypeAPI extends StrapiAPI{
    constructor(){
        super();
    }

    async getGenres(){
        try{
            const response = await this.axiosInstance.get("/content-type-builder/content-types/api::disc.disc", {
                // Этот токен безопасен и ограничен в правах
                headers: {Authorization: '969658809d03dba20347811a15eb996c06551f29f8dc285a457b8f79c5b3a19dda3897cf3bce8370373d8229f34b3a599f2281377d46f284e5a30cc4b08526b00ffcbbb9df347843e558af807957e86a1ca27c93c757d5df71724fcfcc5186155c1b78ce245a00b1f3439f9e25d83c640ef211aee2533fc4cf08bec9e6f37450'}
            })
            const genres = response.data?.data?.schema?.attributes?.genre?.enum;

            return genres;
        } catch(error){
            throw error;
        }
    }
}