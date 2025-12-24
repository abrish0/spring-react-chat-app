import axiosInstance from "../utils/axiosInstance";

export async function signup(data) {
    try {
        const response = await axiosInstance.post("/auth/signup", data);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

export async function login(data) {
    try {
        const response = await axiosInstance.post("/auth/login", data);
        return response.data; 
    } catch (error) {
        return error.response?.data || error.message;
    }
}
