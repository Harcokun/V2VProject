import ApiService from '../services/apiService';
import AuthService from '../services/authService';

const apiService = new ApiService();
const authService = new AuthService(apiService);

export const container = {
    authService,
}