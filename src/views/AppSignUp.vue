<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useAddressStore } from "@/stores/address";
const authStore = useAuthStore();
const router = useRouter();
const addressStore = useAddressStore();

const emailFirst = ref("");
const emailLast = ref("");
const jobText = ref("");
const emailCheckText = ref("");

const joinForm = ref({
  id: "",
  password: "",
  name: "",
  email: "",
  address: "",
  birth: "",
  point: 0,
  job: "",
  married: 0,
});
// const initEmail = () => {
//   addressStore.zoneCode = "";
//   addressStore.roadAddress = "";
// }
// initEmail();

const openPostCode = () => {
  new window.daum.Postcode({
    oncomplete: (data) => {
       addressStore.zoneCode = data.zonecode;
       addressStore.roadAddress = data.roadAddress;
    }
  }).open();
}

const join = async () => {
  if (!confirm("HOMEIS에 가입하시겠습니까?")) return;
  if (joinForm.value.id == "") {
    alert("아이디를 입력해주세요!");
    return;
  }
  else if (joinForm.value.password == "") {
    alert("비밀먼호를 입력해주세요!");
    return;
  }
  else if (joinForm.value.name == "") {
    alert("이름을 입력해주세요!");
    return;
  }
  else if (joinForm.value.birth == "") {
    alert("생일을 입력해주세요!");
    return;
  }
  else if (jobText.value == "" && joinForm.value.job == "") {
    alert("직업을 입력해주세요!");
    return;
  }
  else if (emailFirst.value == "" || (emailLast.value == "" && emailCheckText.value == "")) {
    alert("이메일을 입력해주세요!");
    return;
  }
  else if (addressStore.roadAddress == "") {
    alert("주소를 입력해주세요!");
    return;
  }
  try {
    joinForm.value.address = addressStore.roadAddress + " " + addressStore.detailAddress;
    joinForm.value.email = emailFirst.value + "@";
    
    if (jobText.value != '기타') {
      joinForm.value.job = jobText.value;
    }
    if (emailCheckText.value != 'free') {
      joinForm.value.email += emailCheckText.value;
    } else {
      joinForm.value.email += emailLast.value;
    }
    console.log(joinForm.value)
    await authStore.join(joinForm.value);
    router.replace("/");
    alert('회원가입을 축하해요~!!')
  } catch (error) {
    console.error("에러:", error);
    alert("가입에 실패하였습니다.");
  }
};

const testCon = () => {
  console.log(joinForm.value);
}
</script>

<template>
  <div id="regist-main">
    <h3>회원가입</h3>
    <form @submit.prevent="join">
      <label
        >* 아이디 <input type="text" v-model.trim="joinForm.id" required /></label
      >
      <br />

      <label
        >* 비밀번호 <input
          type="password"
          v-model.trim="joinForm.password"
          required
        /></label
      >
      <br />

      <label
        >* 이름 <input type="text" v-model.trim="joinForm.name" required /></label
      >
      <br />

      <label>
        * 생년월일 
        <input type="date" name="" id="" v-model="joinForm.birth">
      </label>

      <br />

      <label>
        * 직업
        <select name="" id="" v-model="jobText">
          <option value="" selected disabled>직업 선택</option>
          <option value="학생">학생</option>
          <option value="강사">강사</option>
          <option value="배우">배우</option>
          <option value="기타">기타</option>
        </select>
      </label>
      <input type="text" name="" id="" v-show="jobText == '기타'" v-model="joinForm.job">

      <br>

      <label>
        * 이메일
        <input type="text" v-model="emailFirst">
        @
        <input type="text" v-model="emailLast" v-show="emailCheckText == 'free'">
        <select name="" id="" v-model="emailCheckText" readonly>
          <option value="" selected disabled>이메일 선택</option>
          <option value="naver.com">naver.com</option>
          <option value="google.com">google.com</option>
          <option value="nate.com">nate.com</option>
          <option value="daum.net">daum.net</option>
          <option value="free">직접 입력</option>
        </select>
      </label>

      <br>

      <label>
        * 우편번호 
      <input type="text" placeholder="우편번호" @click="openPostCode" v-model="addressStore.zoneCode" readonly>
      </label>
      <br>

      <label>
        * 도로명 주소
        <input type="text" style="width: 350px;" @click="openPostCode" v-model="addressStore.roadAddress" placeholder="주소" readonly>
      </label>

      <br>

      <label>
        상세 주소
      <input type="text" style="width: 350px;" v-model="addressStore.detailAddress" placeholder="상세주소">
      </label>
      <button type="button"@click="testCon">출력</button>
      <br>

      <label>
        결혼 유무
        <input type="radio" name="marrid" value="0" v-model="joinForm.married"><label>무</label>
        <input type="radio" name="marrid" value="1" v-model="joinForm.married"><label>유</label>
      </label>

      <br>
      <input type="submit" value="가입" />
    </form>
  </div>
</template>

<style scoped>
#regist-main{
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
