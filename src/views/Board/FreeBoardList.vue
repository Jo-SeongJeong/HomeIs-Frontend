<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const boardInfo = ref({});
const currentPage = ref(parseInt(route.params.page)); //0부터 시작해야함 1~10 x | 0~9 o
const SECTION_MAX_RANGE = ref(10); //섹션 최대 범위
const SECTION_MAX_NUM = ref(0); 
const SECTION_START_NUM = ref(0); //섹션 시작 숫자
const PAGE_PER_SECTION = ref(10); //페이지당 보여줄 개수

const selectAll = async () => {
  const url = "http://localhost:80/homeis/board/list";

  const { data } = await axios.get(url, { params: {page: currentPage.value + 1, size: PAGE_PER_SECTION.value}});

  console.log(data);

  boardInfo.value = data;

  const startPage = parseInt(currentPage.value / SECTION_MAX_RANGE.value) + 1;
  SECTION_START_NUM.value = (startPage - 1) * SECTION_MAX_RANGE.value;
  const totalPages = boardInfo.value.totalPages;
  console.log("CURRENTT PAGE = ",currentPage.value);
  console.log("START PAGE = ",startPage);
  console.log("ALL PAGE = ", totalPages );
  console.log(SECTION_START_NUM.value);
  if (SECTION_START_NUM.value + 9 <= totalPages ) {
    SECTION_MAX_NUM.value = startPage + 9;
  } else {
    SECTION_MAX_NUM.value = totalPages % SECTION_MAX_RANGE.value;
  }
  console.log("NUM = ",SECTION_MAX_NUM.value);
  console.log("START NUM = ",SECTION_START_NUM.value);
  //console.log("BOARD: ", boardInfo.value.boardList[0]);
};

onMounted (() => {
  selectAll();
})
const prevPage = () => {
  if (currentPage.value == 0) return;
  currentPage.value -= 1;
  selectAll();
}
const nextPage = () => {
  if (currentPage.value == boardInfo.value.totalPages - 1) return;
  currentPage.value += 1;
  selectAll();
}
const movePage = (page) => {
  currentPage.value = page;
  selectAll();
}

selectAll();

const goDetail = (id, page) => {
  router.push({ name: "FreeBoardDetail", params: { id, page } });
};

const goWrite = () => {
  const user = JSON.parse(localStorage.getItem("auth"));
  console.log("USER = ", user);
  if (user.user == null) {
    alert("권한이 없습니다!");
    return;
  }
  router.push({
    path: "/board/free-board/write",
  });
};

const updatePageNum = () => {
  currentPage.value = 0;
  selectAll();
}
</script>

<template>
  <div style="width: 100%; height: 300px; background-color: aliceblue">
    활동지수 랭킹
  </div>
  <h1>자유게시판</h1>
  <a @click="goWrite" style="color: red">+ 글쓰기</a>
  <select name="" id="" v-model="PAGE_PER_SECTION" @change="updatePageNum()">
    <option value="1">1개씩 보기</option>
    <option value="5">5개씩 보기</option>
    <option value="10">10개씩 보기</option>
    <option value="20">20개씩 보기</option>
  </select>
  <div>
    <table>
      <thead>
        <th>제목</th>
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
        <td>{{ board.title }}</td>
        <td>{{ board.userId }}</td>
        <td>{{ board.view }}</td>
        <td>{{ board.totalLike }}</td>
        <td>{{ board.createTime }}</td>
      </tr>
    </table>

    <div class="page-div">
      <span @click="prevPage()">< 이전</span>
      <span v-for="i in SECTION_MAX_NUM" :key="i" @click="movePage(SECTION_START_NUM + i - 1)" :class="{pickPage: currentPage == SECTION_START_NUM + i - 1}">{{ SECTION_START_NUM + i }}</span>
      <span @click="nextPage()">다음 ></span>
    </div>
  </div>
</template>

<style scoped>
  .page-div span{
    margin: 10px;
  }

  .pickPage {
    font-size: 20px;
  }
</style>
