import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000"; // ✅ Fixed typo

export const axiosInstance = axios.create({
    baseURL: API_URL, // ✅ Removed /api since backend doesn't have it
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.config.url === '/admin/getuser' && error.response?.status === 401) {
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);