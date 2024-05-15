<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const noticeList = ref([]);
const qnaList = ref([]);

const noticeSelectAll = async () => {
  const url = "http://localhost:80/homeis/notice/";

  const { data } = await axios.get(url);

  noticeList.value = data;
};

noticeSelectAll();

const noticeGoDetail = (id) => {
  router.push({ name: "NoticeDetail", params: { id } });
};

const qnaSelectAll = async () => {
  const url = "http://localhost:80/homeis/qna/list";

  const { data } = await axios.get(url);

  qnaList.value = data;
};

qnaSelectAll();

const qnaGoDetail = (id) => {
  router.push({ name: "QnaDetail", params: { id } });
};
</script>

<template>
  <img src="../../assets/img/center.jpg" alt="center" width="100%" height="500px">
  <h1>공지사항</h1>
  <router-link to="" v-if="id === 'job'">글쓰기</router-link> 
  <table>
      <tr
        v-for="notice in noticeList"
        :key="notice.id"
        @click="noticeGoDetail(notice.id)"
      >
        <td>{{ notice.title }}</td>
        <td>{{ notice.createTime }}</td>
      </tr>
    </table>

    <h1>문의사항</h1>
    <router-link to="/board/qna/write">글쓰기</router-link> 
    <table>
      <tr
        v-for="qna in qnaList"
        :key="qna.id"
        @click="qnaGoDetail(qna.id)"
      >
        <td>{{ qna.title }}</td>
        <td>{{ qna.createTime }}</td>
      </tr>
    </table>
</template>

<style scoped>

</style>