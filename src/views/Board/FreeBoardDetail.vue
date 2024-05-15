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
</script>

<template>
  <div>
    <div>{{ board.id }}</div>
    <div>{{ board.createTime }}</div>
    <div>{{ board.content }}</div>

    <hr>

    <table>
      <tr
        v-for="comment in board.commentList"
        :key="board.id"
      >
        <td>{{ comment.comment }}</td>
        <td>{{ comment.createTime }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped></style>
