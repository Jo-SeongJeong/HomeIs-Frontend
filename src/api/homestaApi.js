import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const homestaApi = axios.create({
  baseURL: "http://localhost:80/homeis",
});

homestaApi.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  const token = authStore.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default homestaApi;
