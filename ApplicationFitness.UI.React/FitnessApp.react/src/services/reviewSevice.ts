import http from './http';
import Review, { GetReview } from './/interfaces/Review';
import FilterModel from './interfaces/SearchFilterModel';
import PagedCollectionResponse from './interfaces/PagedCollectionResponse';
const reviewPath = 'Review/';

export async function addReview(review:Review){
    const { data } = await http.post(`${reviewPath}add`, review);
    console.log(data);
    return data;
}

export async function getReviews(id:Number): Promise<GetReview[]>{
    const { data } = await http.get(`${reviewPath}getAll${id}`);
    console.log(data);
    return data;
}

export async function deleteReviewById(id:Number) {
    const { data } = await http.remove(`${reviewPath}${id}`)
    return data;
}
export async function getReviewsFiltered(filterModel:FilterModel) : Promise<PagedCollectionResponse> {
    const { data } = await http.get(`${reviewPath}filtered?Page=${filterModel.page}&Limit=${filterModel.limit}&Term=${filterModel.term}&SortedField=${filterModel.sortedField}&SortAsc=${filterModel.sortAsc}`);
    console.log(data);
    return data;
}
export async function updateReview(id: number, comment:Review) {
    const { data } = await http.put(`${reviewPath}${id}`, comment);
    console.log(data);
    return data;
}