<template>
  <swiper
    :spaceBetween="30"
    :centeredSlides="true"
    :autoplay="{
      delay: 1500,
      disableOnInteraction: false,
    }"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper"
    id="add"
  >
    <swiper-slide
      ><img src="../../assets/img/mainAdd.jpg" alt="" id="mainAddImg"
    /></swiper-slide>
    <swiper-slide
      ><img
        src="../../assets/img/mainAdd02.jpg"
        alt=""
        id="mainAddImg" /></swiper-slide
    ><swiper-slide
      ><img src="../../assets/img/mainAdd03.jpg" alt="" id="mainAddImg"
    /></swiper-slide>
  </swiper>
</template>
<style>
#add {
  width: 23vw;
  height: 28vh;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
#mainAddImg {
  width: 23vw;
  height: 28vh;
}
</style>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Autoplay, Pagination, Navigation],
    };
  },
};
</script>
