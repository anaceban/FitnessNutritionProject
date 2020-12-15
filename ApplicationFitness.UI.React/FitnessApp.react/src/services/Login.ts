import {LoginUser} from './interfaces/LoginUser';

export const LoginAsync = async (data: LoginUser) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    fetch('https://localhost:44310/api/Account/login', requestOptions)
    .then((response) => {
        return response.json();
      })
    .catch(error => {
        return { error: error.response.data.message }
    })
    return;
};
