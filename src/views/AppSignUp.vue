<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const router = useRouter();

const joinForm = ref({
  id: "",
  password: "",
  name: "",
  email: "test@naver.com",
  address: "부천",
  birth: "1999-09-05",
  point: 0,
  job: "싸피생",
  married: 0,
});

const join = async () => {
  if (!confirm("HOMEIS에 가입하시겠습니까?")) return;
  try {
    await authStore.join(joinForm.value);
    router.replace("/");
  } catch (error) {
    console.error("에러:", error);
    alert("가입에 실패하였습니다.");
  }
};
</script>

<template>
  <div>
    <h3>회원가입</h3>
    <h3>회원가입</h3>
    <h3>회원가입</h3>
    <h3>회원가입</h3>
    <h3>회원가입</h3>
    <h3>회원가입</h3>
    <h3>회원가입</h3>
    <form @submit.prevent="join">
      <label
        ><input type="text" v-model.trim="joinForm.id" required />아이디</label
      >
      <br />
      <label
        ><input
          type="password"
          v-model.trim="joinForm.password"
          required
        />비밀번호</label
      >
      <br />
      <label
        ><input type="text" v-model.trim="joinForm.name" required />이름</label
      >
      <br />
      <input type="submit" value="가입" />
    </form>
  </div>
</template>

<style scoped></style>
