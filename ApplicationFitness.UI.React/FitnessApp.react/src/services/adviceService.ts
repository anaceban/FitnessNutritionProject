import http from './http';
import ProgramAdvice from './interfaces/ProgramAdvice';
const advicePath = "Advice/";

export async function getAdvices(): Promise<ProgramAdvice[]> {
    const { data } = await http.get(`${advicePath}advices`);
    console.log(data);
    return data;
}