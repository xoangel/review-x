import axios from "axios";

export default async function uploadImages(imageURL: string): Promise<string>{
    try{
        const imageResponse = await axios.get(imageURL, { responseType: 'arraybuffer' });
        const imageData = new Blob([imageResponse.data], { type: imageResponse.headers['content-type'] });
        const formData = new FormData();
        const fileName = imageURL.split('/').pop();
        formData.append('files', imageData, fileName);
        const uploadResponse = await axios.post("http://localhost:1337/api/upload/", formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
      
        const uploadedImageUrl = uploadResponse.data[0].url;
        return uploadedImageUrl;
    } catch (error){
        throw error;
    }
}