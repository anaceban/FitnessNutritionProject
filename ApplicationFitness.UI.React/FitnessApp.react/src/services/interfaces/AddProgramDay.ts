import ProgramDish from '../interfaces/Dish';
import ProgramType from './Type';

export interface AddProgramDay {
    dayName: string,
    trainingLink: string,
    typeName: string,
    dishes: ProgramDish []
}