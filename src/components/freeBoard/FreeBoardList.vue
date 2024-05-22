<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const freeBoardInfo = ref({});

const freeBoardSelectAll = async () => {
  const url = "http://localhost:80/homeis/board/list?size=5";

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
      <a href="/board/free-board/0">더보기</a>
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
  background-color: white;
  padding: 1vw;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
      margin: 1vw;
      display: flex;
      justify-content: space-between;
    }
  }
  hr {
    margin-top: 1vh;
    height: 1px;
    background: #8f1414;
    background-image: -webkit-linear-gradient(left, #eee, #777, #eee);
    background-image: -moz-linear-gradient(left, #eee, #777, #eee);
    background-image: -ms-linear-gradient(left, #eee, #777, #eee);
    background-image: -o-linear-gradient(left, #eee, #777, #eee);
  }
  a {
    text-decoration-line: none;
    color: black;
  }
}
</style>
