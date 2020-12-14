import http from './http';
import FilterModel from './interfaces/SearchFilterModel';
import PagedCollectionResponse from './interfaces/PagedCollectionResponse';
import CreateProgramSchedule from '../services/interfaces/CreateProgramSchedule';
import ProgramSchedule from './interfaces/ProgramSchedule';
const schedulePath = 'ProgramSchedule/';

async function getSorted(filterModel:FilterModel):Promise<PagedCollectionResponse>{
    console.log(`Sended Model page ${filterModel.page}`)
    const {data} = await http.get(`${schedulePath}getAll?Page=${filterModel.page}&Limit=${filterModel.limit}&Term=${filterModel.term}&SortedField=${filterModel.sortedField}&SortAsc=${filterModel.sortAsc}`);
    console.log(data);
    return data;
}
async function createSchedule(schedule:CreateProgramSchedule){
    const {data} = await http.post(`${schedulePath}create`, schedule);
    console.log(data);
    return data;
}
async function deleteProgram(id:Number) {
    const {data} = await http.remove(`${schedulePath}${id}`);
    return data;
}
async function updateProgram(schedule:CreateProgramSchedule, id:Number) {
    const {data} = await http.put(`${schedulePath}${id}`, schedule);
    return data;
}

async function getProgramByTypeId(id:Number): Promise<CreateProgramSchedule> {
    const {data} = await http.get(`${schedulePath}get${id}`);
    return data;
}
async function getProgramIds() {
    const {data} = await http.get(`${schedulePath}listIds`);
    return data;
}
export default{
    getSorted, createSchedule, deleteProgram, updateProgram, getProgramByTypeId, getProgramIds

}