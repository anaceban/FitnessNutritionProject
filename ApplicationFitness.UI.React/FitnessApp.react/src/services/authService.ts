import { LoginUser } from './interfaces/LoginUser';
import http from './http';
import UserResponse from './interfaces/UserResponse';
const authPath = 'Account/';

http.setToken(token());
async function login(loginUser: LoginUser) : Promise<UserResponse> {
    const { data } = await http.post(`${authPath}login`, loginUser);
    console.log(data);
    const token = (data as UserResponse).token;
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('token', token);
    http.setToken(token);
    return data;
    

}
async function logOut(): Promise <any> {
    await http.postNoParam(`${authPath}logout`);
    localStorage.clear();
}
function token(){
    return localStorage.getItem('token') ?? '';
}
function getCurrentUser():UserResponse{
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) as UserResponse : {} as UserResponse;
    return user;
}

export default {
    login,
    token,
    logOut,
    getCurrentUser
}