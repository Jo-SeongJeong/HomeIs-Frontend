<script setup>
import Footer from "@/components/Footer.vue";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import boardApi from "@/api/boardApi";

const authStore = useAuthStore();
const InterestAreaList = ref({});

const getInterestAreaList = async () => {
  const { data } = await boardApi.get("/user/interest-area/admin");
  console.log("관심지역 = ", data);
};
getInterestAreaList();
</script>

<template>
  <div id="interest-main">
    <div id="interest-main-content"></div>
    <div class="interest-intro">관심지역은 최대 5개까지만 가능합니다.</div>
    <div>관심지역</div>
    <button class="add-btn"><i class="fa-solid fa-plus"></i></button>
  </div>
  <Footer />
</template>

<style scoped>
#interest-main {
  width: 100vw;
  height: 100vh;
  padding-top: 7vh;
  padding-left: 10vw;
  padding-left: 10vw;
  padding-bottom: 5vh;
}

.add-btn {
  font-size: 80px;
  border-radius: 50%;
  width: 100px;
  color: white;
  background-color: black;
}

.interest-intro {
  width: 100px;
  height: 100px;
  border: 1px solid black;

  text-align: center;
}
</style>
