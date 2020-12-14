import http from './http';
import ProgramSchedule from '../services/interfaces/ProgramSchedule';
import UserData from '../services/interfaces/UserData';
import ProgramDay from '../services/interfaces/ProgramDay';
import ProgramDish from './interfaces/ProgramDish';
const schedulePath = 'Account/';

export async function getProgram() : Promise<ProgramSchedule>{
    const { data } = await http.get(`${schedulePath}program`);
    console.log(data);
    return data;
}

export async function getUserData(): Promise<UserData>{
    const {data} = await http.get(`${schedulePath}profilePage`)
    return data;
}
export async function getProgramDays(): Promise<ProgramDay[]> {
    const {data} = await http.get(`${schedulePath}days`)
    return data;
}
export async function getDishesForProgram(): Promise<ProgramDish[]> {
    
    const {data} = await http.get(`${schedulePath}dishes`)
    
    return data;
}