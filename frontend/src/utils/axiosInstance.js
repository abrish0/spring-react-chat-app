import axios from "axios";
import { getToken } from "./auth";

const API_URL = "http://localhost:8080/api";

// Create axios instance
const axiosInstance = axios.create({
    baseURL: API_URL,
});

// Add request interceptor to include JWT
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
