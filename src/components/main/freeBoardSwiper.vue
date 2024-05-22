<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import axios from "axios";
import { ref } from "vue";
// Import Swiper styles
import "swiper/css";

import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { EffectFlip, Pagination, Navigation, Autoplay } from "swiper/modules";
const modules = [EffectFlip, Pagination, Navigation, Autoplay];
import { useRouter } from "vue-router";
const router = useRouter();
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
    :effect="'flip'"
    :centeredSlides="true"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
    :modules="modules"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    class="mySwiper"
    id="photo"
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
    </swiper-slide>
  </swiper>
</template>
<style>
#photo {
  width: 30vw;
  height: 40vh;
  background-color: rgb(243, 245, 249);
}
#slide-box {
  background-size: 100% 80%;
  background-position: center;
  background-repeat: no-repeat;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1vh;
}
</style>
