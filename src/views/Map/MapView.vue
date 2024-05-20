<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Footer from "@/components/Footer.vue";
import KakaoMap from "@/components/kakao/KakaoMapCom.vue";
import sideBar from "@/components/map/sideBar.vue";

const sidebarFlag = ref(true);
const clickFuntion = () => {
  if (sidebarFlag.value) {
    sidebarFlag.value = false;
  } else {
    sidebarFlag.value = true;
  }
};
</script>

<template>
  <div id="map-main">
    <KakaoMap />
    <sideBar :class="{ active: sidebarFlag }" />
    <div
      id="sideBar-toggle"
      @click="clickFuntion"
      :class="{ activeButton: !sidebarFlag }"
    ></div>
  </div>
  <Footer />
</template>

<style scoped>
#map-main {
  width: 100vw;
  height: 100vh;
  padding-top: 7vh;
}
.active {
  display: none;
}
#sideBar-toggle {
  position: absolute;
  width: 3vw;
  height: 5vw;
  background-color: bisque;
  z-index: 100;
  top: 45%;
}
.activeButton {
  left: 35vw;
}
</style>
