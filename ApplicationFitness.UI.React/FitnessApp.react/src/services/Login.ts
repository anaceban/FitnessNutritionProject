import {LoginUser} from './interfaces/LoginUser';

export const LoginAsync = async (data: LoginUser) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    fetch('https://localhost:44310/api/Account/login', requestOptions)
    .then((response) => {
        console.log(response);
        return response.json();
      })
    .catch(error => {
        console.log('There was an error', error);
        return { error: error.response.data.message }
    })
    return;
};
