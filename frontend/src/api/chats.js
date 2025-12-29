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

export async function setTyping(chatId, typing) {
    await axiosInstance.post(`/chats/${chatId}/typing?typing=${typing}`);
}

export async function getTypingStatus(chatId) {
    const res = await axiosInstance.get(`/chats/${chatId}/typing`);
    return res.data;
}



