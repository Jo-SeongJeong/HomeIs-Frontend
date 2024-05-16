import { ref } from "vue";
import { defineStore } from "pinia";
import authApi from "@/api/authApi";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(null);
  const user = ref(null);

  const join = async (joinInfo) => {
    const response = await authApi.post("/register", joinInfo);
  };

  const login = async (loginInfo) => {
    const response = await authApi.post("/login", loginInfo);

    //토큰 정보 및 유저 정보 세팅
    token.value = response.data;
    user.value = jwtDecode(token.value);
  };

  const logout = () => {
    //토큰 정보 및 유저 정보 삭제
    token.value = null;
    user.value = null;
  };

  return { user, token, join, login, logout };
});
