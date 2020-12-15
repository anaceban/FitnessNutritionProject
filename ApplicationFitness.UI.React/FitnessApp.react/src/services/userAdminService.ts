import http from './http';
import FilterModel from './interfaces/SearchFilterModel';
import PagedCollectionResponse from './interfaces/PagedCollectionResponse';
import User from '../services/interfaces/User';
const userPath = 'User/';



async function getAll(){
    const {data} = await http.get(`${userPath}users`);
    return data;
}

async function getSorted(filterModel:FilterModel):Promise<PagedCollectionResponse>{
    const {data} = await http.get(`${userPath}sorted?Page=${filterModel.page}&Limit=${filterModel.limit}&Term=${filterModel.term}&SortedField=${filterModel.sortedField}&SortAsc=${filterModel.sortAsc}`);
    return data;
}
async function updateUserRole(user: User){
    const {data} = await http.put(`${userPath}updateRole`, user);
    return data;
}
export default{
    getAll, getSorted, updateUserRole
}