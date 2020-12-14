export default interface Review {
    comment: string,
    scheduleId: number,
    ratingMark: number
}
export interface GetReview {
    comment: string,
    scheduleId: number,
    firstName: string,
    lastName: string,
    ratingMark: number
}
export interface ReviewAdmin {
    comment: string,
    userId: number,
    scheduleId: number,
    id: number
}

export interface UpdateReview {
    comment: string
}