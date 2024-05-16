<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const id = route.params.id;
const board = ref({});

const getBoard = async () => {
  const url = "http://localhost:80/homeis/board/detail/" + id;
  console.log(url);
  const data = await axios.get(url);
  console.log(data);
  board.value = data.data;
};
getBoard();
console.log("id:", id);

const deleteBoard = async () => {
  const url = "http://localhost:80/homeis/board/delete/";
  //await axios.delete(url, JSON.stringify());
};
</script>

<template>
  <div>
    <div>{{ board.id }}</div>
    <button @click="deleteBoard">삭제</button>
    <div>{{ board.createTime }}</div>
    <div>{{ board.content }}</div>

    <hr />

    <table>
      <tr v-for="comment in board.commentList" :key="board.id">
        <td>{{ comment.comment }}</td>
        <td>{{ comment.createTime }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped></style>
