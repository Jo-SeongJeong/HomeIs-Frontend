<script setup>
import axios from "axios";
import { ref, defineProps, watch } from "vue";
import LineChart from "../../components/map/chart/LineChart.vue";

const props = defineProps({
  aptCode: String,
});

const apartDealInfoList = ref({});

const getApartDealInfoList = async (aptCode) => {
  const url = `http://localhost:80/homeis/map/apartDealInfo/${aptCode}`;
  const { data } = await axios.get(url);
  apartDealInfoList.value = data;
  console.log("DEAL INFO LIST = ", apartDealInfoList);
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
      <div id="content-navbar">
        <div id="content-navbar-chose">시세</div>
        <div id="content-navbar-chose">건물정보</div>
        <div id="content-navbar-chose">주변정보</div>
      </div>
      <div id="content-view-good">
        <div id="good">
          <button type="button" class="Btn">
            <i class="fa-solid fa-thumbs-up" style="font-size: 40px"></i>
          </button>
          <div id="count">{{ getLike() }}</div>
        </div>
        <div id="view">
          <button type="button" class="Btn">
            <i class="fa-solid fa-eye" style="font-size: 40px"></i>
          </button>
          <div id="count">{{ getView() }}</div>
        </div>
      </div>
      <div id="load-view">이곳에 로드뷰 연동</div>
      <div id="trade-log">
        <div id="trade-log-header">시세 조회</div>
        <div id="trade-log-content">
          <LineChart :aptCode="aptCode" />
        </div>
      </div>
      <div id="info">
        <div id="info-title">건물 정보</div>
        <div id="info-content"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Btn {
  background-color: white;
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
  background-color: bisque;
  display: flex;
  justify-content: center;
  gap: 5vw;
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
</style>
