<script setup>
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
  const url = `/map/apartDealInfo/${aptCode}`;
  const { data } = await boardApi.get(url);
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
  const aptCodeTmp = getAptCode()
  getApartDealInfoList(aptCodeTmp);
  console.log("ADDLIKE 이즈라이크 = ", apartDealInfoList.value.isLike);
};

const isLike = () => {
  if (isEmptyList()) {
    return false;
  }
  const isLikeNum = parseInt(apartDealInfoList.value.isLike);
  if (isLikeNum == 1) {
    return true;
  }
  return false;
}

const reviewObj = ref({
  aptCode: "",
  content: "",
  score: "0.0"
});

const registReview = async () => {
  if (reviewObj.value.score == "0.0") {
    alert("평점을 선택해주세요!");
    return;
  }
  if (reviewObj.value.content.trim() == "") {
    alert("리뷰를 입력해주세요!");
    return;
  }

  reviewObj.value.aptCode = getAptCode();

  await boardApi.post("/map/review", reviewObj.value);
  reviewObj.value = {
  aptCode: "",
  content: "",
  score: "0.0"
};
  getApartDealInfoList(getAptCode());
}

const isSameUser = (writer) => {
  const user = JSON.parse(localStorage.getItem("auth")).user;
  if (user == null) return false;
  
  if (user.job === '관리자' || user.id == writer) return true;
  else if (user.id != writer)    return false;
  
}

const deleteReview = async (reviewId) => {
  if (!confirm("정말 리뷰를 삭제하시겠습니까?")) return;

  await boardApi.delete("/map/review/" + reviewId);
  alert("정상적으로 리뷰를 삭제하였습니다.");
  getApartDealInfoList(getAptCode());
}

watch(props, (nv) => {
  getApartDealInfoList(nv.aptCode);
  reviewObj.value = {
  aptCode: "",
  content: "",
  score: "0.0"
};
});
</script>

<template>
  <div id="side-main">
    <div id="side-content" v-show="!isEmptyList()">
      <div id="content-name">{{ getApartmentName() }}</div>
      
      <div id="content-address">주소 : {{ getAddress() }}</div>
      <div id="content-road-address">도로명주소 : {{ getRoadAddress() }}</div>
      <div id="content-address">건축년도 : {{ getBuildYear() }}</div>
      <div id="content-navbar">
        <div id="content-navbar-chose"><a href="#load-view">로드 뷰</a></div>
        <div id="content-navbar-chose"><a href="#trade-log">시세</a></div>
        <div id="content-navbar-chose"><a href="#info">거래정보</a></div>
        <div id="content-navbar-chose"><a href="#review">리뷰</a></div>
      </div>
      <div id="content-view-good">
        <div id="good">
          <button type="button" class="Btn" @click="addLike()" v-if="isLike()">
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
          <table>
            <thead>
              <th>거래년도</th>
              <th>거래월</th>
              <th>거래일</th>
              <th>면적</th>
              <th>층 수</th>
            </thead>
            <tbody>
              <tr v-for="dealInfo in apartDealInfoList.aptDealInfoList">
                <td>{{ dealInfo.dealYear }}</td>
                <td>{{ dealInfo.dealMonth }}</td>
                <td>{{ dealInfo.dealDay }}</td>
                <td>{{ parseFloat(dealInfo.area).toFixed(2) }}m<sup>2</sup></td>
                <td>{{ dealInfo.floor }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="review">
        <div id="review-title">생생 리뷰 ({{ getReviewCount() }})</div>
        <div id="review-regist">
          <select name="" id="" v-model="reviewObj.score">
            <option value="0.0">0.0</option>
            <option value="0.5">0.5</option>
            <option value="1.0">1.0</option>
            <option value="1.5">1.5</option>
            <option value="2.0">2.0</option>
            <option value="2.5">2.5</option>
            <option value="3.0">3.0</option>
            <option value="3.5">3.5</option>
            <option value="4.0">4.0</option>
            <option value="4.5">4.5</option>
            <option value="5.0">5.0</option>
          </select>
          <br>
          <textarea name="" id="" cols="30" rows="10" v-model="reviewObj.content"></textarea>
          <button @click="registReview()">등록</button>
        </div>
        <div id="review-content">
          <div v-for="reviewInfo in apartDealInfoList.reviewList">
            <div>작성자 {{ reviewInfo.userId }}</div>
            <div>리뷰 {{ reviewInfo.content }}</div>
            <div>작성시간 {{ reviewInfo.createTime }}</div>
            <div>평점 {{ reviewInfo.score }}</div>
            <button v-if="isSameUser(reviewInfo.userId)" @click="deleteReview(reviewInfo.id)">X</button>
          </div>
          
        </div>
      </div>
    </div>
    <div v-show="isEmptyList()" id="no-data-div">
      <div>
        <div><img src="/src/assets/img/search.png" alt=""></div>
        <div><h3>대한민국에 있는 모든 동을 검색해보세요!</h3></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Btn {
  background-color: white;
  border-style: none;
}

#no-data-div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
