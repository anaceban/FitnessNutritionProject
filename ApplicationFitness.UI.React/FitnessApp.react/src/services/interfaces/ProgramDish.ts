import Dish from "./Dish";

export default interface ProgramDish {
    dishes: Dish[],
    programDayNumber: string,
    trainingLink: string
}