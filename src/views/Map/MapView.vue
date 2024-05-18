<script setup>
import Footer from "@/components/Footer.vue";
import KakaoMap from "@/components/kakao/KakaoMapCom.vue";
</script>

<template>
  <div id="map-main">
    <KakaoMap />
    <div></div>
  </div>
  <Footer />
</template>

<style scoped>
#map-main{
  width: 100vw;
  height: 100vh;
}
</style>
