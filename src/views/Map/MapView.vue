<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Footer from "@/components/Footer.vue";
import KakaoMap from "@/components/kakao/KakaoMapCom.vue";
import sideBar from "@/components/map/sideBar.vue";

const sidebarFlag = ref(false);
const sidebarText = ref("<");

const searchInput = ref("");
const searchedDongCodes = ref([]);
var cache = "";
const checkInput = (event) => {
    searchInput.value = event.target.value;
    // timer(beforeInput);
    console.log(searchInput.value)
    loadData(searchInput.value);
}

const loadData = async (input) => {
  const url = `http://localhost/homeis/map/dongCodes/${input}`;
  // 매개변수 input 값에 따라 서버에서 해당 검색어와 연관된 추천검색어가 담긴 데이터가 불러와진다.
  
  if(cache === url) return;	// 이전에 부른 데이터랑 다를 때만 fetch로 데이터를 새로 불러온다.
  else {
    cache = url;
    const { data } = await axios.get(url);
    searchedDongCodes.value = data;
    console.log("동 들 = ", searchedDongCodes);
  }
}

const isEmptyResult = () => {
  if (searchedDongCodes.value == null || searchInput.value == "" || searchedDongCodes.value.length == 0) {
    return true;
  }
  return false;
}

const clickFuntion = () => {
  if (sidebarFlag.value) {
    sidebarFlag.value = false;
    sidebarText.value = "<";
  } else {
    sidebarFlag.value = true;
    sidebarText.value = ">";
  }
};
</script>

<template>
  <div id="map-main">
    <KakaoMap />
    <div class="searchBox">
    <input type="text" class="searchTxt" name="" placeholder="대한민국에 있는 모든 동을 검색해보세요." @input="checkInput">
    <div></div>
    <button class="searchBtn" type="submit">
      <i class="fa-solid fa-magnifying-glass"></i>
    </button>    
    </div>
    <container class = "rel_search" v-show="!isEmptyResult()">
          <ul class="pop_rel_keywords">
            <li class="li-bottom" v-for="dong in searchedDongCodes" :key="dong.dongCode">{{ dong.sidoName + " " + dong.gugunName + " " + dong.dongName }}</li>
          </ul>
      </container>
    <sideBar :class="{ active: sidebarFlag }" />
    <div
      id="sideBar-toggle"
      @click="clickFuntion"
      :class="{ activeButton: !sidebarFlag }"
    >{{ sidebarText }}</div>
  </div>
  <Footer />
</template>

<style scoped>
.rel_search {
  position:absolute;
  top: 150px;
  left: 750px;
  z-index: 100;
  display:flex;
  flex-direction:column;
  justify-content : space-around;
  border-radius: 12px;
}

.li-bottom {
  border-bottom: 1px solid gray;
}

.li-bottom:hover {
  background-color: rgb(88, 153, 214);
}

.pop_rel_keywords {
  list-style: none;
  margin-right: 30%;
  width: 500px;
  background-color: white;
  border-radius: 12px;
  padding: 10px
}

.pop_rel_keywords > li {	/* JS에서 동적으로 li를 생성할 때 적용될 스타일*/
  line-height : 250%
}

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

.searchBox {
  position: absolute;
  height: 50px;
  width: 500px;
  background: white;
  border-radius: 40px;
  padding: 10px;
  border: 1px solid #f9deec;
  display: flex;
  justify-content: center;
  z-index: 10;
  top: 100px;
  left: 750px
}

.searchTxt {
  border: none;
  background: none;
  outline: none;
  float: left;
  padding: 0px;
  color: #797979;
  font-size: 20px;
  line-height: 30px;
  width: 400px;
}

.searchBtn {
  color: #f9deec;
  float: right;
  width: 40px;
  height: 100%;
  border-radius: 50%;
  background: white;
  border: none;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
