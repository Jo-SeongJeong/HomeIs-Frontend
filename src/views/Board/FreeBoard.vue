<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <Header />
  <div style="width: 100%; height: 300px; background-color: aliceblue">
    활동지수 랭킹
  </div>
  <h1>자유 게시판</h1>
  <router-link to="free-board/write">글쓰기</router-link>
  <Footer />
</template>

<style scoped></style>
