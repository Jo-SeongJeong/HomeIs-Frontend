<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const notice = ref({
  title: "",
  content: "",
});
const router = useRouter();
const write = async () => {
  const url = "http://localhost:80/homeis/notice/regist";

  console.log("notice = ", JSON.stringify(notice.value));
  //await axios.post(url, JSON.stringify(notice.value));
  router.replace({ name: "Notice" });
};
</script>

<template>
  <div>
    <form @submit.prevent="write">
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
      <input type="submit" value="등록" />
    </form>
  </div>
</template>

<style scoped></style>
