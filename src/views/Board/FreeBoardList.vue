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
  <h1>자유게시판</h1>
  <router-link to="/board/1">TEST</router-link>
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
