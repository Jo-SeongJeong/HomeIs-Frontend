<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import boardApi from "@/api/boardApi";

const authStore = useAuthStore();
const router = useRouter();

const noticeInfo = ref({});
const qnaInfo = ref({});
const user = ref({});
user.value = JSON.parse(localStorage.getItem("auth"));

const noticeSelectAll = async () => {
  const url = "http://localhost:80/homeis/notice/list";

  const { data } = await axios.get(url);
  console.log("NOTICE = ", data);
  noticeInfo.value = data;
};

noticeSelectAll();

const noticeGoDetail = (id) => {
  router.push({ name: "NoticeDetail", params: { id } });
};

const qnaSelectAll = async () => {
  if (user.value.user == null) return;
  const userId = user.value.user.id;
  console.log("UserId = ", userId);

  const { data } = await boardApi.get("/qna/list/" + userId);
  qnaInfo.value = data;
  console.log("QNA INFO = ", qnaInfo.value);

  // console.log(authStore.user);
  // const url = "http://localhost:80/homeis/qna/list/" + authStore.user.id;
  // const { data } = await axios.get(url, {
  //   headers: {
  //     Authorization: `Bearer ${authStore.token}`,
  //   },
  // });
};
qnaSelectAll();

const isAdmin = () => {
  if (user.value.user != null) {
    return user.value.user.job == "관리자";
  }
  return "";
};

const qnaGoDetail = (id) => {
  router.push({ name: "QnaDetail", params: { id } });
};
const qnaWrite = () => {
  router.push("/board/qna/write");
};
</script>

<template>
  <div id="notice-main-img">무엇을 도와드릴까요?</div>
  <div id="main">
    <div id="main-left">
      <div id="notice-main">
        <div id="notice-header">
          <h1>공지 사항</h1>
          <router-link
            to="/board/notice/write"
            v-if="isAdmin()"
            style="text-decoration: none; cursor: pointer; color: black"
            >글쓰기</router-link
          >
        </div>
        <hr />
        <table>
          <tr
            v-for="notice in noticeInfo.noticeList"
            :key="notice.id"
            @click="noticeGoDetail(notice.id)"
            style="cursor: pointer"
          >
            <td>{{ notice.title }}</td>
            <td>{{ notice.createTime }}</td>
          </tr>
        </table>
      </div>
      <div id="notice-main">
        <div id="notice-header">
          <h1>문의사항</h1>
          <router-link
            to="/board/qna/write"
            style="text-decoration: none; cursor: pointer; color: black"
            >글쓰기</router-link
          >
        </div>
        <hr />
        <table>
          <tr
            v-for="qna in qnaInfo.qnaList"
            :key="qna.id"
            @click="qnaGoDetail(qna.id)"
            style="cursor: pointer"
          >
            <td>{{ qna.title }}</td>
            <td>{{ qna.createTime }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div id="main-right">
      <div id="qna-image-box-1"></div>
      <div id="qna-image-box-2"></div>
      <div id="qna-image-box-3" @click="qnaWrite" style="cursor: pointer"></div>
    </div>
  </div>
</template>

<style scoped>
#notice-main-img {
  margin-top: 1vw;
  width: 100%;
  height: 60vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url("../../assets/img/center.jpg");
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: white;
}
#main {
  width: 100vw;
  display: flex;
  align-items: start;
  flex-direction: row;
  padding-left: 10vw;
  padding-right: 10vw;
  padding-top: 3vh;
  gap: 5vw;
}
#main-right {
  width: 35%;
  height: 100vh;
  padding: 2vw;
  display: flex;
  flex-direction: column;
  gap: 12vh;
  #qna-image-box-1 {
    width: 100%;
    height: 30%;
    background-image: url("../../assets/img/kakaoQna.png");
    background-size: 100% 100%;
  }
  #qna-image-box-3 {
    width: 100%;
    height: 15%;
    background-image: url("../../assets/img/qna.png");
    background-size: 100% 100%;
  }
  #qna-image-box-2 {
    width: 100%;
    height: 10%;
    background-image: url("../../assets/img/qna3.png");
    background-size: 100% 100%;
  }
}
#main-left {
  width: 65%;
}
#notice-main {
  padding: 1vw;
  width: 100%;
  #notice-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
  }
  table {
    width: 100%;
    font-size: 1.2rem;
    tr {
      margin: 1vw;
      display: flex;
      justify-content: space-between;
    }
  }
  hr {
    margin-top: 1vh;
    height: 1px;
    background: #8f1414;
    background-image: -webkit-linear-gradient(left, #eee, #777, #eee);
    background-image: -moz-linear-gradient(left, #eee, #777, #eee);
    background-image: -ms-linear-gradient(left, #eee, #777, #eee);
    background-image: -o-linear-gradient(left, #eee, #777, #eee);
  }
}
</style>
