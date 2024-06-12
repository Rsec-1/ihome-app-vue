import axios from "axios";
import { useUserStore } from "@/stores/user";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_URL, // 替换为你的后端API URL
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
