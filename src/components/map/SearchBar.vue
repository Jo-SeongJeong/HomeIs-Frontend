<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const searchInput = ref("");
const searchedDongCodes = ref([]);
var cache = "";
const checkInput = (event) => {
  searchInput.value = event.target.value;
  // timer(beforeInput);
  console.log(searchInput.value);
  loadData(searchInput.value);
};

const loadData = async (input) => {
  const url = `http://localhost/homeis/map/dongCodes/${input}`;
  // 매개변수 input 값에 따라 서버에서 해당 검색어와 연관된 추천검색어가 담긴 데이터가 불러와진다.

  if (cache === url)
    return; // 이전에 부른 데이터랑 다를 때만 fetch로 데이터를 새로 불러온다.
  else {
    cache = url;
    const { data } = await axios.get(url);
    searchedDongCodes.value = data;
    console.log("동 들 = ", searchedDongCodes);
  }
};

const isEmptyResult = () => {
  if (
    searchedDongCodes.value == null ||
    searchInput.value == "" ||
    searchedDongCodes.value.length == 0
  ) {
    return true;
  }
  return false;
};

const hideFlag = ref(true);
const dongCodeList = ref({});
const emit = defineEmits(["sendDongCodeList"]);
const makeMarker = async (dongCode) => {
  hideFlag.value = false;
  const url = `http://localhost/homeis/map/houseInfo/${dongCode}`;
  const { data } = await axios.get(url);
  dongCodeList.value = data;
  if (dongCodeList.value == null || dongCodeList.value.length == 0) {
    alert("최근 거래정보가 없는 동입니다.");
    return;
  }
  emit("sendDongCodeList", dongCodeList.value);

  console.log("DongCodeList = ", dongCodeList.value);
};

if (route.params.dongCode != "0") {
  makeMarker(route.params.dongCode);
}

const showContainer = () => {
  hideFlag.value = true;
};
</script>

<template>
  <div class="searchBox">
    <input
      type="text"
      class="searchTxt"
      name=""
      placeholder="대한민국에 있는 모든 동을 검색해보세요."
      @input="checkInput"
      @click="showContainer()"
    />
    <div></div>
    <button class="searchBtn" type="submit">
      <i class="fa-solid fa-magnifying-glass"></i>
    </button>
  </div>
  <container class="rel_search" v-show="!isEmptyResult()">
    <ul class="pop_rel_keywords">
      <li
        class="li-bottom"
        @click="makeMarker(dong.dongCode)"
        v-show="hideFlag"
        v-for="dong in searchedDongCodes"
        :key="dong.dongCode"
      >
        {{ dong.sidoName + " " + dong.gugunName + " " + dong.dongName }}
      </li>
    </ul>
  </container>
</template>

<style scoped>
.rel_search {
  position: absolute;
  top: 150px;
  left: 750px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
  padding: 10px;
}

.pop_rel_keywords > li {
  /* JS에서 동적으로 li를 생성할 때 적용될 스타일*/
  line-height: 250%;
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
  left: 750px;
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
