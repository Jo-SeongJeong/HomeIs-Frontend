<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import boardApi from "@/api/boardApi";
const route = useRoute();
const id = route.params.id;
const qna = ref({});
const router = useRouter();
const user = JSON.parse(localStorage.getItem("auth")).user;

const getQna = async () => {
  if (user == null) {
    alert("당신에겐 권한이 없습니다.");
    router.replace("/");
    return;
  }
  const data = await boardApi.get("/qna/detail/" + user.id + "/" + id);
  qna.value = data.data;
  console.log("QNA = ", qna.value);
  if (user.job != "관리자" && user.id != qna.value.userId) {
    alert("당신에겐 권한이 없습니다.");
    router.replace("/");
    return;
  }
};
getQna();

const deleteQna = async () => {
  if (user == null || (user.job != "관리자" && user.id != qna.value.userId)) {
    alert("당신에겐 권한이 없습니다.");
    router.replace("/");
    return;
  }

  if (!confirm("정말 질문을 삭제하시겠습니까?")) return;
  await boardApi.put("/qna/delete", qna.value);

  router.replace({ name: "Notice" });
  alert("정상적으로 질문이 삭제되었습니다.");
};

const isAdmin = () => {
  if (
    user.job == "관리자" &&
    qna.value != null &&
    qna.value.qnaComment != null &&
    qna.value.qnaComment.length == 0
  )
    return true;
  return false;
};

const answer = ref({
  userId: "",
  qnaId: "",
  comment: "",
});

const registAnswer = async () => {
  answer.value.userId = user.id;
  answer.value.qnaId = qna.value.id;

  if (!confirm("정말 답변을 등록합니까? 수정 못합니다.")) return;
  await boardApi.post("/qna/insert-answer", answer.value);
  router.go(0);
  alert("답변 정상 등록");
};

const existAnswer = () => {
  if (
    qna.value == null ||
    qna.value.qnaComment == null ||
    qna.value.qnaComment.length == 0
  )
    return false;
  return true;
};
</script>

<template>
  <div class="notice-detail">
    <div class="notice-header">
      <h3>제목 : {{ qna.title }}</h3>
      <div class="info">
        <p>작성일 : {{ qna.createTime }}</p>
        <p>작성자 : {{ qna.userId }}</p>
      </div>
      <hr class="line" />
    </div>
    <div class="notice-actions">
      <button class="btn-delete" @click="deleteQna">삭제</button>
    </div>

    <div class="notice-content">
      {{ qna.content }}
    </div>
    <h3 class="startAnswer">답변</h3>
    <div v-if="existAnswer()">
      <div v-for="comment in qna.qnaComment" :key="qna.id">
        <p class="createComment">답변일 : {{ comment.createTime }}</p>
        <div class="comment-content">
          {{ comment.comment }}
        </div>
        <p class="toUser">- {{ comment.userId }} 올림 -</p>
      </div>
    </div>
    <div class="comment-content" v-else-if="!isAdmin()">
      관리자가 회원님을 위해 열심히 답변중이에요!
    </div>
    <div v-if="isAdmin()">
      <form @submit.prevent="registAnswer">
        <textarea
          name=""
          id=""
          class="area"
          v-model="answer.comment"
          placeholder="여기에 답변을 입력해주세요!"
        ></textarea>
        <div class="notice-actions">
          <button type="submit" class="btn-update">등록</button>
        </div>
      </form>
    </div>
    <hr class="line" />
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

.createComment {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  margin-left: 3px;
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
  margin-top: 10px;
}

.notice-actions .btn-delete {
  background-color: #e74c3c;
  color: #fff;
  margin-bottom: 10px;
}

.notice-content {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  font-size: 20px;
}

.comment-content {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  font-size: 20px;
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
  margin-top: 30px;
  /* border: 0; */
  border: 1px solid gainsboro;
}

.startAnswer {
  margin-top: 30px;
}
</style>
