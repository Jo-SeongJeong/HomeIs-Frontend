<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const goWrite = () => {
  const user = JSON.parse(localStorage.getItem("auth"));
  console.log("USER = ", user);
  if (user.user == null) {
    alert("권한이 없습니다!");
    return;
  }
  router.push({
    path: "/board/homestagram/write",
  });
};

const homestaInfo = ref({});
const homestaHotInfo = ref({});
const getHomestaList = async () => {
  const { data } = await axios.get("http://localhost:80/homeis/homesta/list", {
    params: { category: "id" },
  });
  homestaInfo.value = data;
};

const getHotHomestaList = async () => {
  const { data } = await axios.get("http://localhost:80/homeis/homesta/list", {
    params: { category: "hot" },
  });
  homestaHotInfo.value = data;
};
getHomestaList();
getHotHomestaList();
const getImgUrl = (homesta) => {
  if (homesta.image.length > 0) {
    return "http://localhost/homeis/img/" + homesta.image[0].saveName;
  }
  return "";
};

const getContent = (homesta) => {
  if (homesta.content == null || homesta.content.indexOf("#")) {
    return "";
  }
  return homesta.content;
};

const goDetail = (id) => {
  router.push({ name: "HomestagramDetail", params: { id } });
};
</script>

<template>
  <div>
    <a @click="goWrite" style="color: red">+ 글쓰기</a>
  </div>

  <h2>최근 올라온 게시물은 어떤가요?</h2>
  <h3>- 끊임없이 올라오는 게시물들을 확인해보세요!</h3>
  <div id="homesta-image-list">
    <div v-for="homesta in homestaInfo.homestaList" :key="homesta.id">
      <div>좋아요 : {{ homesta.totalLike }}</div>
      <div
        style="
          width: 150px;
          height: 200px;
          object-fit: fill;
          text-overflow: ellipsis;
        "
        :style="{
          backgroundImage: `url(${getImgUrl(homesta)})`,
        }"
        @click="goDetail(homesta.id)"
      >
        <div>{{ homesta.userId }}</div>
        <div>{{ getContent(homesta) }}</div>
      </div>
    </div>
  </div>

  <h2>최근 핫한 게시물을 보십시요!</h2>
  <h3>- HOT!!한 집의 구조를 알아보세요</h3>
  <div id="homesta-image-list">
    <div v-for="homesta in homestaHotInfo.homestaList" :key="homesta.id">
      <div>좋아요 : {{ homesta.totalLike }}</div>
      <div
        style="
          width: 150px;
          height: 200px;
          object-fit: fill;
          text-overflow: ellipsis;
        "
        :style="{
          backgroundImage: `url(${getImgUrl(homesta)})`,
        }"
        @click="goDetail(homesta.id)"
      >
        <div>{{ homesta.userId }}</div>
        <div>{{ getContent(homesta) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#homesta-image-list {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
