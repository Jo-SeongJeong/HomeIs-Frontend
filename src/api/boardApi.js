import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const boardApi = axios.create({
  baseURL: "http://localhost:80/homeis",
});

boardApi.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  const token = authStore.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default boardApi;
