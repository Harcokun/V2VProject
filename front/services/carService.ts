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

    public getOneCarInfo = async (_id: string) => {
        const response = await this.apiService.get(Endpoint.CAR + "/" + _id);
        return response;
    }

    public getActiveCarsInfo = async () => {
        const response = await this.apiService.get(Endpoint.LOCATION);
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

    public speedUp = async () => {
        const response = await this.apiService.get(Endpoint.SPEEDUP);
        return response.data;
    }

    public speedDown = async () => {
        const response = await this.apiService.get(Endpoint.SPEEDDOWN);
        return response.data;
    }

    public turnLeft = async () => {
        const response = await this.apiService.get(Endpoint.TURNLEFT);
        return response.data;
    }

    public turnRight = async () => {
        const response = await this.apiService.get(Endpoint.TURNRIGHT);
        return response.data;
    }

    // public changeSpeed = async (_id: string, velocity: number) => {
    //     const response = await this.apiService.post(Endpoint.SPEED, {_id, velocity}, false);
    //     return response;
    // }

    // public changeDir = async (_id: string, dir: string) => {
    //     const response = await this.apiService.post(Endpoint.DIR, {_id, dir}, false);
    //     return response;
    // }

}