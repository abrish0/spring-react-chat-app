import axiosInstance from "../utils/axiosInstance";

// Get the currently logged-in user
export async function getMe(){
     try {
         const response = await axiosInstance.get("/users/me");
         return response.data;
     } catch (error) {
         return error.response?.data || error.message;
     }
};

// Get all users except logged-in
export async function getAllUsers(){
    try {
        const response = await axiosInstance.get("/users");
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
};

// Get a user by username (for lastSeen / status)
export async function getUserByUsername(username){
    const response = await axiosInstance.get(`/users/${username}`);
    return response.data;
}
