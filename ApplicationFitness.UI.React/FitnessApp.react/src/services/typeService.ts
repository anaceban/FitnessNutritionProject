import Type from './/interfaces/ProgramType';
import ProgramType from './/interfaces/Type';
import http from './http';
import FilterModel from './interfaces/SearchFilterModel';
import PagedCollectionResponse from '../services/interfaces/PagedCollectionResponse';
const typePath = 'ProgramType/';

export async function getTypes(): Promise<ProgramType[]> {
    const { data } = await http.get(`${typePath}types`);
    console.log(data);
    return data;
}
export async function getTypesFiltered(filterModel:FilterModel):Promise<PagedCollectionResponse> {
    const { data } = await http.get(`${typePath}filtered?Page=${filterModel.page}&Limit=${filterModel.limit}&Term=${filterModel.term}&SortedField=${filterModel.sortedField}&SortAsc=${filterModel.sortAsc}`);
    console.log(data);
    return data;
}
export async function deleteType(id:number) {
    const { data } = await http.remove(`${typePath}${id}`);
    return data;
}
export async function createType(type:Type) {
    const { data } = await http.post(`${typePath}create`, type);
    console.log(data);
    return data;
}
export async function updateType(id: number, type:Type) {
    const { data } = await http.put(`${typePath}${id}`, type);
    console.log(data);
    return data;
}