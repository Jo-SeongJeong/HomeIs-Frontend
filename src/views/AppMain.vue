<script setup>
import Footer from "@/components/Footer.vue";
import MainBackGround from "@/components/main/MainBackGround.vue";
import NoticeList from "@/components/notice/NoticeList.vue";
import FreeBoard from "@/components/freeBoard/FreeBoardList.vue";
</script>

<template>
  <div>
    <MainBackGround></MainBackGround>
    <div id="main-content">
      <div id="box-1">
        <FreeBoard />
      </div>
      <div id="box-2">
        <NoticeList />
      </div>
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
#box-1 {
  width: 100%;
  background-color: aquamarine;
}
#box-2 {
  width: 100%;
  background-color: beige;
}
</style>
