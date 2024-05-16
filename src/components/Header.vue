<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const router = useRouter();
const authStore = useAuthStore();
const goHome = () => {
  router.push({
    path: "/",
  });
};

const logout = () => {
  authStore.logout();
};
</script>

<template>
  <div id="main">
    <div id="div-1" @click="goHome"></div>
    <div id="div-2">
      <p><router-link to="/board/free-board">커뮤니티</router-link></p>
      <p><router-link to="/subscription">주택 청약</router-link></p>
      <p><router-link to="/loan">대출 상품</router-link></p>
      <p><router-link to="/map">지도</router-link></p>
      <p><router-link to="/interest-area">관심 지역</router-link></p>
    </div>
    <div id="space-1"></div>
    <div id="div-3" v-if="authStore.user == null">
      <a><router-link to="/login">로그인</router-link></a>
      <a><router-link to="/sign-up">회원가입</router-link></a>
    </div>
    <div id="div-3" v-if="authStore.user != null">
      <button @click="logout">로그아웃</button>
    </div>
    <div id="space-2"></div>
  </div>
</template>

<style scoped>
#main {
  width: 99vw;
  height: 8vh;
  position: fixed;
  border-bottom: 1px solid black;
  background-color: rgb(55, 100, 141);
  display: flex;
  flex-direction: row;
  align-items: center;
}
#div-1 {
  width: 10%;
  height: 80%;
  background-image: url("../assets/img/logo-size-s.png");
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
}
#div-2 {
  width: 35%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
#space-1 {
  width: 48%;
}
#div-3 {
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
#space-2 {
  width: 2%;
}
</style>
