<script setup>
import { ref, defineProps } from "vue";
import Footer from "@/components/Footer.vue";
import KakaoMap from "@/components/kakao/KakaoMapCom.vue";
import sideBar from "@/components/map/sideBar.vue";

const sidebarFlag = ref(false);
const sidebarText = ref("<");

const clickFuntion = () => {
  if (sidebarFlag.value) {
    sidebarFlag.value = false;
    sidebarText.value = "<";
  } else {
    sidebarFlag.value = true;
    sidebarText.value = ">";
  }
};

const aptCodeProp = ref("");
const aptCodeHandler = (aptCode) => {
  aptCodeProp.value = aptCode;
  sidebarFlag.value = false;
  sidebarText.value = "<";
};
</script>

<template>
  <div id="map-main">
    <KakaoMap dongCodeList="dongCodeProp" @send-apt-code="aptCodeHandler" />
    <sideBar :class="{ active: sidebarFlag }" :aptCode="aptCodeProp" />
    <div
      id="sideBar-toggle"
      @click="clickFuntion"
      :class="{ activeButton: !sidebarFlag }"
    >
      {{ sidebarText }}
    </div>
  </div>
</template>

<style scoped>
#map-main {
  width: 100vw;
  height: 100vh;
  padding-top: 7vh;
  position: relative;
}
.active {
  display: none;
}
#sideBar-toggle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  color: gray;
  position: absolute;
  width: 2.5vw;
  height: 5vw;
  background-color: whitesmoke;
  z-index: 100;
  top: 45%;
}
.activeButton {
  left: 35vw;
}
</style>
