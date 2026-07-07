import axios from "axios";
import { env } from "./env";

export const api = axios.create({
    baseURL: env.VITE_API_URL,
    timeout: 5000,
    withCredentials: true,
})

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if(
            error.response?.status == 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true

            const refresh = await api.post("/auth/refresh")

            const token = refresh.data.accessToken

            api.defaults.headers.common.Authorization = `Bearer ${token}`
            originalRequest.headers.Authorization = `Bearer ${token}`

            return api(originalRequest)
        }

        return Promise.reject(error)
    }
)