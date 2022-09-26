import axios from "axios";
import AuthService from "./authService";

export default class ApiService {

    public client = (sendToken: boolean) => {
        if(sendToken){
            const authService = new AuthService(this);
            return axios.create({
                baseURL: process.env.NEXT_PUBLIC_API_URL,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authService.getAccessToken()}`,
                },
            });
        }
        else{
            return axios.create({
                baseURL: process.env.NEXT_PUBLIC_API_URL,
                headers: {
                    'Accept': 'application/json',
                },
            });
        }
    }

    public async get(url: string, sendToken: boolean = true) {
        return await this.client(sendToken).get(url)
    }

    public async post(url: string, data: object, sendToken: boolean = true) {
        return await this.client(sendToken).post(url, data)
    }

    public async patch(url: string, data: object, sendToken: boolean = true) {
        return await this.client(sendToken).patch(url, data)
    }

    public async delete(url: string, data: object, sendToken: boolean = true) {
        return await this.client(sendToken).delete(url, data)
    }

}