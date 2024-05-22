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

const homestaHotInfo = ref({});

const getHotHomestaList = async () => {
  const { data } = await axios.get("http://localhost:80/homeis/homesta/list", {
    params: { category: "hot" },
  });
  homestaHotInfo.value = data;
};
getHotHomestaList();
const getImgUrl = (homesta) => {
  if (homesta.image.length > 0) {
    return "http://localhost/homeis/img/" + homesta.image[0].saveName;
  }
  return "";
};

const getContent = (homesta) => {
  if (homesta.content == null || homesta.content.indexOf("#")) {
    return "";
  }
  return homesta.content;
};

const goDetail = (id) => {
  router.push({ name: "HomestagramDetail", params: { id } });
};
</script>

<template>
  <swiper
    :slidesPerView="5"
    :spaceBetween="70"
    :freeMode="true"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper"
    style="padding: 10px"
  >
    <swiper-slide
      v-for="homesta in homestaHotInfo.homestaList"
      :key="homesta.id"
      id="slide-box"
      :style="{
        backgroundImage: `url(${getImgUrl(homesta)})`,
      }"
      @click="goDetail(homesta.id)"
    >
      <div id="box">
        <div id="box-up">
          <div id="box-header">
            <div>{{ homesta.title }}</div>
            <div>{{ homesta.userId }}</div>
          </div>
          <div id="content">
            <a>{{ getContent(homesta) }}</a>
          </div>
        </div>
        <div id="box-down">
          <div>{{ homesta.totalLike }} likes</div>
          <div>{{ homesta.view }} views</div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<style scoped>
#slide-box {
  height: 30vh;
  background-size: 100% 80%;
  background-position: center;
  background-repeat: no-repeat;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1vh;
  #box {
    width: 100%;
    height: 100%;
    #box-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    #box-up {
      width: 100%;
      height: 80%;
      display: flex;
      flex-direction: column;
      gap: 1vh;
    }
    #box-down {
      width: 100%;
      height: 20%;
      display: flex;
      justify-content: end;
      align-items: end;
      gap: 1vw;
      div {
        padding: 2px;
        border-radius: 6px;
        background-color: aquamarine;
      }
    }
  }
}
#content {
  width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  a {
    padding-left: 0.3vw;
    padding-right: 0.3vw;
    border-radius: 6px;
    background-color: antiquewhite;
  }
}
</style>
