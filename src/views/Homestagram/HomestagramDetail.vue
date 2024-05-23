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

  getHomesta();
};

const deleteLike = async () => {
  await boardApi.delete("/homesta/like/" + id);
  getHomesta();
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
  <div class="notice-detail">
    <div class="notice-header">
      <div class="info">
        <div>
          <h3>제목 : {{ homesta.title }}</h3>
          <p>작성일 : {{ homesta.createTime }}</p>
        </div>
        <div>
          <p class="author">작성자 : {{ homesta.userId }}</p>
          <div class="view-like">
            <div
              style="
                font-size: 1rem;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <a> {{ homesta.totalView }} &#128064; views </a>
            </div>
            <div
              style="
                font-size: 1rem;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <a
                >{{ homesta.totalLike }}
                <i class="fa-solid fa-heart" style="color: #ff0000"></i>
                likes</a
              >
            </div>
          </div>
        </div>
      </div>
      <hr class="line" />
    </div>

    <div class="notice-actions">
      <button class="btn-delete" @click="deleteHomesta" v-if="isWriteUser()"
          style="cursor: pointer">
        삭제
      </button>
    </div>

    <div class="notice-content">
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
          <h3 class="hashtag">{{ homesta.content }}</h3>
    </div>
    <div class="like-actions">
      <div v-if="homesta.isLike == 0" style="font-size: 1.4rem; margin-top: 1vh">
          <a @click="addLike()" style="cursor: pointer">
            &nbsp;<i class="fa-regular fa-heart" style="color: #ff1100"></i>
            Likes
          </a>
        </div>
        <div v-else-if="homesta.isLike == 1" style="font-size: 1.4rem; margin-top: 1vh">
          <a @click="deleteLike()" style="cursor: pointer">
            &nbsp;<i class="fa-solid fa-heart" style="color: #ff0000"></i>
            Likes
          </a>
        </div>
    </div>
  </div>
</template>

<style scoped>
.notice-detail {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.notice-header {
  margin-bottom: 20px;
}

.toUser {
  margin-top: 20px;
  text-align: end;
}

h3 {
  margin: 10px 0;
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.notice-header p {
  font-size: 14px;
  color: #666;
}

.author {
  text-align: end;
  margin-bottom: 10px;
  margin-top: 20px;
}

.view-like {
  display: flex;
  gap: 15px;
}

.info {
  display: flex;
  justify-content: space-between;
}

.notice-actions {
  margin: 10px 0;
  display: flex;
  justify-content: end;
}

.notice-actions button {
  padding: 10px 15px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.notice-actions .btn-delete {
  background-color: #e74c3c;
  color: #fff;
  margin-bottom: 10px;
}

.line {
  margin-top: 30px;
  border: 1px solid gainsboro;
}

.notice-content {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 20px;
  color: #333;
  line-height: 1.6;
}

.hashtag {
  padding-left: 110px;
  padding-top: 10px;
}

.like-actions {
  margin: 10px 0;
  display: flex;
  justify-content: center;
}

.like-actions button {
  padding: 10px 15px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

#homesta-detail-image-box {
  /* width: 100%; */
  height: 50vh;
  background-repeat: no-repeat;
  background-size: 100% 100%;
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
</style>
