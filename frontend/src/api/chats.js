import axiosInstance from "../utils/axiosInstance";

export async function getChats(){
    const res = await axiosInstance.get("/chats");
    return res.data;
};
