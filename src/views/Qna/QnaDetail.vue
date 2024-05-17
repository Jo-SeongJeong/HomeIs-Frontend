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
  <div>
    <div>질문 작성자 :{{ qna.userId }}</div>
    <button @click="deleteQna">삭제</button>
    <div>질문 제목 : {{ qna.title }}</div>
    <div>질문 내용 : {{ qna.content }}</div>

    <hr />
    <br />
    <h3>답변</h3>
    <hr />
    <div v-if="existAnswer()">
      <div v-for="comment in qna.qnaComment" :key="qna.id">
        <div>답변 : {{ comment.comment }}</div>
        <div>답변자 : {{ comment.userId }}</div>
      </div>
    </div>
    <div v-else-if="!isAdmin()">잠시만요~! 곧 답변이 달릴거에용!!</div>
    <div v-if="isAdmin()">
      <div>답변 등록 :</div>

      <form @submit.prevent="registAnswer">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          v-model="answer.comment"
        ></textarea>
        <input type="submit" value="답변등록" />
      </form>
    </div>
  </div>
</template>

<style scoped></style>
