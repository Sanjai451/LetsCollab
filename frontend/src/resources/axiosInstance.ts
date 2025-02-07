const pistonBaseUrl = "https://emkc.org/api/v2/piston"
import axios, { AxiosInstance } from 'axios'

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: pistonBaseUrl,
    headers: {
        "Content-Type": "application/json",
    },
})