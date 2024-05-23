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
const aptLikeList = ref([]);
const aptViewList = ref([]);

const getLikeRank = async () => {
  const url = "http://localhost:80/homeis/map/like";
  const { data } = await axios.get(url);
  aptLikeList.value = data;
  console.log("aptLikeList", aptLikeList.value);
};

const getViewRank = async () => {
  const url = "http://localhost:80/homeis/map/view";
  const { data } = await axios.get(url);
  aptViewList.value = data;
  console.log("aptViewList", aptViewList.value);
};
getViewRank();
getLikeRank();
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
    <swiper-slide v-if="aptViewList.length > 0">
      <div id="freeboard-title">조회수 TOP 3</div>
      <div id="views-rank">
        <div id="rank-box02-free">
          <div id="rank-2"></div>
          <div id="rank-title">{{ aptViewList[1].apartmentName }}</div>
          <div id="rank-content">&#128064; {{ aptViewList[1].totalView }}</div>
        </div>
        <div id="rank-box01-free">
          <div id="rank-1"></div>
          <div id="rank-title">{{ aptViewList[0].apartmentName }}</div>
          <div id="rank-content">&#128064; {{ aptViewList[0].totalView }}</div>
        </div>
        <div id="rank-box03-free">
          <div id="rank-3"></div>
          <div id="rank-title">{{ aptViewList[2].apartmentName }}</div>
          <div id="rank-content">&#128064; {{ aptViewList[2].totalView }}</div>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide v-if="aptLikeList.length > 0">
      <div id="freeboard-title">좋아요 TOP 3</div>
      <div id="like-rank">
        <div id="rank-box02-free">
          <div id="rank-2"></div>
          <div id="rank-title">{{ aptLikeList[1].apartmentName }}</div>
          <div id="rank-content">
            <a style="cursor: pointer">
              &nbsp;<i class="fa-solid fa-heart" style="color: #ff0000"></i>
            </a>
            {{ aptLikeList[2].totalLike }}
          </div>
        </div>
        <div id="rank-box01-free">
          <div id="rank-1"></div>
          <div id="rank-title">{{ aptLikeList[0].apartmentName }}</div>
          <div id="rank-content">
            <a style="cursor: pointer">
              &nbsp;<i class="fa-solid fa-heart" style="color: #ff0000"></i>
            </a>
            {{ aptLikeList[2].totalLike }}
          </div>
        </div>
        <div id="rank-box03-free">
          <div id="rank-3"></div>
          <div id="rank-title">{{ aptLikeList[2].apartmentName }}</div>
          <div id="rank-content">
            <a style="cursor: pointer">
              &nbsp;<i class="fa-solid fa-heart" style="color: #ff0000"></i>
            </a>
            {{ aptLikeList[2].totalLike }}
          </div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>
<style>
#swiper-rank {
  width: 100%;
  height: 100%;
  /* background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%); */
}
#freeboard-title {
  color: white;
  font-size: 3rem;
  position: absolute;
  /* background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%); */
  padding: 0 1vw 0 1vw;
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
  #rank-box01-free {
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
    color: white;
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
  #rank-box02-free {
    width: 20%;
    height: 100%;
    /* background-color: aqua; */
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    background: url("../../assets/img/apt01.jpg");
    background-size: 100% 100%;
    font-size: 1.3rem;
    text-align: center;
    color: white;
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
  #rank-box03-free {
    width: 20%;
    height: 100%;
    /* background-color: aqua; */
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    background: url("../../assets/img/apt01.jpg");
    background-size: 100% 100%;
    font-size: 1.3rem;
    text-align: center;
    color: white;
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
  #rank-box01-free {
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
    color: white;
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
  #rank-box02-free {
    width: 20%;
    height: 100%;
    /* background-color: aqua; */
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    background: url("../../assets/img/apt01.jpg");
    background-size: 100% 100%;
    font-size: 1.3rem;
    text-align: center;
    color: white;
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
  #rank-box03-free {
    width: 20%;
    height: 100%;
    /* background-color: aqua; */
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    background: url("../../assets/img/apt01.jpg");
    background-size: 100% 100%;
    font-size: 1.3rem;
    text-align: center;
    color: white;
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
