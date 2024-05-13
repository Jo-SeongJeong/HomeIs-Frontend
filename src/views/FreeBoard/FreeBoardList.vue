<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const boardList = ref([]);

const selectAll = async () => {
  const url = "http://localhost/homeis/board/list";

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
  <div>
    <h1>전체 조회</h1>
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
