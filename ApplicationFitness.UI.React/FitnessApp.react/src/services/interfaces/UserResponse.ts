export default interface UserResponse{
    Message: string, 
    isSucces: Boolean,
    ExpireDate: Date,
    token: string,
    isAdmin:boolean
}