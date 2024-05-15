<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const boardList = ref([]);

const selectAll = async () => {
  const url = "http://localhost:80/homeis/board/list";

  const { data } = await axios.get(url);

  console.log(data);

  boardList.value = data;
};

selectAll();

const goDetail = (id) => {
  // router.push(`/free-board/${id}`);
  router.push({ name: "FreeBoardDetail", params: { id } });
};
</script>

<template>
  <div style="width: 100%; height: 300px; background-color: aliceblue">
    활동지수 랭킹
  </div>
  <h1>자유게시판</h1>
  <router-link to="/board/free-board/write">+ 글쓰기</router-link>
  <div>
    <table>
      <tr
        v-for="board in boardList"
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
