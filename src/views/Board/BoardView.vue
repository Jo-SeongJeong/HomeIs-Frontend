<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import {ref} from "vue";

const title = ref('aa');
const setTitle = (event) => {
  title.value = event.target.innerText;
  console.log(title.value);
  console.log("fdfs")
}
</script>

<template>
    <Header />
  <div>
    <ul>
      <li>
        <router-link to="/board/notice" @click="setTitle" v-if="title === '공지 및 문의'" style="font-size: 100px;">공지 및 문의</router-link>
        <router-link to="/board/notice" @click="setTitle" v-else>공지 및 문의</router-link>
      </li>
      <li>
        <router-link to="/board/free-board" @click="setTitle" v-if="title === '자유게시판'" style="font-size: 100px;">자유게시판</router-link>
        <router-link to="/board/free-board" @click="setTitle" v-else>자유게시판</router-link>
      </li>
      <li>
        <router-link to="/board/homestagram" @click="setTitle" v-if="title === '홈스타그램'" style="font-size: 100px;">홈스타그램</router-link>
        <router-link to="/board/homestagram" @click="setTitle" v-else>홈스타그램</router-link>
      </li>
    </ul>
  </div>
  <router-view @setTitle="setTitle"></router-view>
  <Footer />
</template>

<style scoped>
ul {
  list-style-type: none;
  display: flex;
  border-bottom: 1px solid black;
}

ul li {
  padding: 20px;
}
</style>
