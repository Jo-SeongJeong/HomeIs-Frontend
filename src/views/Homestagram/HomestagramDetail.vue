<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import boardApi from "@/api/boardApi";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

const modules = [EffectCoverflow, Pagination];

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const homesta = ref({});

const getHomesta = async () => {
  const { data } = await boardApi.get("/homesta/detail/" + id);
  console.log("HOMESTA = ", data);
  homesta.value = data;
};
getHomesta();

const getImgUrl = (imgUrl) => {
  console.log(imgUrl);
  return "http://localhost/homeis/img/" + imgUrl;
};

const addLike = async () => {
  await boardApi.post("/homesta/like", {
    homestaId: id,
    userId: JSON.parse(localStorage.getItem("auth")).user.id,
  });

  router.go(0);
};

const deleteLike = async () => {
  await boardApi.delete("/homesta/like/" + id);
  router.go(0);
};

const deleteHomesta = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem("auth")).user.id;
    const job = JSON.parse(localStorage.getItem("auth")).user.job;
    if (job != "관리자" && userId != homesta.value.userId) {
      alert("당신에겐 권한이 없어요~");
      return;
    }

    if (!confirm("정말 삭제하시겠어요 ?")) return;

    await boardApi.delete("/homesta/" + id);
    router.replace({ name: "HomestagramView" });
    alert("정상적으로 삭제되었습니다.");
  } catch (error) {
    if (error.response.status === 500) {
      alert("당신에겐 권한이 없어요~");
    }
  }
};

const isWriteUser = () => {
  const userId = JSON.parse(localStorage.getItem("auth")).user.id;
  const job = JSON.parse(localStorage.getItem("auth")).user.job;
  if (job == "관리자") {
    return true;
  } else if (userId == homesta.value.userId) {
    return true;
  }
  return false;
};
</script>

<template>
  <div id="homesta-detail-main">
    <div id="waapper">
      <div id="homesta-detail-header">
        <div id="homesta-detail-header-title">
          <h2>{{ homesta.title }}</h2>
        </div>
        <div style="font-size: 1.2rem">
          {{ homesta.totalView }} &#128064; views
        </div>
        <div v-if="homesta.isLike == 0" style="font-size: 1.2rem">
          <a>{{ homesta.totalLike }} </a
          ><a @click="addLike()" style="cursor: pointer">
            &nbsp;<i class="fa-regular fa-heart" style="color: #ff1100"></i>
            Likes</a
          >
        </div>
        <div v-else-if="homesta.isLike == 1" style="font-size: 1.2rem">
          <a>{{ homesta.totalLike }} </a>
          <a @click="deleteLike()" style="cursor: pointer">
            &nbsp;<i class="fa-solid fa-heart" style="color: #ff0000"></i>
            Likes</a
          >
        </div>
        <a
          @click="deleteHomesta()"
          v-if="isWriteUser()"
          style="cursor: pointer"
        >
          삭제
        </a>
      </div>
      <div id="homesta-detail-content">
        <div id="homesta-detail-swiper">
          <swiper
            :effect="'coverflow'"
            :centeredSlides="true"
            :slidesPerView="'auto'"
            :coverflowEffect="{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }"
            :pagination="{
              clickable: true,
            }"
            :modules="modules"
            class="mySwiper"
          >
            <swiper-slide
              v-for="imgInfo in homesta.image"
              :key="imgInfo.saveName"
              ><div
                id="homesta-detail-image-box"
                :style="{
                  backgroundImage: `url(${getImgUrl(imgInfo.saveName)})`,
                }"
              ></div>
            </swiper-slide>
          </swiper>
        </div>
        <div>
          <a>{{ homesta.content }}</a>
        </div>
        ✍ {{ homesta.userId }}
      </div>
    </div>
  </div>
</template>

<style scoped>
#waapper {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 5vh;
}
.mySwiper {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 70%;
  height: 100%;
}
#homesta-detail-main {
  width: 100vw;
  height: 70vh;
  padding-left: 20vw;
  padding-right: 20vw;
  padding-top: 5vh;
  margin-bottom: 5vh;
  #homesta-detail-header {
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: row;
    align-items: end;
    gap: 1vw;
    #homesta-detail-header-title {
      width: 70%;
      padding-left: 2vw;
      font-size: 1.8rem;
    }
  }
}
#homesta-detail-content {
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2vw;
  font-size: 1.5rem;
  a {
    border-radius: 6px;
  }
  #homesta-detail-swiper {
    width: 60%;
    height: 70%;
  }
}
#homesta-detail-image-box {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
