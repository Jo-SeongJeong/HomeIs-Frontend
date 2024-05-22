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
    params: { category: "view", size: 5 },
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
</script>

<template>
  <swiper
    :spaceBetween="30"
    :centeredSlides="true"
    :autoplay="{
      delay: 2000,
      disableOnInteraction: false,
    }"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper"
    id="swiper-rank"
    style="margin-top: 2vh"
  >
    <swiper-slide v-if="homestaHotInfo">
      <div id="title">좋아요 TOP 3</div>
      <div id="views-rank">
        <div
          id="rank-box02"
          :style="{
            backgroundImage: `url(${getImgUrl(homestaHotInfo.homestaList[1])})`,
          }"
        >
          <div id="rank-2"></div>
          <div id="rank-title">{{ homestaHotInfo.homestaList[1].title }}</div>
          <div id="rank-content">
            {{ homestaHotInfo.homestaList[1].totalLike }} likes
          </div>
        </div>
        <div
          id="rank-box01"
          :style="{
            backgroundImage: `url(${getImgUrl(homestaHotInfo.homestaList[0])})`,
          }"
        >
          <div id="rank-1"></div>
          <div id="rank-down">
            <div id="rank-title">
              {{ homestaHotInfo.homestaList[0].title }}
            </div>
            <div id="rank-content">
              {{ homestaHotInfo.homestaList[0].totalLike }} likes
            </div>
          </div>
        </div>
        <div
          id="rank-box03"
          :style="{
            backgroundImage: `url(${getImgUrl(homestaHotInfo.homestaList[2])})`,
          }"
        >
          <div id="rank-3"></div>
          <div id="rank-title">{{ homestaHotInfo.homestaList[2].title }}</div>
          <div id="rank-content">
            {{ homestaHotInfo.homestaList[2].totalLike }} likes
          </div>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide v-if="homestaViewInfo">
      <div id="title">조회수 TOP 3</div>
      <div id="like-rank">
        <div
          id="rank-box02"
          :style="{
            backgroundImage: `url(${getImgUrl(
              homestaViewInfo.homestaList[1]
            )})`,
          }"
        >
          <div id="rank-2"></div>
          <div id="rank-title">{{ homestaViewInfo.homestaList[1].title }}</div>
          <div id="rank-content">
            {{ homestaViewInfo.homestaList[1].view }} view
          </div>
        </div>
        <div
          id="rank-box01"
          :style="{
            backgroundImage: `url(${getImgUrl(
              homestaViewInfo.homestaList[0]
            )})`,
          }"
        >
          <div id="rank-1"></div>
          <div id="rank-title">{{ homestaViewInfo.homestaList[0].title }}</div>
          <div id="rank-content">
            {{ homestaViewInfo.homestaList[0].view }} view
          </div>
        </div>
        <div
          id="rank-box03"
          :style="{
            backgroundImage: `url(${getImgUrl(
              homestaViewInfo.homestaList[2]
            )})`,
          }"
        >
          <div id="rank-3"></div>
          <div id="rank-title">{{ homestaViewInfo.homestaList[2].title }}</div>
          <div id="rank-content">
            {{ homestaViewInfo.homestaList[2].view }} view
          </div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>
<style>
#rank-down {
  width: 100%;
}
#swiper-rank {
  width: 100%;
  height: 100%;
}
#title {
  color: white;
  font-size: 3rem;
  position: absolute;
  background-color: blue;
  border-radius: 12px;
  top: 1vh;
  left: 3vw;
}
#views-rank {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
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
    #rank-1 {
      width: 25%;
      height: 28%;
      background-image: url("../../assets/img/1.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
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
    }
  }
}

/* 아래는 좋아요 수 랭킹 */

#like-rank {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
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
    }
  }
  #rank-box03 {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
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
    }
  }
}
</style>
