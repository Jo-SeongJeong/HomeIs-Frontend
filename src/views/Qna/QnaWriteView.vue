<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import boardApi from "@/api/boardApi";

const qna = ref({
  userId: "",
  title: "",
  content: "",
});
const router = useRouter();
const write = async () => {
  const user = JSON.parse(localStorage.getItem("auth")).user;

  if (user == null) {
    alert("당신에겐 권한이 없습니다.");
    router.replace("/");
    return;
  }
  qna.value.userId = user.id;
  if (!confirm("질문을 등록하시겠습니까?")) return;
  await boardApi.post("/qna/insert-question", qna.value);
  router.replace({ name: "Notice" });
  alert("정상적으로 질문이 등록되었습니다.");
};
</script>

<template>
  <div>
    <form @submit.prevent="write">
      <input type="text" name="title" id="" v-model="qna.title" />
      <br />
      <textarea
        name="content"
        id=""
        cols="30"
        rows="10"
        v-model="qna.content"
      ></textarea>
      <br />
      <input type="submit" value="등록" />
    </form>
  </div>
</template>

<style scoped></style>
