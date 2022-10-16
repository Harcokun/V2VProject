import { Endpoint } from '../utils/enums';
import ApiService from "./apiService";

export type LoginCredentialsType = {
    username: string
    password: string
}

export default class AuthService {
    private apiService : ApiService;

    constructor(apiService : ApiService){
        this.apiService = apiService;
    }
    
    public async login(credentials: LoginCredentialsType) {
        this.clearAccessToken();
        const response = await this.apiService.post(Endpoint.LOGIN, credentials, false);
        const token = await response.data.kiosk_token;
        this.clearAccessToken();
    }

    public async logout() {
        const response = await this.apiService.get(Endpoint.LOGOUT);
        this.setAccessToken('');
        return response;
    }

    public isKioskLogin() {
        return localStorage.getItem('access token') != null;
    }

    public async getKioskInfo() {
        const response = await this.apiService.get(Endpoint.ME);
        return response.data.data;
    }

    public getAccessToken() {
        return localStorage.getItem('access token');
    }

    public setAccessToken(token: string) {
        localStorage.setItem('access token', token);
    }

    public clearAccessToken() {
        localStorage.removeItem('access token');
    }


}