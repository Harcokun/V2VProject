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

    public addCar = async (data: any) => {
        const response = await this.apiService.post(Endpoint.CAR, data, false);
        return response;
    }

    public editCar = async (data: any) => {
        const response = await this.apiService.patch(Endpoint.CAR, data, false);
        return response;
    }

    public changeSpeed = async (id: string, speed: number) => {
        const response = await this.apiService.post(Endpoint.SPEED, {id, speed}, false);
        return response;
    }

    public changeDir = async (id: string, dir: string) => {
        const response = await this.apiService.post(Endpoint.DIR, {id, dir}, false);
        return response;
    }

}