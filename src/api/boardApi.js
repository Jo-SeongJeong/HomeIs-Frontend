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

boardApi.interceptors.response.use(
  (response) => response,
  (error) => {
    //권한 오류 발생 시
    console.error("요청 응답 오류", error);
    const status = error.response.status;
    console.log("STATUS NUMBER = ", status);
    console.log("STATUS NUMBER = ", error.response.data);
    if (status == 401) {
      const authStore = useAuthStore();
      authStore.logout();
      alert("당신에겐 권한이 없습니다.");
    }
    return Promise.reject(error); //원래 반환해야하는 형식 크게 고려하지 않아도 됨
  }
);

export default boardApi;
