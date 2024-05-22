<script setup>
import axios from "axios";
import { ref, defineProps, watch } from "vue";
import LineChart from "../../components/map/chart/LineChart.vue";
import KakaoMapRoadView from "@/components/kakao/KaKaoMapRoadView.vue";
import boardApi from "@/api/boardApi";

const props = defineProps({
  aptCode: String,
});

const apartDealInfoList = ref({});
const position = ref({
  lng: "",
  lat: ""
});

const getApartDealInfoList = async (aptCode) => {
  const url = `http://localhost:80/homeis/map/apartDealInfo/${aptCode}`;
  const { data } = await axios.get(url);
  apartDealInfoList.value = data;
  
  if (isEmptyList()) return;
  position.value.lng = apartDealInfoList.value.aptDealInfoList[0].lng;
  position.value.lat = apartDealInfoList.value.aptDealInfoList[0].lat;
};

const isEmptyList = () => {
  if (
    apartDealInfoList.value.aptDealInfoList == null ||
    apartDealInfoList.value.aptDealInfoList.length == 0
  ) {
    return true;
  }
  return false;
};

const getAptCode = () => {
  if (isEmptyList()) {
    return "NULL TEXT!!";
  }
  return apartDealInfoList.value.aptDealInfoList[0].aptCode;
};

const getApartmentName = () => {
  if (isEmptyList()) {
    return "NULL TEXT!!";
  }
  return apartDealInfoList.value.aptDealInfoList[0].apartmentName;
};

const getAddress = () => {
  if (isEmptyList()) {
    return "NULL TEXT!!";
  }
  const dongStr = apartDealInfoList.value.aptDealInfoList[0].dong;
  const jibunStr = apartDealInfoList.value.aptDealInfoList[0].jibun;
  return dongStr + " " + jibunStr;
};

const getBuildYear = () => {
  if (isEmptyList()) {
    return "NULL TEXT!!";
  }
  const buildYearStr = apartDealInfoList.value.aptDealInfoList[0].buildYear;
  return buildYearStr;
};

const getRoadAddress = () => {
  if (isEmptyList()) {
    return "NULL TEXT!!";
  }
  const roadNameStr = apartDealInfoList.value.aptDealInfoList[0].roadName;
  return roadNameStr;
};

const getLike = () => {
  if (isEmptyList()) {
    return "NULL TEXT!!";
  }
  const likeStr = apartDealInfoList.value.aptDealInfoList[0].totalLike;
  return likeStr;
};

const getView = () => {
  if (isEmptyList()) {
    return "NULL TEXT!!";
  }
  const viewStr = apartDealInfoList.value.aptDealInfoList[0].view;
  return viewStr;
};

const getArea = () => {
  if (isEmptyList()) {
    return "NULL TEXT!!";
  }
  const areaStr = apartDealInfoList.value.aptDealInfoList[0].area;
  return areaStr;
};

const getReviewCount = () => {
  if (isEmptyList() || apartDealInfoList.value.reviewList == null || apartDealInfoList.value.reviewList.length == 0) {
    return 0;
  }
  return apartDealInfoList.value.reviewList.length;
};

const addLike = async () => {
  try {
    const te = await boardApi.post("/map/like", {
      aptCode: getAptCode(),
      userId: JSON.parse(localStorage.getItem("auth")).user.id,
    });
    console.log("LI = ", te);
  } catch (error) {
    console.log("ERROR = ", error);
    if (error.response.status === 500) {
      await boardApi.delete("/map/like/" + getAptCode());
    }
  }
  getApartDealInfoList(getAptCode());
};

const isLike = async () => {
  if (isEmptyList()) {
    return false;
  }
  console.log("ISLIKE = ", apartDealInfoList.value.isLike);
  const isLikeNum = apartDealInfoList.value.isLike;
  if (isLikeNum == 1) {
    return true;
  }
  return false;
}

watch(props, (nv) => {
  getApartDealInfoList(nv.aptCode);
});
</script>

<template>
  <div id="side-main">
    <div id="side-content">
      <div id="content-name">{{ getApartmentName() }}</div>
      
      <div id="content-address">주소 : {{ getAddress() }}</div>
      <div id="content-road-address">도로명주소 : {{ getRoadAddress() }}</div>
      <div id="content-address">건축년도 : {{ getBuildYear() }}</div>
      <div id="content-navbar">
        <div id="content-navbar-chose">시세</div>
        <div id="content-navbar-chose">거래정보</div>
        <div id="content-navbar-chose">주변정보</div>
        <div id="content-navbar-chose">리뷰</div>
      </div>
      <div id="content-view-good">
        <div id="good">
          <button type="button" class="Btn" @click="addLike()" v-if="!isLike()">
            <i class="fa-solid fa-heart" style="color: #ff0000;font-size: 50px;"></i>
          </button>
          <button type="button" class="Btn" @click="addLike()" v-else>
            <i class="fa-regular fa-heart" style="color: #ff1100;font-size: 50px;"></i>
          </button>
          <div id="count">{{ getLike() }}</div>
        </div>
        <div id="view">
          <button type="button" class="Btn">
            <div style="font-size: 40px">&#128064</div>
          </button>
          <div id="count">{{ getView() }}</div>
        </div>
      </div>
      <div id="load-view">
        <div id="road-view-header">로드 뷰</div>
        <KakaoMapRoadView :position="position"/>
      </div>
      <div id="trade-log">
        <div id="trade-log-header">시세 조회</div>
        <div id="trade-log-content">
          <LineChart :aptCode="aptCode" />
        </div>
      </div>
      <div id="info">
        <div id="info-title">거래 정보</div>
        <div id="info-content">
          <div></div>
          <div>면적 : {{ getArea() }}</div>
        </div>
      </div>
      <div id="review">
        <div id="review-title">생생 리뷰 ({{ getReviewCount() }})</div>
        <div id="review-content">
          <div></div>
          <div>면적 : {{ getArea() }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Btn {
  background-color: white;
  border-style: none;
}
#side-main {
  position: absolute;
  width: 35vw;
  height: 93vh;
  left: 0;
  top: 7vh;
  z-index: 100;
  background-color: white;
  overflow: scroll;
  #side-content {
    width: 100%;
    height: 200vh;
  }
}

#content-name {
  width: 100%;
  font-size: 2rem;
  padding: 3vh;
  background-color: aqua;
}
#content-address {
  width: 100%;
  padding-left: 3vh;
  padding-right: 3vh;
  font-size: 1.2rem;
  margin-bottom: 1vh;
}

#content-road-address {
  width: 100%;
  padding-left: 3vh;
  padding-right: 3vh;
  font-size: 1.2rem;
  margin-bottom: 1vh;
}
#content-navbar {
  width: 100%;
  padding: 3vh;
  background-color: aqua;
  border-bottom: 1px solid black;
  border-top: 1px solid black;
  display: flex;
  justify-content: space-around;
}
#content-view-good {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 5vw;
  padding-top: 30px;
}
#good {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#view {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#good-image {
  width: 4.5vw;
  height: 10vh;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("../../assets/img/good.png");
}
#view-image {
  width: 4.5vw;
  height: 10vh;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("../../assets/img/views.png");
}
#count {
  background-color: aqua;
}
#load-view {
  width: 100%;
  height: 50vh;
  padding: 3vh;
  /* background-color: aqua; */
  border-bottom: 1px solid black;
}
#road-view-header {
  padding: 0.5vh;
    font-size: 1.5rem;
}
#trade-log {
  width: 100%;
  height: 50vh;
  #trade-log-header {
    padding: 2vh;
    font-size: 1.5rem;
  }
  #trade-log-content {
    width: 100%;
    height: 100vh;
  }
}
#info {
  width: 100%;
  height: 50vh;
  #info-title {
    padding: 2vh;
    font-size: 1.5rem;
  }
  #info-content {
    width: 100%;
    height: 100%;
  }
}
#review {
  width: 100%;
  height: 50vh;
  #review-title {
    padding: 2vh;
    font-size: 1.5rem;
  }
  #review-content {
    width: 100%;
    height: 100%;
  }
}
</style>
