<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const id = route.params.id;
const qna = ref({});

const getQna = async () => {
  const url = "http://localhost:80/homeis/notice/detail/" + id;
  console.log(url);
  const data = await axios.get(url);
  console.log(data);
  notice.value = data.data;
};
getNotice();
console.log("id:", id);

const router = useRouter();
const deleteNotice = async () => {
  const url = "http://localhost:80/homeis/notice/delete/";
  //await axios.delete(url, JSON.stringify());
  router.replace({ name: "Notice" });
};
</script>

<template>
  <div>
    <div>{{ notice.id }}</div>
    <button @click="deleteNotice">삭제</button>
    <div>{{ notice.createTime }}</div>
    <div>{{ notice.content }}</div>

    <hr />
  </div>
</template>

<style scoped></style>
