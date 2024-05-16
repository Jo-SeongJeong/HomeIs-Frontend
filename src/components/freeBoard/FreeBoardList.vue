<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const freeBoardInfo = ref({});

const freeBoardSelectAll = async () => {
  const url = "http://localhost:80/homeis/board/list";

  const { data } = await axios.get(url);
  console.log("Free = ", data);
  freeBoardInfo.value = data;
};

freeBoardSelectAll();
</script>

<template>
  <div id="freeBoard-main">
    <div id="freeBoard-header">
      <h1>자유 게시판</h1>
      <a>더보기</a>
    </div>
    <hr />
    <table>
      <tr v-for="freeBoard in freeBoardInfo.boardList" :key="freeBoard.id">
        <td>{{ freeBoard.title }}</td>
        <td>{{ freeBoard.createTime }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
#freeBoard-main {
  width: 50%;
  #freeBoard-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
  }
  table {
    width: 100%;
    font-size: 1.2rem;
    tr {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
