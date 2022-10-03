import { Endpoint } from "../utils/enums";
import ApiService from "./apiService";

export default class CarService {
    private apiService : ApiService;

    constructor(apiService: ApiService){
        this.apiService = apiService;
    }

    public getCarsInfo = async () => {
        const response = await this.apiService.get(Endpoint.CAR);
        return response;
    }

    public changeSpeed = async (speed: number) => {
        const response = await this.apiService.post(Endpoint.SPEED, {speed}, false);
        return response;
    }

    public changeDir = async (dir: string) => {
        const response = await this.apiService.post(Endpoint.DIR, {dir}, false);
        return response;
    }

}