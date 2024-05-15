<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const id = route.params.id;
const board = ref({});

const getBoard = async () => {
  const url = "http://localhost:80/homeis/board/detail/" + id;
  const data = await axios.get(url);
  console.log(data);
  board.value = data.data;
};
getBoard();
console.log("id:", id);
</script>

<template>
  <div>
    <div>{{ board[0].boardId }}</div>
    <div>{{ board[0].createTime }}</div>
    <div>{{ board[0].comment }}</div>
  </div>
</template>

<style scoped></style>
