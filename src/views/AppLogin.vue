<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const router = useRouter();

const loginForm = ref({
  id: "",
  password: "",
});

const login = async () => {
  try {
    await authStore.login(loginForm.value);
    console.log("Token : ", authStore.token);
    console.log("User : ", authStore.user);
    router.push({
      path: "/",
    });
  } catch (error) {
    console.error("에러:", error);
    alert("로그인에 실패하였습니다!");
  }
};
</script>

<template>
  <div>
    <h3>로그인</h3>
    <h3>로그인</h3>
    <h3>로그인</h3>
    <h3>로그인</h3>
    <form @submit.prevent="login">
      <label
        ><input type="text" v-model.trim="loginForm.id" required />아이디</label
      >
      <br />
      <label
        ><input
          type="password"
          v-model.trim="loginForm.password"
          required
        />비밀번호</label
      >
      <br />
      <input type="submit" value="로그인" />
    </form>
  </div>
</template>

<style scoped></style>
