<script setup>
import { useRoute } from "vue-router";
const route = useRoute();

console.log("FreeBoardDetail의 route", route);
const id = route.params.id;
console.log("id:", id);
</script>

<template>
  <div>
    <h1>ㄴㅇㄴㄴ</h1>
  </div>
</template>

<style scoped></style>
