<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const board = ref({
  title: "",
  content: "",
});
const router = useRouter();
const write = async () => {
  console.log(board.value);
  const url = "http://localhost:80/homeis/board/insert";

  console.log("board = ", JSON.stringify(board.value));
  //await axios.post(url, JSON.stringify(board.value));
  router.replace({ name: "FreeBoardList" });
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
