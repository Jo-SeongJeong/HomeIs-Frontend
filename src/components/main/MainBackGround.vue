<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
</script>

<template>
  <div id="main">
    <div id="back-ground">
      <div id="content">
        <div id="content-left">
          <div id="text-1">
            <h4>빅데이터 &middot; 노후도 &middot; 건물탐색</h4>
          </div>
          <div id="text-2">
            <h1>'HomeIs'</h1>
            <h1>정식 서비스 출시!</h1>
          </div>
          <div id="text-3">
            <hr id="hr-1" />
            <hr id="hr-2" />
          </div>
          <div id="text-4"><h2>영역 지정, 초기 재개발·재건축 검토</h2></div>
          <div id="text-5">
            <h3>#토지 #건물 #노후도 #과소필지 #접도율 #호수밀도</h3>
            <h3>#세대수 #영역내필지목록 #용도지역 #소유구분</h3>
            <h3>#토지대장 #건축물대장 #건축물구조</h3>
          </div>
        </div>
        <div id="content-right"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#main {
  width: 99vw;
  height: 120vh;
}
#back-ground {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)),
    url("../../assets/img/mainbg.jpg");
  background-size: cover;
  /* opacity: 0.85; */
  /* filter: brightness(50%); */
  display: flex;
  align-items: center;
  justify-content: center;
}
#content {
  width: 70%;
  height: 60%;
  /* background-color: aquamarine; */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  #content-left {
    width: 65%;
    height: 100%;
    display: flex;
    flex-direction: column;
    #text-1 {
      width: 100%;
      height: 10%;
    }
    #text-2 {
      width: 100%;
      height: 30%;
    }
    #text-3 {
      width: 100%;
      height: 10%;
      display: flex;
      #hr-1 {
        width: 20%;
        height: 5px;
        background-color: rgb(245, 245, 123);
        border: none;
      }
      #hr-2 {
        width: 60%;
        height: 5px;
        background-color: rgb(245, 245, 123);
        border: none;
      }
    }
    #text-4 {
      width: 100%;
      height: 10%;
    }
    #text-5 {
      width: 100%;
      height: 30%;
    }
  }
  #content-right {
    width: 35%;
    height: 76%;
    background-color: antiquewhite;
    background-image: url("../../assets/img/main-content-right.png");
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>
