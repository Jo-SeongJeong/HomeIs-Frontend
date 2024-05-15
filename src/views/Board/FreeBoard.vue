<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <Header />
  
  <h1>자유 게시판</h1>
  <router-link to="free-board/write">글쓰기</router-link>
  <Footer />
</template>

<style scoped></style>
