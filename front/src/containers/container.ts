import ApiService from '../services/apiService';
import AuthService from '../services/authService';
// import UserService from '../services/userService';

const apiService = new ApiService();
const authService = new AuthService(apiService);
// const userService = new UserService(apiService);

export const container = {
    authService
}