<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const modules = [Autoplay, Pagination, Navigation];

const homestaViewInfo = ref(null);
const homestaHotInfo = ref(null);
const getHotHomestaList = async () => {
  const { data } = await axios.get("http://localhost:80/homeis/homesta/list", {
    params: { category: "hot", size: 5 },
  });
  homestaHotInfo.value = data;
};
const getViewHomestaList = async () => {
  const { data } = await axios.get("http://localhost:80/homeis/homesta/list", {
    params: { category: "total_view", size: 5 },
  });
  homestaViewInfo.value = data;
};
getHotHomestaList();
getViewHomestaList();
const getImgUrl = (homesta) => {
  if (!homesta) {
    return;
  }
  if (homesta.image.length > 0) {
    return "http://localhost/homeis/img/" + homesta.image[0].saveName;
  }
  return "";
};

const goDetail = (id) => {
  router.push({ name: "HomestagramDetail", params: { id } });
};
</script>

<template>
  <swiper
    :spaceBetween="30"
    :centeredSlides="true"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false,
    }"
    :modules="modules"
    class="mySwiper"
    id="swiper-rank"
    style="margin-top: 2vh"
  >
    <swiper-slide v-if="homestaHotInfo">
      <h1 id="title-hot">어떤 이야기를 좋아할까요?</h1>
      <div id="views-rank">
        <div
          id="rank-box02"
          :style="{
            backgroundImage: `url(${getImgUrl(homestaHotInfo.homestaList[1])})`,
          }"
          @click="goDetail(homestaHotInfo.homestaList[1].id)"
        >
          <div id="rank-2"></div>
          <div id="rank-title">
            <a>{{ homestaHotInfo.homestaList[1].title }}</a>
          </div>
          <div id="rank-content">
            <a>
              <a style="cursor: pointer">
                &nbsp;<i class="fa-solid fa-heart" style="color: #ff0000"></i>
              </a>
              {{ homestaHotInfo.homestaList[1].totalLike }}
            </a>
          </div>
        </div>
        <div
          id="rank-box01"
          :style="{
            backgroundImage: `url(${getImgUrl(homestaHotInfo.homestaList[0])})`,
          }"
          @click="goDetail(homestaHotInfo.homestaList[0].id)"
        >
          <div id="rank-1"></div>
          <div id="rank-down">
            <div id="rank-title">
              <a> {{ homestaHotInfo.homestaList[0].title }} </a>
            </div>
            <div id="rank-content">
              <a>
                <a style="cursor: pointer">
                  &nbsp;<i class="fa-solid fa-heart" style="color: #ff0000"></i>
                </a>
                {{ homestaHotInfo.homestaList[0].totalLike }}
              </a>
            </div>
          </div>
        </div>
        <div
          id="rank-box03"
          :style="{
            backgroundImage: `url(${getImgUrl(homestaHotInfo.homestaList[2])})`,
          }"
          @click="goDetail(homestaHotInfo.homestaList[2].id)"
        >
          <div id="rank-3"></div>
          <div id="rank-title">
            <a>{{ homestaHotInfo.homestaList[2].title }}</a>
          </div>
          <div id="rank-content">
            <a>
              <a style="cursor: pointer">
                &nbsp;<i class="fa-solid fa-heart" style="color: #ff0000"></i>
              </a>
              {{ homestaHotInfo.homestaList[2].totalLike }}</a
            >
          </div>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide v-if="homestaViewInfo">
      <h1 id="title-hot">어떤 사진을 많이 볼까요?</h1>
      <div id="like-rank">
        <div
          id="rank-box02"
          :style="{
            backgroundImage: `url(${getImgUrl(
              homestaViewInfo.homestaList[1]
            )})`,
          }"
          @click="goDetail(homestaViewInfo.homestaList[1].id)"
        >
          <div id="rank-2"></div>
          <div id="rank-title">
            <a>{{ homestaViewInfo.homestaList[1].title }}</a>
          </div>
          <div id="rank-content">
            <a>&#128064; {{ homestaViewInfo.homestaList[1].totalView }}</a>
          </div>
        </div>
        <div
          id="rank-box01"
          :style="{
            backgroundImage: `url(${getImgUrl(
              homestaViewInfo.homestaList[0]
            )})`,
          }"
          @click="goDetail(homestaViewInfo.homestaList[0].id)"
        >
          <div id="rank-1"></div>
          <div id="rank-title">
            <a>{{ homestaViewInfo.homestaList[0].title }}</a>
          </div>
          <div id="rank-content">
            <a>&#128064; {{ homestaViewInfo.homestaList[0].totalView }}</a>
          </div>
        </div>
        <div
          id="rank-box03"
          :style="{
            backgroundImage: `url(${getImgUrl(
              homestaViewInfo.homestaList[2]
            )})`,
          }"
          @click="goDetail(homestaViewInfo.homestaList[2].id)"
        >
          <div id="rank-3"></div>
          <div id="rank-title">
            <a>{{ homestaViewInfo.homestaList[2].title }}</a>
          </div>
          <div id="rank-content">
            <a>&#128064; {{ homestaViewInfo.homestaList[2].totalView }}</a>
          </div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>
<style>
.mySwipper {
  background-color: black;
}
body {
  overflow-x: hidden;
}
#rank-title {
  a {
    /* border-radius: 6px; */
    color: #fff;
    font-weight: 500;
    /* font-size: 20px; */
    /* background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%); */
  }
}
#rank-content {
  margin-top: 10px;
  a {
    /* border-radius: 6px; */
    color: #fff;
    font-weight: 500;
    /* margin-top: 10px; */
    /* padding-top: 10px; */
    /* background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%); */
  }
}
#rank-down {
  width: 100%;
}
#swiper-rank {
  width: 100%;
  height: 100%;
  background-color: rgb(243, 245, 249);
}
#title-hot {
  font-size: 2rem;
  position: absolute;
  padding: 5px 1vw 0 1vw;
  border-radius: 12px;
  top: 2vh;
  left: 40%;
}
#title-view {
  font-size: 2rem;
  position: absolute;
  padding: 5px 1vw 0 1vw;
  border-radius: 12px;
  top: 2vh;
  left: 41%;
}
#views-rank {
  display: flex;
  justify-content: space-around;
  margin-top: 80px;
  width: 100%;
  height: 80%;
  #rank-content {
    margin-bottom: 2vh;
  }
  #rank-box01 {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    background-size: 100% 100%;
    font-size: 1.3rem;
    text-align: center;
    color: black;
    border-radius: 12px;
    /* background-color: #fff; */
    /* background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%); */
    #rank-1 {
      width: 25%;
      height: 28%;
      background-image: url("../../assets/img/1.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-bottom: 150px;
    }
  }
  #rank-box02 {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    background-size: 100% 100%;
    font-size: 1.3rem;
    border-radius: 12px;
    text-align: center;
    color: black;
    #rank-title {
      width: 100%;
    }
    #rank-2 {
      width: 25%;
      height: 28%;
      background-image: url("../../assets/img/2.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-bottom: 150px;
    }
  }
  #rank-box03 {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    background-size: 100% 100%;
    font-size: 1.3rem;
    border-radius: 12px;
    text-align: center;
    color: black;
    #rank-title {
      width: 100%;
    }
    #rank-3 {
      width: 25%;
      height: 28%;
      background-image: url("../../assets/img/3.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-bottom: 150px;
    }
  }
}

/* 아래는 좋아요 수 랭킹 */

#like-rank {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 80%;
  margin-top: 80px;
  #rank-content {
    margin-bottom: 2vh;
  }
  #rank-box01 {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    background: url("../../assets/img/apt01.jpg");
    background-size: 100% 100%;
    font-size: 1.3rem;
    border-radius: 12px;
    text-align: center;
    color: black;
    #rank-title {
      width: 100%;
    }
    #rank-1 {
      width: 25%;
      height: 28%;
      background-image: url("../../assets/img/1.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-bottom: 150px;
    }
  }
  #rank-box02 {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    background: url("../../assets/img/apt01.jpg");
    background-size: 100% 100%;
    font-size: 1.3rem;
    border-radius: 12px;
    text-align: center;
    color: black;
    #rank-title {
      width: 100%;
    }
    #rank-2 {
      width: 25%;
      height: 28%;
      background-image: url("../../assets/img/2.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-bottom: 150px;
    }
  }
  #rank-box03 {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    border-radius: 12px;
    background: url("../../assets/img/apt01.jpg");
    background-size: 100% 100%;
    font-size: 1.3rem;
    text-align: center;
    color: black;
    #rank-title {
      width: 100%;
    }
    #rank-3 {
      width: 25%;
      height: 28%;
      background-image: url("../../assets/img/3.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-bottom: 150px;
    }
  }
}
</style>
