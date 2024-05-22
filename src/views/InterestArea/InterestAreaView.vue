<script setup>
import Footer from "@/components/Footer.vue";
import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import boardApi from "@/api/boardApi";

const authStore = useAuthStore();
const InterestAreaList = ref({});
const houseInfoList = ref({});
const dealInfoList = ref({});

const getInterestAreaList = async () => {
  const { data } = await boardApi.get("/user/interest-area/admin");
  InterestAreaList.value = data;
};
getInterestAreaList();

const isEmptyAreaList = () => {
  if (InterestAreaList.value == null || InterestAreaList.value.length == 0)
    return true;
  return false;
};

const getDealInfoList = async (aptCode) => {
  const { data } = await boardApi.get("/map/apartDealInfo/" + aptCode);
  dealInfoList.value = data;
};

const isEmptyHouseInfoList = () => {
  console.log(houseInfoList.value);
  if (houseInfoList.value == null || houseInfoList.value.length == 0) {
    return true;
  }
  return false;
};
const getHouseInfoList = async (dongCode) => {
  const { data } = await axios.get(
    "http://localhost:80/homeis/map/houseInfo/" + dongCode
  );
  houseInfoList.value = data;
};

const getFourHouseInfoList = () => {
  if (isEmptyHouseInfoList()) return [];
  const fourHouseInfoList = [];
  for (let i = 0; i < houseInfoList.value.length; i++) {
    if (i == 4) break;
    fourHouseInfoList.push(houseInfoList.value[i]);
  }
  return fourHouseInfoList;
};
</script>

<template>
  <div id="interest-main">
    <div id="interest-main-content">
      <div id="interest-main-title">
        <i class="fa-solid fa-house" style="color: #ff0000"></i>&nbsp;관심지역
      </div>
      <div id="interest-main-smallTitle">
        ※ 관심지역은 최대 4개까지 가능합니다
      </div>
      <div id="interest-list">
        <div id="addButton"><i class="fa-solid fa-plus"></i></div>
        <div id="interest-empty-list" v-show="isEmptyAreaList()">
          <div id="interest-empty-msg">
            좌측 &nbsp;<i class="fa-solid fa-plus"></i>&nbsp; 버튼으로
            관심지역을 추가해보세요!
          </div>
        </div>
        <div id="interest-list-block" v-show="!isEmptyAreaList()">
          <div
            v-for="areaInfo in InterestAreaList"
            id="dong-block"
            @click="getHouseInfoList(areaInfo.dongCode)"
          >
            {{ areaInfo.dongName }}
          </div>
        </div>
      </div>
      <div id="interest-deal">
        <div
          id="house-info-box"
          v-for="houseInfo in getFourHouseInfoList()"
          v-show="!isEmptyHouseInfoList()"
        >
          <div id="house-img">left</div>
          <div id="house-info">right</div>
        </div>
        <div v-show="isEmptyHouseInfoList()">정보 없음!!!</div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
#house-info-box {
  display: flex;
  height: 22%;
  background-color: red;
  margin-bottom: 3vh;
  border-radius: 10px;

  #house-img {
    width: 30%;
    margin: 3%;
    background-image: url("/src/assets/img/sample_apart.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  #house-info {
    width: 70%;
    margin: 3%;
    background-color: green;
  }
}
#interest-main {
  width: 99vw;
  height: 150vh;
  padding-top: 15vh;
  padding-left: 20vw;
  padding-right: 20vw;
  padding-bottom: 10vh;
}
#interest-main-content {
  width: 100%;
  height: 100%;
  #interest-main-title {
    width: 100%;
    height: 7%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.3rem;
  }
  #interest-main-smallTitle {
    height: 3%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: #dee2ef;
  }
  #interest-list {
    display: flex;
    width: 100%;
    height: 10%;
    #addButton {
      width: 10%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 4rem;
        border: 5px solid black;
        border-radius: 50%;
      }
    }
    #addButton:hover {
      i {
        background-color: black;
        color: white;
      }
    }
    #interest-empty-list {
      width: 90%;
      height: 100%;
      font-size: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 3vh;
      padding-bottom: 3vh;
      padding-left: 2vw;
      i {
        border: 3px solid black;
        border-radius: 50%;
      }
      #interest-empty-msg {
        height: 100%;
        width: 100%;
        background-color: #dee2ef;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
      }
    }
    #interest-list-block {
      width: 90%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      #dong-block {
        width: 10vw;
        height: 6vh;
        margin: 0px 0px 0px 40px;
        border: 1px solid white;
        font-weight: 800;
        font-size: 1.4rem;
        border-radius: 10px;
        background-color: #d9d9d9;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      #dong-block:hover {
        background-color: black;
        color: white;
      }
    }
  }
}

#interest-deal {
  width: 100%;
  height: 85%;
  background-color: aqua;
  padding-top: 4vh;
  padding-left: 5vw;
  padding-right: 5vw;
  padding-bottom: 4vw;
}

#interest-intro-main {
  border: 1px solid black;
}

.interest-intro {
  width: 800px;
  height: 100px;
  border: 1px solid black;
  font-size: 30px;
  text-align: center;
}
</style>
