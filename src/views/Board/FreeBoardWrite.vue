<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import boardApi from "@/api/boardApi";

const board = ref({
  userId: JSON.parse(localStorage.getItem("auth")).user.id,
  title: "",
  content: "",
});
const router = useRouter();
const write = async () => {
  console.log(board.value);

  if (!confirm("정말 등록하시겠습니까?")) return;

  console.log("board = ", JSON.stringify(board.value));
  await boardApi.post("/board/insert", board.value);
  router.replace({ name: "FreeBoardList" });
  alert("글이 정상적으로 등록되었습니다.");
};
</script>

<template>
  <div>
    <form @submit.prevent="write(event)">
      <input type="text" name="title" id="" v-model="board.title" />
      <br />
      <textarea
        name="content"
        id=""
        cols="30"
        rows="10"
        v-model="board.content"
      ></textarea>
      <br />
      <input type="submit" value="등록" />
    </form>
  </div>
</template>
<style scoped></style>
