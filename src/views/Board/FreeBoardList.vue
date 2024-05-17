<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const boardInfo = ref({});

const selectAll = async () => {
  const url = "http://localhost:80/homeis/board/list";

  const { data } = await axios.get(url);

  console.log(data);

  boardInfo.value = data;
  console.log("BOARD: ", boardInfo.value.boardList[0]);
};

selectAll();

const goDetail = (id) => {
  router.push({ name: "FreeBoardDetail", params: { id } });
};

const goWrite = () => {
  const user = JSON.parse(localStorage.getItem("auth"));
  console.log("USER = ", user);
  if (user.user == null) {
    alert("권한이 없습니다!");
    return;
  }
  router.push({
    path: "/board/free-board/write",
  });
};
</script>

<template>
  <div style="width: 100%; height: 300px; background-color: aliceblue">
    활동지수 랭킹
  </div>
  <h1>자유게시판</h1>
  <a @click="goWrite" style="color: red">+ 글쓰기</a>
  <div>
    <table>
      <tr
        v-for="board in boardInfo.boardList"
        :key="board.id"
        @click="goDetail(board.id)"
      >
        <td>{{ board.title }}</td>
        <td>{{ board.createTime }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped></style>
