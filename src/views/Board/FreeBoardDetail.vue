<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import boardApi from "@/api/boardApi";

const route = useRoute();
const id = route.params.id;
const board = ref({});

const isSameId = () => {
  const user = JSON.parse(localStorage.getItem("auth")).user;
  if (user == null) return false;
  if (user.id == board.value.userId) return true;
  return false;
};

const getBoard = async () => {
  const url = "http://localhost:80/homeis/board/detail/" + id;
  console.log(url);
  const data = await axios.get(url);
  console.log(data);
  board.value = data.data;
};
getBoard();
console.log("id:", id);

const router = useRouter();
const deleteBoard = async () => {
  if (!confirm("정말 삭제하시겠습니까?")) return;
  console.log("REAL BOARD ==", JSON.stringify(board.value));
  await boardApi.put("/board/delete", board.value);
  router.replace({ name: "FreeBoardList" });
  alert("정상적으로 삭제되었습니다!");
};
</script>

<template>
  <div>
    <div>{{ board.id }}</div>
    <button v-if="isSameId()" @click="deleteBoard">삭제</button>
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
