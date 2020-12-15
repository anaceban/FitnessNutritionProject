import http from './http';
import ProgramDay from './interfaces/ProgramDay';
import {DayDish} from '../Components/adminComponents/AddDishToDay';
import FilterModel from './interfaces/SearchFilterModel';
import PagedCollectionResponse from './interfaces/PagedCollectionResponse';
import { AddProgramDay } from './interfaces/AddProgramDay';
const dayPath = 'Day/';

export default async function createDay(dishDay:AddProgramDay){
    const {data} = await http.post(`${dayPath}addDay`, dishDay);
return data;
}
export async function getDayIds(){
    const {data} = await http.get(`${dayPath}getDayIds`);
return data;
}
export async function createDishDay(dishDay:DayDish){
    const {data} = await http.post(`${dayPath}addDishDay`, dishDay);
return data;
}
export async function getAll(filterModel:FilterModel):Promise<PagedCollectionResponse>{
    const {data} = await http.get(`${dayPath}allDays?Page=${filterModel.page}&Limit=${filterModel.limit}&Term=${filterModel.term}&SortedField=${filterModel.sortedField}&SortAsc=${filterModel.sortAsc}`);
    return data;
}
export async function deleteDay(id:number) {
    const {data} = await http.remove(`${dayPath}${id}`);
    return data;
}
