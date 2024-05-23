<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const noticeInfo = ref({});

const noticeSelectAll = async () => {
  const url = "http://localhost:80/homeis/notice/list?size=5";

  const { data } = await axios.get(url);
  console.log("NOTICE = ", data);
  noticeInfo.value = data;
};
const noticeGoDetail = (id) => {
  router.push({ name: "NoticeDetail", params: { id } });
};

noticeSelectAll();
</script>

<template>
  <div id="notice-main">
    <div id="notice-header">
      <h1>공지 사항</h1>
      <a href="/board/notice">더보기</a>
    </div>
    <hr />
    <table>
      <tr
        v-for="notice in noticeInfo.noticeList"
        :key="notice.id"
        @click="noticeGoDetail(notice.id)"
      >
        <td>{{ notice.title }}</td>
        <td>{{ notice.createTime }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
#notice-main {
  padding: 1vw;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 50%;
  #notice-header {
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
