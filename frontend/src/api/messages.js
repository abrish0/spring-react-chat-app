import axiosInstance from "../utils/axiosInstance";

export async function getMessages(chatId) {
    const res = await axiosInstance.get(`/messages/${chatId}`);
    return res.data;
}

export async function sendMessage(chatId, content) {
    const res = await axiosInstance.post("/messages", {
        chatId,
        content,
    });
    return res.data;
}
