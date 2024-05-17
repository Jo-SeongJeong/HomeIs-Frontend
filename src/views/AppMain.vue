<script setup>
import Footer from "@/components/Footer.vue";
import MainBackGround from "@/components/main/MainBackGround.vue";
import NoticeList from "@/components/notice/NoticeList.vue";
import FreeBoard from "@/components/freeBoard/FreeBoardList.vue";
import freeBoardSwiper from "@/components/main/freeBoardSwiper.vue";
import noticeBoardSwiper from "@/components/main/noticeBoardSwiper.vue";
</script>

<template>
  <div>
    <MainBackGround></MainBackGround>
    <div id="main-content">
      <div id="box-1">
        <FreeBoard />
        <freeBoardSwiper />
      </div>
      <div id="box-2">
        <noticeBoardSwiper />
        <NoticeList />
      </div>
    </div>
  </div>
  <Footer />
</template>
<style>
#main-content {
  padding-top: 3vw;
  width: 99vw;
  height: 100vh;
  padding-left: 15vw;
  padding-right: 15vw;
  background-color: rgb(243, 245, 249);
}
#box-1 {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2vw;
}
#box-2 {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
