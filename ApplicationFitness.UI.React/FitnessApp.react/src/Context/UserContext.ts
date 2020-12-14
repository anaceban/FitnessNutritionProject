import React, {createContext} from 'react';
import UserResponse from '../services/interfaces/UserResponse';
export interface User{
    user:UserResponse,
    onLogin:(user:UserResponse) => void;
    onLogOut:() => void;
}

const UserContext = createContext({} as User);

export default UserContext;