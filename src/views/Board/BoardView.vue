<script setup>
import Footer from "@/components/Footer.vue";
import { ref } from "vue";

const title = () => {
 return JSON.parse(localStorage.getItem('headerTitle')).title;
}  
</script>

<template>
  <div id="board-main">
    <div id="board-nav">
      <div id="nav-chose" :class="{ chosen: title() == '공지 및 문의' }">
        <router-link
          to="/board/notice"
          v-if="title() === '공지 및 문의'"
          style="color: black; text-decoration: none"
          >공지 및 문의</router-link
        >
        <router-link
          to="/board/notice"
          v-else
          style="color: gray; text-decoration: none"
          >공지 및 문의</router-link
        >
      </div>
      <div id="nav-chose" :class="{ chosen: title() == '자유게시판' }">
        <router-link
          to="/board/free-board/0"
          v-if="title() === '자유게시판'"
          style="color: black; text-decoration: none"
          >자유게시판</router-link
        >
        <router-link
          to="/board/free-board/0"
          v-else
          style="color: gray; text-decoration: none"
          >자유게시판</router-link
        >
      </div>
      <div id="nav-chose" :class="{ chosen: title() == '홈스타그램' }">
        <router-link
          to="/board/homestagram"
          v-if="title() === '홈스타그램'"
          style="color: black; text-decoration: none"
          >홈스타그램</router-link
        >
        <router-link
          to="/board/homestagram"
          v-else
          style="color: gray; text-decoration: none"
          >홈스타그램</router-link
        >
      </div>
    </div>
  </div>

  <router-view></router-view>
  <Footer />
</template>

<style scoped>
#board-main {
  width: 100vw;
  height: 12vh;
}
#board-nav {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
  font-size: 1.2rem;
}
#nav-chose {
  text-align: center;
  width: 10%;
  margin-left: 5%;
  margin-right: 5%;
}
.chosen {
  border-bottom: 1px solid black;
}
</style>
