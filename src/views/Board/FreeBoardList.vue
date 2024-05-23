<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import RankSwiper from "@/components/freeBoard/RankSwiper.vue";

const route = useRoute();
const router = useRouter();

const boardInfo = ref({});
const currentPage = ref(parseInt(route.params.page)); //0부터 시작해야함 1~10 x | 0~9 o
const SECTION_MAX_RANGE = ref(10); //섹션 최대 범위
const SECTION_MAX_NUM = ref(0);
const SECTION_START_NUM = ref(0); //섹션 시작 숫자
const PAGE_PER_SECTION = ref(10); //페이지당 보여줄 개수
const CATEGORY = ref("id");

const selectAll = async () => {
  const url = "http://localhost:80/homeis/board/list";

  const { data } = await axios.get(url, {
    params: {
      page: currentPage.value + 1,
      size: PAGE_PER_SECTION.value,
      category: CATEGORY.value,
    },
  });

  console.log(data);

  boardInfo.value = data;

  const startPage = parseInt(currentPage.value / SECTION_MAX_RANGE.value) + 1;
  SECTION_START_NUM.value = (startPage - 1) * SECTION_MAX_RANGE.value;
  const totalPages = boardInfo.value.totalPages;
  console.log("CURRENTT PAGE = ", currentPage.value);
  console.log("START PAGE = ", startPage);
  console.log("ALL PAGE = ", totalPages);
  console.log(SECTION_START_NUM.value);
  if (SECTION_START_NUM.value + 9 <= totalPages) {
    SECTION_MAX_NUM.value = startPage + 9;
  } else {
    SECTION_MAX_NUM.value = totalPages % SECTION_MAX_RANGE.value;
  }
  console.log("NUM = ", SECTION_MAX_NUM.value);
  console.log("START NUM = ", SECTION_START_NUM.value);
  //console.log("BOARD: ", boardInfo.value.boardList[0]);
};

onMounted(() => {
  selectAll();
});
const prevPage = () => {
  if (currentPage.value == 0) return;
  currentPage.value -= 1;
  selectAll();
};
const nextPage = () => {
  if (currentPage.value == boardInfo.value.totalPages - 1) return;
  currentPage.value += 1;
  selectAll();
};
const movePage = (page) => {
  currentPage.value = page;
  selectAll();
};

selectAll();

const goDetail = (id, page) => {
  router.push({ name: "FreeBoardDetail", params: { id, page } });
};

const goWrite = (page) => {
  const user = JSON.parse(localStorage.getItem("auth"));
  console.log("USER = ", user);
  if (user.user == null) {
    alert("권한이 없습니다!");
    return;
  }
  router.push({
    // path: "/board/free-board/write",
    name: "FreeBoardWrite",
    params: { page },
  });
};

const updatePageNum = () => {
  currentPage.value = 0;
  selectAll();
};

const getRecent = () => {
  CATEGORY.value = "id";
  selectAll();
};

const getHot = () => {
  CATEGORY.value = "hot";
  selectAll();
};
</script>

<template>
  <div id="rank"><RankSwiper /></div>
  <div id="free-main-content">
    <div id="freeBoard-main">
      <div id="freeBoard-header">
        <div id="header01">
          <h1>자유게시판</h1>
        </div>
        <div id="header02">
          <div id="headerup">
            <a @click="goWrite(currentPage)">글쓰기</a>
          </div>
          <div id="headerdown">
            <a @click="getRecent()">최신순</a>
            <a @click="getHot()">인기순</a>
            <select
              name=""
              id=""
              v-model="PAGE_PER_SECTION"
              @change="updatePageNum()"
            >
              <option value="1">1개씩 보기</option>
              <option value="5">5개씩 보기</option>
              <option value="10">10개씩 보기</option>
              <option value="20">20개씩 보기</option>
            </select>
          </div>
        </div>
      </div>
      <hr />
      <table>
        <thead>
          <th style="text-align: start">제목</th>
          <th>작성자</th>
          <th>조회수</th>
          <th>좋아요</th>
          <th>등록시간</th>
        </thead>
        <tr
          v-for="board in boardInfo.boardList"
          :key="board.id"
          @click="goDetail(board.id, currentPage)"
        >
          <td id="td01">{{ board.title }}</td>
          <td id="td02">{{ board.userId }}</td>
          <td id="td03">{{ board.totalView }}</td>
          <td id="td04">{{ board.totalLike }}</td>
          <td id="td05">{{ board.createTime }}</td>
        </tr>
      </table>
      <div class="page-div">
        <div @click="prevPage()">< 이전</div>
        <div
          v-for="i in SECTION_MAX_NUM"
          :key="i"
          @click="movePage(SECTION_START_NUM + i - 1)"
          :class="{ pickPage: currentPage == SECTION_START_NUM + i - 1 }"
        >
          {{ SECTION_START_NUM + i }}
        </div>
        <div @click="nextPage()">다음 ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#header01 {
  width: 80%;
}
#header02 {
  display: flex;
  flex-direction: column;
  justify-content: end;
  cursor: pointer;
  font-size: 1.1rem;
  gap: 0.5vh;
  #headerup {
    text-align: end;
  }
  #headerdown {
    display: flex;
    gap: 0.5vw;
  }
}
.page-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px;
  gap: 1vw;
}

.pickPage {
  font-size: 20px;
}

#rank {
  width: 100%;
  height: 400px;
}
#free-main-content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#freeBoard-main {
  padding: 1vw;
  width: 60%;
  #freeBoard-header {
    display: flex;
    flex-direction: row;
    align-items: end;
  }
  table {
    width: 100%;
    font-size: 1.2rem;
    tr {
      height: 7vh;
    }
    #td01 {
      width: 64%;
    }
    #td02 {
      text-align: center;
      width: 7%;
    }
    #td03 {
      text-align: center;
      width: 7%;
    }
    #td04 {
      text-align: center;
      width: 7%;
    }
    #td05 {
      text-align: center;
      width: 15%;
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
