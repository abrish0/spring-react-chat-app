import axiosInstance from "../utils/axiosInstance";

export async function getChats(){
    const res = await axiosInstance.get("/chats");
    return res.data;
}

export async function createChat(withUser) {
    const res = await axiosInstance.post(
        `/chats?withUser=${withUser}`
    );
    return res.data;
}



