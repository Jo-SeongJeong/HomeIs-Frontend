<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import boardApi from "@/api/boardApi";

const route = useRoute();
const id = route.params.id;
const page = route.params.page;
const board = ref({});
const commentInfo = ref({
  id: "",
  boardId: "",
  userId: "",
  comment: "",
});

const isSameId = () => {
  const user = JSON.parse(localStorage.getItem("auth")).user;
  if (user == null) return false;
  if (user.id == board.value.userId) return true;
  return false;
};

const isSameCommentId = (commentUserId) => {
  const user = JSON.parse(localStorage.getItem("auth")).user;
  if (user == null) return false;
  if (user.id == commentUserId) return true;
  return false;
};

const getBoard = async () => {
  const url = "/board/detail/" + id;
  console.log(url);
  const data = await boardApi.get(url);
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

const updateBoard = () => {
  router.push({ name: "FreeBoardUpdate", params: { id, page } });
};

const isCommentEmpty = () => {
  if (board.value.commentList == null || board.value.commentList.length === 0) {
    return true;
  }
  return false;
};

const addComment = async () => {
  commentInfo.value.boardId = id;
  commentInfo.value.userId = JSON.parse(localStorage.getItem("auth")).user.id;
  await boardApi.post("/board/insert-comment", commentInfo.value);
  router.go(0);
};

const getCommentLength = () => {
  if (board.value.commentList == null || board.value.commentList.length === 0) {
    return 0;
  }
  return board.value.commentList.length;
};

const addLike = async () => {
  await boardApi.post("/board/like", {
    boardId: id,
    userId: JSON.parse(localStorage.getItem("auth")).user.id,
  });
  router.go(0);
};

const deleteLike = async () => {
  await boardApi.put("/board/like", {
    boardId: id,
    userId: JSON.parse(localStorage.getItem("auth")).user.id,
  });
  router.go(0);
};

const deleteComment = async (commentId, commentUserId) => {
  if (!confirm("정말 삭제하시겠습니까?")) return;
  await boardApi.put("/board/delete-comment", {
    id: commentId,
    userId: commentUserId,
  });
  router.go(0);
  alert("정상적으로 삭제되었습니다!");
};

const backPage = () => {
  router.push({ name: "FreeBoardList", params: { page } });
};
</script>

<template>
  <div class="notice-detail">
    <div class="notice-header">
      <div class="info">
        <div>
          <h3>제목 : {{ board.title }}</h3>
          <p>작성일 : {{ board.createTime }}</p>
        </div>
        <div>
          <p class="author">작성자 : {{ board.userId }}</p>
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
              <a> {{ board.totalView }} &#128064; views </a>
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
                >{{ board.totalLike }}
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
      <button class="btn-update" v-if="isSameId()" @click="updateBoard">
        수정
      </button>
      <button class="btn-delete" v-if="isSameId()" @click="deleteBoard">
        삭제
      </button>
    </div>

    <div class="notice-content">
      {{ board.content }}
    </div>

    <div class="like-actions">
      <div
        @click="addLike()"
        v-if="board.isLike == 0"
        style="font-size: 1.4rem; margin-top: 1vh"
      >
        <i class="fa-regular fa-heart" style="color: #ff1100"></i> likes
      </div>
      <div
        @click="deleteLike()"
        v-else-if="board.isLike == 1"
        style="font-size: 1.4rem; margin-top: 1vh"
      >
        <i class="fa-solid fa-heart" style="color: #ff0000"></i> likes
      </div>
    </div>
    <hr class="line" />

    <h3 class="startAnswer">댓글 ({{ getCommentLength() }})</h3>
    <div class="noAnswer" v-if="isCommentEmpty()">
      <h4>- 현재 달린 댓글이 없어용! 댓글을 달아보세용! -</h4>
    </div>
    <div class="comment-content" v-else>
      <div
        class="comment-part"
        v-for="comment in board.commentList"
        :key="board.id"
      >
        <div class="comment-text">
          <h4>{{ comment.userId }}</h4>
          <p>{{ comment.comment }}</p>
          <p class="comment-date">{{ comment.createTime }}</p>
          <hr
            class="comment-line"
            v-if="index < board.commentList.length - 1"
          />
        </div>
        <div class="comment-actions">
          <button
            class="btn-delete"
            v-if="isSameCommentId(comment.userId)"
            @click="deleteComment(comment.id, comment.userId)"
          >
            삭제
          </button>
        </div>
      </div>
    </div>

    <textarea
      name=""
      id=""
      v-model="commentInfo.comment"
      class="area"
    ></textarea>
    <div class="notice-actions">
      <button class="btn-update" @click="addComment()">댓글 등록</button>
    </div>
    <div class="like-actions">
      <button class="back-list" type="button" @click="backPage()">
        목록으로
      </button>
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

.createComment {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  margin-left: 2px;
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

.notice-actions .btn-update {
  background-color: #3498db;
  color: #fff;
  margin-bottom: 10px;
}

.notice-actions .btn-delete {
  background-color: #e74c3c;
  color: #fff;
  margin-bottom: 10px;
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

.like-actions .btn-update {
  background-color: #3498db;
  color: #fff;
  margin-top: 10px;
}

.like-actions .btn-delete {
  background-color: #e74c3c;
  color: #fff;
  margin-top: 10px;
}

.like-actions .back-list {
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
  font-size: 20px;
  color: #333;
  line-height: 1.6;
}

.comment-part {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment-actions .btn-delete {
  background-color: #e74c3c;
  color: #fff;
  margin-top: 10px;
}

.comment-actions button {
  padding: 10px 15px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
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
  margin-bottom: 10px;
}

.comment-date {
  margin-right: 20px;
  font-size: 14px;
}

.area {
  padding: 20px;
  margin-top: 20px;
  width: 760px;
  height: 100px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  line-height: 1.6;
  color: #333;
}

.line {
  margin-top: 30px;
  border: 1px solid gainsboro;
}

.comment-line {
  margin-top: 10px;
  margin-right: 15px;
  border: 1px solid gainsboro;
}

.startAnswer {
  margin-top: 30px;
}

.noAnswer {
  margin-bottom: 10px;
}
</style>
