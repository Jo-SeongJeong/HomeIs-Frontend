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
      ><img
        src="https://swiperjs.com/demos/images/nature-1.jpg"
        id="mainAddImg"
      />
      <div class="title" data-swiper-parallax="-300">Slide 2</div></swiper-slide
    >

    <swiper-slide
      ><img
        src="https://swiperjs.com/demos/images/nature-2.jpg"
        id="mainAddImg" /></swiper-slide
    ><swiper-slide
      ><img
        src="https://swiperjs.com/demos/images/nature-3.jpg"
        id="mainAddImg" /></swiper-slide
    ><swiper-slide
      ><img
        src="https://swiperjs.com/demos/images/nature-4.jpg"
        id="mainAddImg" /></swiper-slide
    ><swiper-slide
      ><img
        src="https://swiperjs.com/demos/images/nature-5.jpg"
        id="mainAddImg" /></swiper-slide
    ><swiper-slide
      ><img
        src="https://swiperjs.com/demos/images/nature-6.jpg"
        id="mainAddImg"
    /></swiper-slide>
  </swiper>
</template>
<style>
#photo {
  width: 30vw;
  height: 40vh;
  background-color: rgb(243, 245, 249);
}
#mainAddImg {
  width: 30vw;
  height: 40vh;
}
</style>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { EffectFlip, Pagination, Navigation, Autoplay } from "swiper/modules";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [EffectFlip, Pagination, Navigation, Autoplay],
    };
  },
};
</script>
