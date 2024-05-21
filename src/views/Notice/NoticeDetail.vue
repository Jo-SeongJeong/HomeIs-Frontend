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
  <div class="notice-detail">
    <div class="notice-header">
        <h3>제목 : {{ notice.title }}</h3>
        <p>작성일 : {{ notice.createTime }}</p>
        <hr class="line">
    </div>

    <div class="notice-actions">
      <button v-if="isAdmin()" @click="updateNotice" class="btn-update">수정</button>
      <button v-if="isAdmin()" @click="deleteNotice" class="btn-delete">삭제</button>
    </div>

    <div class="notice-content">
      {{ notice.content }}
    </div>

    <hr class="line"/>
  </div>
</template>

<style scoped>
.notice-detail {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.notice-header {
  margin-bottom: 20px;
}

.notice-header h3 {
  margin: 10px 0;
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.notice-header p {
  font-size: 14px;
  color: #666;
}

.notice-actions {
  margin: 10px 0;
    display: flex;
  justify-content: end;
}

.notice-actions button {
  padding: 10px 15px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 10px;
}

.notice-actions .btn-delete {
  background-color: #e74c3c;
  color: #fff;
}

.notice-actions .btn-update {
  background-color: #3498db;
  color: #fff;
}

.notice-content {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #333;
  font-size: 20px;
  line-height: 1.6;
}

.line {
  margin-top: 30px;
  border: 1px solid gainsboro;
}
</style>
