<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

import hotSwiper from "@/components/homestagram/hotSwiper.vue";
import latestSwiper from "../../components/homestagram/latestSwiper.vue";
import homestaRankSwiper from "../../components/homestagram/homestaRankSwiper.vue";

const router = useRouter();
const goWrite = () => {
  const user = JSON.parse(localStorage.getItem("auth"));
  console.log("USER = ", user);
  if (user.user == null) {
    alert("권한이 없습니다!");
    return;
  }
  router.push({
    path: "/board/homestagram/write",
  });
};
</script>

<template>
  <div id="homesta-view-main">
    <div id="rank"><homestaRankSwiper /></div>
    <div id="homesta-main">
      <h2>😆 최근 올라온 게시물은 어떤가요?</h2>
      <div id="latest-swiper">
        <h3>- 끊임없이 올라오는 게시물들을 확인해보세요!</h3>
        <a @click="goWrite">글쓰기</a>
      </div>
      <latestSwiper />
      <h2>&#128293; 최근 핫한 게시물을 보십시요!</h2>
      <h3>- HOT!! 한 집의 구조를 알아보세요</h3>
      <hotSwiper />
    </div>
  </div>
</template>

<style scoped>
body {
  overflow-x: hidden;
}
#homesta-view-main {
  width: 100vw;
}

h2 {
  margin: 1vh;
}
h3 {
  margin: 1vh;
}
#latest-swiper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    margin-right: 1vw;
    cursor: pointer;
    font-size: 1.1rem;
  }
}
#homesta-main {
  background-color: rgb(243, 245, 249);
  padding-top: 3vh;
  padding-left: 12vw;
  padding-right: 12vw;
  padding-bottom: 5vh;
}
#homesta-image-list {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
#rank {
  width: 100%;
  height: 400px;
  /* background-color: aliceblue; */
}
</style>
