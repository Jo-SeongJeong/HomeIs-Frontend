<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import boardApi from "@/api/boardApi";

const route = useRoute();
const id = route.params.id;
const board = ref({});
const commentInfo = ref({
  boardId: "",
  userId: "",
  comment: ""
});

const isSameId = () => {
  const user = JSON.parse(localStorage.getItem("auth")).user;
  if (user == null) return false;
  if (user.id == board.value.userId) return true;
  return false;
};

const getBoard = async () => {
  const url = "http://localhost:80/homeis/board/detail/" + id;
  console.log(url);
  const data = await axios.get(url);
  console.log(data);
  board.value = data.data;
};
getBoard();
console.log("id:", id);

const router = useRouter();
const deleteBoard = async () => {
  if (!confirm("정말 삭제하시겠습니까?")) return;
  console.log("REAL BOARD ==", JSON.stringify(board.value));
  await boardApi.put("/board/delete", board.value);
  router.replace({ name: "FreeBoardList" });
  alert("정상적으로 삭제되었습니다!");
};

const isCommentEmpty = () => {
  if (board.value.commentList == null || board.value.commentList.length === 0) {
    return true;
  }
  return false;
}

const addComment = async () => {
  commentInfo.value.boardId = id;
  commentInfo.value.userId = JSON.parse(localStorage.getItem("auth")).user.id;
  await boardApi.post("/board/insert-comment", commentInfo.value);
  router.go(0);
}

const getCommentLength = () => {
  if (board.value.commentList == null || board.value.commentList.length === 0) {
    return 0;
  }
  return board.value.commentList.length;
}

const addLike = async () => {
  try {
    await boardApi.post("/board/like", {boardId: id, userId: JSON.parse(localStorage.getItem("auth")).user.id})
  }
  catch(error) {
    if (error.response.status === 500) {
      await boardApi.put("/board/like", {boardId: id, userId: JSON.parse(localStorage.getItem("auth")).user.id})
    }
  }
  router.go(0);
}
</script>

<template>
  <div>
    <div>{{ board.id }}</div>
    <button v-if="isSameId()" @click="deleteBoard">삭제</button>
    <div>{{ board.createTime }}</div>
    <div>{{ board.content }}</div>
    <div>조회수 {{ board.view }}</div>
    <div>좋아요 {{ board.totalLike }}</div>
    <button @click="addLike()" v-if="board.isLike == 0">좋아용!!</button>
    <button @click="addLike()" v-else-if="board.isLike == 1">좋아용 취소!!</button>

    <hr />

    <br>
    <h3>댓글 ({{ getCommentLength() }})</h3>
    <div v-if="isCommentEmpty()">
      <h4>- 현재 달린 댓글이 없어용! 댓글을 달아보세용! -</h4>
    </div>
    <table v-else>
      <tr v-for="comment in board.commentList" :key="board.id">
        <td>작성자 : {{ comment.userId }}</td>
        <td>내용 : {{ comment.comment }}</td>
        <td>작성 시간 : {{ comment.createTime }}</td>
      </tr>
    </table>

    <textarea name="" id="" v-model="commentInfo.comment" style="width:400px;height: 100px"></textarea>
    <button @click="addComment()">댓글 등록</button>
  </div>
</template>

<style scoped></style>
