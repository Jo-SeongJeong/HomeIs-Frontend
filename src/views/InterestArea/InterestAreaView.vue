<script setup>
import Footer from "@/components/Footer.vue";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import boardApi from "@/api/boardApi";

const authStore = useAuthStore();
const InterestAreaList = ref({});

const getInterestAreaList = async () => {
  const { data } = await boardApi.get("/user/interest-area/admin");
  console.log("관심지역 = ", data);
};
getInterestAreaList();

const isEmptyAreaList = () => {
  if (InterestAreaList.value == null || InterestAreaList.value.length == 0)
    return true;
  return false;
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
        <div id="interest-list-swiper" v-show="!isEmptyAreaList()">
          스와이퍼
        </div>
      </div>
      <div id="interest-deal"></div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
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
    #interest-list-swiper {
      width: 90%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

#interest-deal {
  width: 100%;
  height: 75%;
  background-color: aqua;
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
