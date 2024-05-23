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
  lat: "",
});

const totalPages = ref(0);
const currentPage = ref(0); //0부터 시작해야함 1~10 x | 0~9 o
const SECTION_MAX_RANGE = ref(10); //섹션 최대 범위
const SECTION_MAX_NUM = ref(0);
const SECTION_START_NUM = ref(0); //섹션 시작 숫자

const getApartDealInfoList = async (aptCode) => {
  console.log(currentPage.value);
  const url = `/map/apartDealInfo/${aptCode}`;
  const { data } = await boardApi.get(url, {
    params: {
      page: currentPage.value + 1,
    },
  });
  apartDealInfoList.value = data;

  const startPage = parseInt(currentPage.value / SECTION_MAX_RANGE.value) + 1;
  SECTION_START_NUM.value = (startPage - 1) * SECTION_MAX_RANGE.value;
  totalPages.value = apartDealInfoList.value.totalPages;
  console.log(typeof SECTION_START_NUM.value);
  console.log(typeof totalPages);
  if (SECTION_START_NUM.value + 9 <= totalPages.value) {
    SECTION_MAX_NUM.value = startPage + 9;
  } else {
    SECTION_MAX_NUM.value = totalPages.value % SECTION_MAX_RANGE.value;
  }

  if (isEmptyList()) return;
  position.value.lng = apartDealInfoList.value.aptDealInfoList[0].lng;
  position.value.lat = apartDealInfoList.value.aptDealInfoList[0].lat;
};

const prevPage = () => {
  if (currentPage.value == 0) return;
  currentPage.value -= 1;
  getApartDealInfoList(props.aptCode);
};
const nextPage = () => {
  if (currentPage.value == totalPages.value - 1) return;
  currentPage.value += 1;
  getApartDealInfoList(props.aptCode);
};
const movePage = (page) => {
  currentPage.value = page;
  getApartDealInfoList(props.aptCode);
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
  const viewStr = apartDealInfoList.value.aptDealInfoList[0].totalView;
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
  if (
    isEmptyList() ||
    apartDealInfoList.value.reviewList == null ||
    apartDealInfoList.value.reviewList.length == 0
  ) {
    return 0;
  }
  return apartDealInfoList.value.reviewList.length;
};

const isLoading = ref(false);
const addLike = async () => {
  if (isLoading.value) return;

  isLoading.value = true;
  const te = await boardApi.post("/map/like", {
    aptCode: getAptCode(),
    userId: JSON.parse(localStorage.getItem("auth")).user.id,
  });
  console.log("LI = ", te);

  const aptCodeTmp = getAptCode();
  getApartDealInfoList(aptCodeTmp);
  console.log("ADDLIKE 이즈라이크 = ", apartDealInfoList.value.isLike);
  isLoading.value = false;
};

const deleteLike = async () => {
  if (isLoading.value) return;

  isLoading.value = true;
  const te = await boardApi.delete("/map/like/" + getAptCode());
  console.log("LI = ", te);

  const aptCodeTmp = getAptCode();
  getApartDealInfoList(aptCodeTmp);
  console.log("ADDLIKE 이즈라이크 = ", apartDealInfoList.value.isLike);
  isLoading.value = false;
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
};

const reviewObj = ref({
  aptCode: "",
  content: "",
  score: "0.0",
});

const registReview = async () => {
  if (reviewObj.value.score == "") {
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
    score: "0.0",
  };
  getApartDealInfoList(getAptCode());
};

const isSameUser = (writer) => {
  const user = JSON.parse(localStorage.getItem("auth")).user;
  if (user == null) return false;

  if (user.id == writer) return true;
  else if (user.id != writer) return false;
};

const deleteReview = async (reviewId) => {
  if (!confirm("정말 리뷰를 삭제하시겠습니까?")) return;

  await boardApi.delete("/map/review/" + reviewId);
  alert("정상적으로 리뷰를 삭제하였습니다.");
  getApartDealInfoList(getAptCode());
};

watch(
  () => props.aptCode,
  (aptCode) => {
    console.log("ERERERERER = ", aptCode);
    if (aptCode) {
      console.log("props.aptCode 변경", aptCode);
      getApartDealInfoList(aptCode);
      reviewObj.value = {
        aptCode: "",
        content: "",
        score: "0.0",
      };
    }
  },
  { immediate: true }
);

const isReviewEmpty = () => {
  if (
    apartDealInfoList.value.reviewList == null ||
    apartDealInfoList.value.reviewList.length === 0
  ) {
    return true;
  }
  return false;
};
</script>

<template>
  <div id="side-main">
    <div id="side-content" v-show="!isEmptyList()">
      <div id="content-name"><h3><i class="fa-solid fa-building" style="color: #0d0c0c;"></i> {{ getApartmentName() }}</h3></div>

      <div id="content-address"><h4><i class="fa-solid fa-location-dot"></i> {{ getAddress() }}</h4></div>
      <div id="content-road-address"><h4><i class="fa-solid fa-road"></i> {{ getRoadAddress() }}</h4></div>
      <div id="content-address"><h4><i class="fa-solid fa-person-digging"></i> {{ getBuildYear() }}</h4></div>
      <div id="content-navbar">
        <div id="content-navbar-chose"><a href="#load-view">로드 뷰</a></div>
        <div id="content-navbar-chose"><a href="#trade-log">시세</a></div>
        <div id="content-navbar-chose"><a href="#price-main">거래정보</a></div>
        <div id="content-navbar-chose"><a href="#review">리뷰</a></div>
      </div>
      <div id="content-view-good">
        <div id="good">
          <div @click="deleteLike()" v-if="isLike()">
            <i
              class="fa-solid fa-heart"
              style="color: #ff0000; font-size: 50px"
            ></i>
          </div>
          <div @click="addLike()" v-else>
            <i
              class="fa-regular fa-heart"
              style="color: #ff1100; font-size: 50px"
            ></i>
          </div>
          <div id="count">{{ getLike() }}</div>
        </div>
        <div id="view">
          <div style="font-size: 40px">&#128064;</div>
          <div id="count">{{ getView() }}</div>
        </div>
      </div>
      <div id="load-view">
        <div id="road-view-header"><h3><i class="fa-solid fa-street-view" style="color: #000000;"></i> 로드 뷰</h3></div>
        <KakaoMapRoadView :position="position" />
      </div>
      <div id="trade-log">
        <div id="trade-log-header"><h3><i class="fa-solid fa-chart-simple" style="color: #000000;"></i> 시세 조회</h3></div>
        <div id="trade-log-content">
          <LineChart :aptCode="aptCode" />
        </div>
      </div>
      <div id="price-main">
        <div id="price-title"><h3><i class="fa-solid fa-coins" style="color: #000000;"></i> 거래 정보</h3></div>
        <table class="price">
          <thead>
            <tr>
              <th>거래년도</th>
              <th>거래월</th>
              <th>거래일</th>
              <th>면적</th>
              <th>층 수</th>
            </tr>
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
        <div class="page-div">
          <div @click="prevPage()"><i class="fa-solid fa-chevron-right fa-rotate-180" style="color: #000000;"></i> 이전</div>
          <div
            id="section-page-div"
            v-for="i in SECTION_MAX_NUM"
            :key="i"
            @click="movePage(SECTION_START_NUM + i - 1)"
            :class="{ pickPage: currentPage == SECTION_START_NUM + i - 1 }"
          >
            {{ SECTION_START_NUM + i }}
          </div>
          <div @click="nextPage()">다음 <i class="fa-solid fa-chevron-right" style="color: #000000;"></i></div>
        </div>
      </div>
      <div id="review">
        <h3 id="review-title"><i class="fa-solid fa-book" style="color: #000000;"></i> 생생 리뷰 ({{ getReviewCount() }})</h3>
        <div class="no-answer" v-if="isReviewEmpty()">
          <h4>가장 먼저 댓글을 달아보세요!</h4>
        </div>
        <div id="review-content" v-else>
          <div
            v-for="reviewInfo in apartDealInfoList.reviewList"
            id="comment-row"
          >
            <div class="review-text">
              <h4>{{ reviewInfo.userId }}</h4>
              <div class="review-info">
                <h4 class="review-date" v-if="reviewInfo.score == 0.0"><i class="fa-regular fa-star" style="color: #FFD43B;"></i><i class="fa-regular fa-star" style="color: #FFD43B;"></i><i class="fa-regular fa-star" style="color: #FFD43B;"></i><i class="fa-regular fa-star" style="color: #FFD43B;"></i><i class="fa-regular fa-star" style="color: #FFD43B;"></i></h4>
                <h4 class="review-date" v-else-if="reviewInfo.score == 0.5"><i class="fa-solid fa-star-half-stroke" style="color: #FFD43B;"></i><i class="fa-regular fa-star" style="color: #FFD43B;"></i><i class="fa-regular fa-star" style="color: #FFD43B;"></i><i class="fa-regular fa-star" style="color: #FFD43B;"></i><i class="fa-regular fa-star" style="color: #FFD43B;"></i></h4>
                <h4 class="review-date" v-else-if="reviewInfo.score == 1.0"><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-regular fa-star" style="color: #FFD43B;"></i><i class="fa-regular fa-star" style="color: #FFD43B;"></i><i class="fa-regular fa-star" style="color: #FFD43B;"></i><i class="fa-regular fa-star" style="color: #FFD43B;"></i></h4>
                <h4 class="review-date" v-else-if="reviewInfo.score == 1.5"><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-solid fa-star-half-stroke" style="color: #FFD43B;"></i><i class="fa-regular fa-star" style="color: #FFD43B;"></i><i class="fa-regular fa-star" style="color: #FFD43B;"></i><i class="fa-regular fa-star" style="color: #FFD43B;"></i></h4>
                <h4 class="review-date" v-else-if="reviewInfo.score == 2.0"><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-regular fa-star" style="color: #FFD43B;"></i><i class="fa-regular fa-star" style="color: #FFD43B;"></i><i class="fa-regular fa-star" style="color: #FFD43B;"></i></h4>
                <h4 class="review-date" v-else-if="reviewInfo.score == 2.5"><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-solid fa-star-half-stroke" style="color: #FFD43B;"></i><i class="fa-regular fa-star" style="color: #FFD43B;"></i><i class="fa-regular fa-star" style="color: #FFD43B;"></i></h4>
                <h4 class="review-date" v-else-if="reviewInfo.score == 3.0"><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-regular fa-star" style="color: #FFD43B;"></i><i class="fa-regular fa-star" style="color: #FFD43B;"></i></h4>
                <h4 class="review-date" v-else-if="reviewInfo.score == 3.5"><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-solid fa-star-half-stroke" style="color: #FFD43B;"></i><i class="fa-regular fa-star" style="color: #FFD43B;"></i></h4>
                <h4 class="review-date" v-else-if="reviewInfo.score == 4.0"><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-regular fa-star" style="color: #FFD43B;"></i></h4>
                <h4 class="review-date" v-else-if="reviewInfo.score == 4.5"><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-solid fa-star-half-stroke" style="color: #FFD43B;"></i></h4>
                <h4 class="review-date" v-else-if="reviewInfo.score == 5.0"><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-solid fa-star" style="color: #FFD43B;"></i></h4>
                <p class="review-date">{{ reviewInfo.createTime }}</p>
              </div>
              <p>{{ reviewInfo.content }}</p>
            </div>
            <a
              v-if="isSameUser(reviewInfo.userId)"
              @click="deleteReview(reviewInfo.id)"
              id="comment-deleteBtn"
            >
              ✖
            </a>
          </div>
        </div>
        <div id="review-regist-body">
          <div id="review-regist">
            <div id="select-star">
              평점  
              <select
                name=""
                id=""
                v-model="reviewObj.score"
                style="cursor: pointer;text-align: center; border: none; width: 100px;font-size: 20px;"
              >
                <option value="0.0" selected>
                  0.0
                </option>
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
            </div>
            <div id="comment-text">
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                v-model="reviewObj.content"
                class="area"
              ></textarea>
            </div>
            <div id="comment-btn">
              <button @click="registReview()">등록</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="isEmptyList()" id="no-data-div">
      <div>
        <div><img src="/src/assets/img/search.png" alt="" /></div>
        <div><h3>대한민국에 있는 모든 동을 검색해보세요!</h3></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#content-navbar-chose:hover {
  font-size: 20px;
}
#count {
  font-weight: 600;
}
.page-div {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1vw;
  margin: 10px 19px 10px 0;
}

#price-main {
  width: 100%;
  border-bottom: 15px solid gainsboro;
  border-top: 15px solid gainsboro;
  margin: 10px 0;
  #price-title {
    padding: 2vh;
    font-size: 1.5rem;
  }
}

.pickPage {
  font-size: 20px;
  font-weight: 600;
}

.price {
  border: 1px solid black;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;

  th {
    border-bottom: 1px solid black;
  }
}

.price th,
.price td {
  text-align: center;
  padding: 10px 40px;
}

.Btn {
  border-style: none;
}

.review-text {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 20px;
}

.review-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.review-date {
  font-size: 14px;
}

.no-answer {
  margin-left: 20px;
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
  overflow: scroll;
  background-color: #f5f7fa;
      #side-content {
    width: 100%;
    height: 200vh;
  }
}

#content-name {
  width: 100%;
  font-size: 2rem;
  padding: 3vh;
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
  border-bottom: 1px solid black;
  border-top: 1px solid black;
  display: flex;
  justify-content: space-around;

  a {
    color: black;
    text-decoration-line: none;
    font-weight: 600;
  }
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
  cursor: pointer;
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

#load-view {
  width: 100%;
  height: 53vh;
  padding: 3vh;
  border-top: 15px solid gainsboro;
  border-bottom: 15px solid gainsboro;
  margin-top: 20px;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3vh;
  }
}

#comment-row {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  line-height: 1.6;
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 5vh;
  position: relative;
  padding: 2vh 1vw 2vh 1vw;
}

#comment-deleteBtn {
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 10px;
}

#review-regist-body {
  width: 100%;
  height: 30vh;
  margin-top: 5vh;
  padding-left: 10%;
  padding-right: 10%;
  font-size: 20px;
}

#review-regist {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  display: flex;
  padding: 1vw;
  flex-direction: column;
  gap: 2vh;
}

.area {
  padding: 20px;
  /* margin-top: 20px; */
  /* width: 760px; */
  resize: none;
  height: 100px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  line-height: 1.6;
  color: #333;
}

#select-star {
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 1vw;
}
select:focus {
  outline: none; /* 포커스시 아웃라인 제거 */
  border: none; /* 포커스시 보더 제거 */
}
#comment-text {
  width: 100%;
  textarea {
    width: 100%;
  }
}

#comment-btn {
  display: flex;
  justify-content: center;
  button {
    background-color: #3498db;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
}

.notice-actions {
  margin: 10px 0;
  display: flex;
  justify-content: end;
}

.notice-actions .btn-update {
  background-color: #3498db;
  color: #fff;
  margin-bottom: 10px;
}

.notice-actions button {
  padding: 10px 15px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}
</style>
