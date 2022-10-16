import ApiService from '../services/apiService';
import AuthService from '../services/authService';
import CarService from '../services/carService';

const apiService = new ApiService();
const authService = new AuthService(apiService);
const carService = new CarService(apiService);

export const container = {
    authService,
    carService
}