import { notification } from "antd";
import axios from "axios";
export const apiClient = axios.create({
    baseURL: 'https://asadbek6035.pythonanywhere.com',
    headers: {}
})
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("access")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}
);
apiClient.interceptors.response.use(
    (config) => {
        return config
    }, (err) => {
        if (err.status == 403) {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            window.location.pathname = '/login'
        }
        if (err.status == 429) {
            notification.error({message:err?.response?.statusText,description:err?.response?.data?.detail})
        }
        if (err.status >= 400) {
            notification.error({message:err?.response?.statusText,description:err?.response?.data?.detail})
        }
    }
)