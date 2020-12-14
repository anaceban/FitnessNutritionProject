import ProgramDish from '../interfaces/Dish';

export interface AddProgramDay {
    dayName: string,
    trainingLink: string,
    scheduleId: number,
    dishes: ProgramDish []
}