import {RegisterUser} from './interfaces/RegisterUser';
import http from './http';
import UserResponse from './interfaces/UserResponse';
import authService from '../services/authService';
const registerPath = 'Account/';

http.setToken(authService.token());
async function register(registerUser:RegisterUser): Promise<UserResponse>{
    const {data} = await http.post(`${registerPath}register`, registerUser);
    console.log(data);
    const token = (data as UserResponse).token;
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('token', token);
    http.setToken(token);

return data;
}

export default {
    register
}