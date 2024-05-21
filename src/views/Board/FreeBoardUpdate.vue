<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import boardApi from "@/api/boardApi";


const route = useRoute();
const board = ref({
  userId: JSON.parse(localStorage.getItem("auth")).user.id,
  title: "",
  content: "",
  id:"",
});

board.value.id = route.params.id;

const router = useRouter();

const getBoard = async () => {
  const url = "/board/detail/" + board.value.id;
  console.log(url);
  const data = await boardApi.get(url);
  console.log(data);
  board.value = data.data;
};
getBoard();


const update = async () => {
  // const user = JSON.parse(localStorage.getItem("auth")).user;
  // if (user == null || user.job != "관리자") {
  //   alert("당신에겐 권한이 없습니다.");
  //   router.replace("/");
  //   return;
  // }
  console.log(board.value);

  console.log("UPDATED NOTICE", board.value);
  if (!confirm("정말 게시물을 수정하시겠습니까?")) return;

  await boardApi.put("/board/update", board.value);
  router.replace({ name: "FreeBoardDetail", params: { id: board.value.id} } );
  alert("정상적으로 게시물이 수정되었습니다.");
};

</script>

<template>
  <div>
    <form @submit.prevent="update(event)">
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
      <input type="submit" value="수정" />
    </form>
  </div>
</template>
<style scoped></style>
