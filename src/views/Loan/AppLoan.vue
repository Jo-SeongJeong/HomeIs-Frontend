<script setup>
import Footer from "@/components/Footer.vue";
import axios from "axios";
import { ref } from "vue";
import boardApi from "@/api/boardApi";

const loanInfo = ref({});
const CATEGORY = ref("release_date");

const selectAll = async () => {
  const url = "/loan/list";

  console.log(CATEGORY.value);

  const { data } = await boardApi.get(url, {
    params: {
      category: CATEGORY.value,
    },
  });
  console.log(data);
  loanInfo.value = data;
};

selectAll();

const getRecent = () => {
  CATEGORY.value = "release_date";
  selectAll();
};

const getInterest = () => {
  CATEGORY.value = "interest_rate";
  selectAll();
};

const getView = () => {
  CATEGORY.value = "views";
  selectAll();
};

const goBank = async (bankLink, id) => {
  const url = "/loan/plusView";

  const { data } = await boardApi.patch(url, {
    id: id,
  });

  console.log(data);

  if (data == 1) {
    window.open(bankLink, "_blank");
  }
  selectAll();
};
</script>

<template>
  <div id="loan-main">
    <div class="banner">
      <h1 class="banner-title">추천 대출 상품</h1>
      <div class="loan-banner">
        <div
          class="banner-list"
          v-for="loan in loanInfo.slice(0, 3)"
          :key="loan.id"
        >
          <div class="loan-text">
            <p>{{ loan.description }}</p>
            <h2>{{ loan.name }}</h2>
            <h4 class="loan-date">연 이자율: {{ loan.interestRate }}%</h4>
          </div>
          <div class="loan-actions">
            <button
              class="back-list"
              type="button"
              @click="goBank(loan.link, loan.id)"
            >
              알아보기
            </button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="search-by">
        <h1>원하는 조건으로 검색해보세요!</h1>
        <div class="sort-by">
          <h3>
            <a @click="getRecent()">최신순</a>
          </h3>
          <h3>
            <a @click="getInterest()">이자율순</a>
          </h3>
          <h3>
            <a @click="getView()">조회순</a>
          </h3>
        </div>
      </div>
      <div class="comment-content" v-for="loan in loanInfo" :key="loan.id">
        <div class="loan-list">
          <div class="comment-text">
            <p>{{ loan.description }}</p>
            <h2>{{ loan.name }}</h2>
            <div class="comment-date">
              <h4>연 이자율: {{ loan.interestRate }}%</h4>
              <p>조회수: {{ loan.views }}</p>
            </div>
          </div>
          <div class="like-actions">
            <button
              class="back-list"
              type="button"
              @click="goBank(loan.link, loan.id)"
            >
              알아보기
            </button>
          </div>
        </div>
        <hr class="line" />
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
#loan-main {
  background-color: rgb(227, 234, 248);
  width: 99vw;
  height: 480vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1vw 25vh 5vw 25vh;
}

.banner {
  display: flex;
  flex-direction: column;
  height: 50vh;
  width: 1700px;
  padding: 1vw 25vh 5vw 25vh;
  margin-top: 40px;
}

.banner-title {
  margin: 20px 0;
  margin-left: 20px;
}

.loan-banner {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.banner-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  width: 400px;
  height: 280px;
}

.loan-text {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 20px;
  margin-bottom: 5px;
}

.loan-date {
  display: flex;
  flex-direction: row;
  gap: 30px;
}

.loan-actions {
  margin: 10px 0;
  display: flex;
  justify-content: center;
}

.loan-actions button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.loan-actions .back-list {
  background-color: #a6aaad;
  color: #fff;
  margin-top: 10px;
  width: 100px;
}

.search-by {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  margin-left: 20px;
}

.sort-by {
  display: flex;
  align-items: end;
  padding-bottom: 20px;
  gap: 20px;
}

.loan-list {
  display: flex;
  justify-content: space-between;
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

.like-actions .back-list {
  background-color: #a6aaad;
  color: #fff;
  margin-top: 10px;
  width: 100px;
}

.comment-content {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
}

.comment-text {
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 20px;
  margin-bottom: 5px;
}

.comment-date {
  display: flex;
  flex-direction: row;
  gap: 30px;
}

.line {
  margin-top: 30px;
  border: 1px solid gainsboro;
}
/* #loan-main-body {
  width: 100%;
  height: 100%;
  padding-left: 5vw;
  padding-right: 5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; */
/* #loan-main-banner {
    width: 100%;
    height: 18%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5vw;
    background-color: aqua;
    #loan-banner-box {
      width: 25%;
      height: 80%;
      background-color: antiquewhite;
    }
  } */
/* } */

/* #loan-list-body {
  width: 100%;
  height: 70%;
  background-color: beige; */
/* #loan-sort {
    background-color: blanchedalmond;
    width: 100%;
    height: 10%;
  } */
/* #loan-list-content {
    width: 100%;
    height: 90%;
  } */
/* } */
</style>
