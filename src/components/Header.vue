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
  router.push({
    path: "/",
  });
};
</script>

<template>
  <div id="main">
    <div id="div-1" @click="goHome"></div>
    <div id="div-2">
      <router-link to="/board/free-board/0" style="text-decoration: none"
        >커뮤니티</router-link
      >

      <router-link to="/subscription" style="text-decoration: none"
        >이자 계산기</router-link
      >

      <router-link to="/loan" style="text-decoration: none"
        >대출 상품</router-link
      >

      <router-link to="/map/0/0" style="text-decoration: none"
        >지도</router-link
      >

      <router-link to="/interest-area" style="text-decoration: none"
        >관심 지역</router-link
      >
    </div>
    <div id="space-1"></div>
    <div id="div-3" v-if="authStore.token == null">
      <a
        ><router-link to="/login" style="text-decoration: none; cursor: pointer"
          >로그인 / 회원가입</router-link
        ></a
      >
      <!-- <a
        ><router-link
          to="/sign-up"
          style="text-decoration: none; cursor: pointer"
          >회원가입</router-link
        ></a
      > -->
    </div>
    <div id="div-3" v-else>
      <p>{{ authStore.user.name }} 님</p>
      <a @click="logout" style="cursor: pointer">로그아웃</a>
    </div>
    <div id="space-2"></div>
  </div>
</template>

<style scoped>
#main {
  width: 100vw;
  height: 7vh;
  position: fixed;
  border-bottom: 1px solid black;
  background-color: rgb(88, 153, 214);
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.2rem;
  z-index: 101;
}
#div-1 {
  width: 10%;
  height: 80%;
  background-image: url("../assets/img/homeis-white.png");
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

  a {
    color: white;
  }
}
#space-1 {
  width: 48%;
}
#div-3 {
  width: 15%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  p {
    color: white;
  }
  a {
    color: white;
  }
}
#space-2 {
  width: 2%;
}
</style>
