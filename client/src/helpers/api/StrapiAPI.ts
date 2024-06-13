import axios, { AxiosInstance } from 'axios';

export default class StrapiAPI{
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string = "http://localhost:1337/api/", headers: Record<string, string> = {}) {
      this.axiosInstance = axios.create({
        baseURL,
        headers
      });
    }

    get axiosInstanse(){
        return this.axiosInstance;
    }
}