<script setup>
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div id="loan-main">
    <div id="loan-main-body">
      <div id="loan-main-banner">
        <div id="loan-banner-box"></div>
        <div id="loan-banner-box"></div>
        <div id="loan-banner-box"></div>
      </div>
      <div id="loan-list-body">
        <div id="loan-sort"></div>
        <div id="loan-list-content"></div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
#loan-main {
  width: 99vw;
  height: 200vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3vw 25vh 5vw 25vh;
}
#loan-main-body {
  width: 100%;
  height: 100%;
  padding-left: 5vw;
  padding-right: 5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  #loan-main-banner {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5vw;
    background-color: aqua;
    #loan-banner-box {
      width: 25%;
      height: 80%;
      background-color: antiquewhite;
    }
  }
}

#loan-list-body {
  width: 100%;
  height: 70%;
  background-color: beige;
  #loan-sort {
    background-color: blanchedalmond;
    width: 100%;
    height: 10%;
  }
  #loan-list-content {
    background-color: blueviolet;
    width: 100%;
    height: 90%;
  }
}
</style>
