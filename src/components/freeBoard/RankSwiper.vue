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
      <h1 id="title-hot-b">아파트 조회수 TOP 3</h1>
      <div id="views-rank">
        <div id="rank-box02-free">
          <div id="rank-2"></div>
          <div id="rank-title">
            <a>
              {{ aptViewList[1].apartmentName }}
            </a>
          </div>
          <div id="rank-content">
            <a> &#128064; {{ aptViewList[1].totalView }} </a>
          </div>
        </div>
        <div id="rank-box01-free">
          <div id="rank-1"></div>
          <div id="rank-title">
            <a>
              {{ aptViewList[0].apartmentName }}
            </a>
          </div>
          <div id="rank-content">
            <a> &#128064; {{ aptViewList[0].totalView }} </a>
          </div>
        </div>
        <div id="rank-box03-free">
          <div id="rank-3"></div>
          <div id="rank-title">
            <a>
              {{ aptViewList[2].apartmentName }}
            </a>
          </div>
          <div id="rank-content">
            <a> &#128064; {{ aptViewList[2].totalView }} </a>
          </div>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide v-if="aptLikeList.length > 0">
      <h1 id="title-hot-b">아파트 좋아요 TOP 3</h1>
      <div id="like-rank">
        <div id="rank-box02-free">
          <div id="rank-2"></div>
          <div id="rank-title">
            <a>
              {{ aptLikeList[1].apartmentName }}
            </a>
          </div>
          <div id="rank-content">
            <a style="cursor: pointer">
              &nbsp;<i class="fa-solid fa-heart" style="color: #ff0000"></i>
            </a>
            {{ aptLikeList[2].totalLike }}
          </div>
        </div>
        <div id="rank-box01-free">
          <div id="rank-1"></div>
          <div id="rank-title">
            <a>
              {{ aptLikeList[0].apartmentName }}
            </a>
          </div>
          <div id="rank-content">
            <a>
              <a style="cursor: pointer">
                &nbsp;<i class="fa-solid fa-heart" style="color: #ff0000"></i>
              </a>
              {{ aptLikeList[2].totalLike }}
            </a>
          </div>
        </div>
        <div id="rank-box03-free">
          <div id="rank-3"></div>
          <div id="rank-title">
            <a>
              {{ aptLikeList[2].apartmentName }}
            </a>
          </div>
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

#title-hot-b {
  font-size: 2rem;
  position: absolute;
  padding: 5px 1vw 0 1vw;
  border-radius: 12px;
  top: 2vh;
  left: 42%;
}
#swiper-rank {
  width: 100%;
  height: 100%;
  background-color: rgb(243, 245, 249);
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
  width: 100%;
  height: 80%;
  margin-top: 80px;
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
    background: url("../../assets/img/하우스토리네오미아.jpg");
    background-size: 100% 100%;
    font-size: 1.3rem;
    text-align: center;
    color: white;
    border-radius: 12px;
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
  #rank-box02-free {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    background: url("../../assets/img/논현동르메르디앙.jpg");
    background-size: 100% 100%;
    font-size: 1.3rem;
    text-align: center;
    color: white;
    border-radius: 12px;
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
  #rank-box03-free {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    background: url("../../assets/img/광화문.jpg");
    background-size: 100% 100%;
    font-size: 1.3rem;
    border-radius: 12px;
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
  #rank-box01-free {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    background: url("../../assets/img/광화문.jpg");
    background-size: 100% 100%;
    font-size: 1.3rem;
    border-radius: 12px;
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
      margin-bottom: 150px;
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
    background: url("../../assets/img/펜트힐.jpg");
    background-size: 100% 100%;
    font-size: 1.3rem;
    border-radius: 12px;
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
      margin-bottom: 150px;
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
    background: url("../../assets/img/논현라플리움.jpg");
    background-size: 100% 100%;
    font-size: 1.3rem;
    border-radius: 12px;
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
      margin-bottom: 150px;
    }
  }
}
</style>
