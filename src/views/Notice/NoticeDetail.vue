<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import boardApi from "@/api/boardApi";
const route = useRoute();
const id = route.params.id;
const notice = ref({});
const user = ref({});
user.value = JSON.parse(localStorage.getItem("auth"));

const isAdmin = () => {
  if (user.value.user != null) {
    return user.value.user.job == "관리자";
  }
  return "";
};

const getNotice = async () => {
  const url = "http://localhost:80/homeis/notice/detail/" + id;
  console.log(url);
  const data = await axios.get(url);

  notice.value = data.data;
};
getNotice();
console.log("id:", id);

const router = useRouter();
const deleteNotice = async () => {
  if (!confirm("정말 삭제하시겠습니까?")) return;

  await boardApi.put("/notice/delete", notice.value);
  router.replace({ name: "Notice" });
  alert("해당 공지사항 삭제를 완료하였습니다!");
};

const updateNotice = () => {
  router.push({ name: "NoticeUpdate" });
};
</script>

<template>
  <div>
    <div>{{ notice.id }}</div>
    <button v-if="isAdmin()" @click="deleteNotice">삭제</button>
    <button v-if="isAdmin()" @click="updateNotice">수정</button>
    <div>{{ notice.createTime }}</div>
    <div>{{ notice.content }}</div>

    <hr />
  </div>
</template>

<style scoped></style>
