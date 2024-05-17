<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import boardApi from "@/api/boardApi";
import axios from "axios";

const notice = ref({
  userId: "",
  title: "",
  content: "",
  id: "",
});
const route = useRoute();
notice.value.id = route.params.id;
const router = useRouter();

const getNotice = async () => {
  const url = "http://localhost:80/homeis/notice/detail/" + notice.value.id;
  console.log(url);
  const data = await axios.get(url);

  notice.value = data.data;
  console.log("DATA : ", data);
};
getNotice();

const update = async () => {
  const user = JSON.parse(localStorage.getItem("auth")).user;
  if (user == null || user.job != "관리자") {
    alert("당신에겐 권한이 없습니다.");
    router.replace("/");
    return;
  }

  notice.value.userId = user.id;
  console.log("UPDATED NOTICE", notice.value);
  if (!confirm("정말 공지사항을 수정하시겠습니까?")) return;

  await boardApi.put("/notice/update", notice.value);
  router.replace({ name: "Notice" });
  alert("정상적으로 공지사항이 수정되었습니다.");
};
</script>

<template>
  <div>
    <form @submit.prevent="update">
      <input type="text" name="title" id="" v-model="notice.title" />
      <br />
      <textarea
        name="content"
        id=""
        cols="30"
        rows="10"
        v-model="notice.content"
      ></textarea>
      <br />
      <input type="submit" value="수정" />
    </form>
  </div>
</template>

<style scoped></style>
