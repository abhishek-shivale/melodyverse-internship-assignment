import axiosInstance from "../app/axiosInstance";

export const getAllPost = () =>{
    const response = axiosInstance.get('/post/')
    return response
}