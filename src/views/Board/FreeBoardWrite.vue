<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import boardApi from "@/api/boardApi";

const board = ref({
  userId: JSON.parse(localStorage.getItem("auth")).user.id,
  title: "",
  content: "",
});
const route = useRoute();
const page = route.params.page;

const router = useRouter();
const write = async () => {
  console.log(board.value);

  if (!confirm("정말 등록하시겠습니까?")) return;

  console.log("board = ", JSON.stringify(board.value));
  await boardApi.post("/board/insert", board.value);
  router.replace({ name: "FreeBoardList" });
  alert("글이 정상적으로 등록되었습니다.");
};

const backPage = () => {
  router.push({ name: "FreeBoardList", params: { page } });
};
</script>

<template>
  <div>
    <h1>자유게시판 글 작성</h1>
    <form @submit.prevent="write" class="notice-detail">
      <div class="notice-header">
        <h3>
          제목 :
          <input
            class="title-style"
            type="text"
            name="title"
            id=""
            v-model="board.title"
          />
        </h3>
        <p>
          작성자 :
          <input
            class="author-style"
            type="text"
            disabled
            v-model="board.userId"
            name="userId"
          />
        </p>
      </div>
      <hr class="line" />
      <textarea
        name="content"
        class="area"
        id=""
        v-model="board.content"
        placeholder="여기에 내용을 입력해주세요!"
      ></textarea>
      <br />
      <div class="notice-actions">
        <button class="btn-update" type="submit">등록</button>
      </div>
    </form>
    <div class="notice-actions">
      <button class="back-list" type="button" @click="backPage()">
        돌아가기
      </button>
    </div>
  </div>
</template>
<style scoped>
h1 {
  text-align: center;
  margin-top: 50px;
}

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
  display: flex;
  gap: 70px;
}

.notice-header h3 {
  font-size: 24px;
  color: #333;
}

.notice-header p {
  font-size: 14px;
  color: #666;
  margin-top: 3px;
}

.title-style {
  margin: auto 0;
  height: 30px;
  width: 500px;
  padding: 10px;
  font-size: 24px;
}

.author-style {
  margin: auto 0;
  width: 70px;
  padding: 10px;
  height: 20px;
}

.notice-actions {
  margin: 10px 0;
  display: flex;
  justify-content: center;
}

.notice-actions button {
  padding: 10px 15px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 10px;
}

.notice-actions .btn-delete {
  background-color: #e74c3c;
  color: #fff;
}

.notice-actions .btn-update {
  background-color: #3498db;
  color: #fff;
}

.notice-actions .back-list {
  background-color: #a6aaad;
  color: #fff;
  margin-top: 10px;
  width: 100px;
}
.notice-content {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #333;
  font-size: 20px;
  line-height: 1.6;
}

.area {
  padding: 20px;
  width: 760px;
  height: 300px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  line-height: 1.6;
  color: #333;
}

.line {
  margin: 30px 0;
  border: 1px solid gainsboro;
}
</style>
