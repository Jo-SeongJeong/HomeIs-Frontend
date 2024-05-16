<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import MainBackGround from "@/components/main/MainBackGround.vue";
</script>

<template>
  <div>
    <MainBackGround></MainBackGround>
    <div id="main-content">
      <div id="box"></div>
    </div>
  </div>
  <Footer />
</template>
<style>
body {
  margin: 0;
}
#main-content {
  width: 99vw;
  height: 100vh;
  background-color: aqua;
  padding-left: 15vw;
  padding-right: 15vw;
}
#box {
  width: 100%;
  height: 100%;
  background-color: aquamarine;
}
</style>
