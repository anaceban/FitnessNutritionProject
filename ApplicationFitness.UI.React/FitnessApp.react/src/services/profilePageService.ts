import CreatePage from './interfaces/CreatePage';
import http from './http';
const registerPath = 'Account/';

async function createPage(registerUser:CreatePage){
    const {data} = await http.put(`${registerPath}page`, registerUser);
return data;
}

export default {
    createPage
}