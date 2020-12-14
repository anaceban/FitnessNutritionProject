import Dish from './interfaces/Dish';
import http from './http';
import FilterModel from './interfaces/SearchFilterModel';
import PagedCollectionResponse from './interfaces/PagedCollectionResponse';
const dishPath = 'ProgramDish/';

async function createDish(dish:Dish){
    const {data} = await http.post(`${dishPath}add`, dish);
    console.log(data);
return data;
}

async function getAll(filterModel:FilterModel):Promise<PagedCollectionResponse>{
    const {data} = await http.get(`${dishPath}getAll?Page=${filterModel.page}&Limit=${filterModel.limit}&Term=${filterModel.term}&SortedField=${filterModel.sortedField}&SortAsc=${filterModel.sortAsc}`);
    console.log(data);
    return data;
}

async function getDishes(){
    const {data} = await http.get(`${dishPath}listDishes`);
    console.log(data);
    return data;
}
async function deleteDish(id:Number) {
    const {data} = await http.remove(`${dishPath}${id}`);
    return data;
}
async function updateDish(dish:Dish, id:Number) {
    const {data} = await http.put(`${dishPath}${id}`, dish);
    return data;
}

export default {
    createDish, getAll, deleteDish, updateDish, getDishes
}