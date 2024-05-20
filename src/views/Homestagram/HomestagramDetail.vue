<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import boardApi from "@/api/boardApi";
const route = useRoute();
const router = useRouter();
const id = route.params.id;
const homesta = ref({});

const getHomesta = async () => {
  const { data } = await boardApi.get("/homesta/detail/" + id);
  console.log("HOMESTA = ", data);
  homesta.value = data;
};
getHomesta();

const getImgUrl = (imgUrl) => {
  console.log(imgUrl);
  return "http://localhost/homeis/img/" + imgUrl;
};

const addLike = async () => {
  try {
    await boardApi.post("/homesta/like", {
      homestaId: id,
      userId: JSON.parse(localStorage.getItem("auth")).user.id,
    });
  } catch (error) {
    if (error.response.status === 500) {
      await boardApi.delete("/homesta/like/" + id);
    }
  }
  router.go(0);
};

const deleteHomesta = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem("auth")).user.id;
    const job = JSON.parse(localStorage.getItem("auth")).user.job;
    if (job != "관리자" && userId != homesta.value.userId) {
      alert("당신에겐 권한이 없어요~");
      return;
    }

    if (!confirm("정말 삭제하시겠어요 ?")) return;

    await boardApi.delete("/homesta/" + id);
    router.replace({ name: "HomestagramView" });
    alert("정상적으로 삭제되었습니다.");
  } catch (error) {
    if (error.response.status === 500) {
      alert("당신에겐 권한이 없어요~");
    }
  }
};

const isWriteUser = () => {
  const userId = JSON.parse(localStorage.getItem("auth")).user.id;
  const job = JSON.parse(localStorage.getItem("auth")).user.job;
  if (job == "관리자") {
    return true;
  } else if (userId == homesta.value.userId) {
    return true;
  }
  return false;
};
</script>

<template>
  <div>
    <h2>{{ homesta.title }}</h2>
    <div>좋아요 : {{ homesta.totalLike }}</div>
    <button @click="addLike()" v-if="homesta.isLike == 0">좋아용!!</button>
    <button type="button" @click="addLike()" v-else-if="homesta.isLike == 1">
      좋아용 취소!!
    </button>
    <div>조회수 : {{ homesta.view }}</div>
    <button type="button" @click="deleteHomesta()" v-if="isWriteUser()">
      삭제
    </button>
    <div class="img-div">
      <div v-for="imgInfo in homesta.image" :key="imgInfo.saveName">
        <div
          style="width: 150px; height: 200px"
          :style="{
            backgroundImage: `url(${getImgUrl(imgInfo.saveName)})`,
          }"
        ></div>
      </div>
    </div>
  </div>

  <div>해시태그 {{ homesta.content }}</div>
</template>

<style scoped>
.img-div {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
