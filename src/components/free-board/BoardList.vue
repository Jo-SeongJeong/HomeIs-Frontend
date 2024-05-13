<script setup>
import axios from "axios";
import { ref } from "vue";

const boardList = ref([]);

const selectAll = async () => {
  const url = "http://localhost/homeis/board/list";

  const { data } = await axios.get(url);

  console.log(data);

  boardList.value = data;
};

selectAll();
</script>

<template>
  <div>
    <h1>전체 조회</h1>
    <table>
      <tr v-for="board in boardList" :key="board.id">
        <td>{{ board.title }}</td>
        <td>{{ board.createTime }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped></style>
