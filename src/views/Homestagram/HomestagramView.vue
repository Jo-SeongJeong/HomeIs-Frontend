<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
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
  <div>
    <a @click="goWrite" style="color: red">+ 글쓰기</a>
  </div>
</template>

<style scoped></style>
