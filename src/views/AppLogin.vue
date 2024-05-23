<template>
  <div id="login-main">
    <div class="container">
      <!-- Sign Up -->
      <div class="container__form container--signup">
        <form
          @submit.prevent="join"
          class="form"
          id="form1"
          style="margin-top: 5vh"
        >
          <form class="exist" @submit.prevent="isExist">
            <input
              type="text"
              placeholder="ID"
              class="id-input"
              v-model.trim="joinForm.id"
              required
            />
            <button type="submit" class="btn-id">중복확인</button>
          </form>
          <input
            type="password"
            placeholder="Password"
            class="input"
            v-model.trim="joinForm.password"
            required
            :disabled="!isActive"
          />
          <input
            type="text"
            placeholder="Name"
            class="input"
            v-model.trim="joinForm.name"
            required
            :disabled="!isActive"
          />
          <input
            type="date"
            class="input"
            v-model="joinForm.birth"
            required
            :disabled="!isActive"
          />
          <select
            name=""
            id=""
            v-model="jobText"
            class="input"
            :disabled="!isActive"
          >
            <option value="" selected disabled>직업 선택</option>
            <option value="학생">학생</option>
            <option value="배우">회사원</option>
            <option value="배우">사업자</option>
            <option value="강사">강사</option>
            <option value="배우">배우</option>
            <option value="기타">기타</option>
          </select>
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 1vh;
              width: 100%;
            "
          >
            <input
              type="text"
              v-model="emailFirst"
              :disabled="!isActive"
              class="input"
              style="width: 100%"
            />
            @
            <input
              type="text"
              v-model="emailLast"
              v-show="emailCheckText == 'free'"
              :disabled="!isActive"
              class="input"
              style="width: 100%"
            />
            <select
              name="email"
              id="email"
              class="input"
              v-model="emailCheckText"
              :disabled="!isActive"
              readonly
            >
              <option value="" selected disabled>이메일 선택</option>
              <option value="naver.com">naver.com</option>
              <option value="google.com">google.com</option>
              <option value="nate.com">nate.com</option>
              <option value="daum.net">daum.net</option>
              <option value="free">직접 입력</option>
            </select>
          </div>
          <div style="display: flex; gap: 1vh; width: 100%">
            <input
              type="text"
              placeholder="우편번호"
              class="input"
              @click="openPostCode"
              v-model="addressStore.zoneCode"
              readonly
              style="width: 20%; text-align: center"
              required
            />
            <input
              type="text"
              style="width: 80%"
              @click="openPostCode"
              v-model="addressStore.roadAddress"
              class="input"
              placeholder="주소"
              readonly
              required
              :disabled="!isActive"
            />
          </div>
          <input
            type="text"
            class="input"
            v-model="addressStore.detailAddress"
            placeholder="상세주소"
            required
            :disabled="!isActive"
          />
          <select
            class="input"
            v-model="joinForm.married"
            readonly
            required
            :disabled="!isActive"
          >
            <option value="" selected disabled>결혼 여부</option>
            <option value="1">기혼</option>
            <option value="0">미혼</option>
          </select>

          <button
            type="submit"
            class="btn"
            style="font-size: 1rem; margin-top: 1vh"
          >
            회원가입
          </button>
        </form>
      </div>

      <!-- Sign In -->
      <div class="container__form container--signin">
        <form @submit.prevent="login" class="form" id="form2">
          <div id="login-logo"></div>
          <input
            placeholder="ID"
            type="text"
            v-model.trim="loginForm.id"
            required
            class="input"
          />
          <input
            placeholder="Password"
            type="password"
            v-model.trim="loginForm.password"
            required
            class="input"
          />
          <button type="submit" class="btn" style="font-size: 1rem">
            로그인
          </button>
        </form>
      </div>

      <!-- Overlay -->
      <div class="container__overlay">
        <div class="overlay">
          <div class="overlay__panel overlay--left">
            <button class="btn" @click="showSignIn" style="font-size: 1rem">
              로그인
            </button>
          </div>
          <div class="overlay__panel overlay--right">
            <button class="btn" @click="showSignUp" style="font-size: 1rem">
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

// 아래는 회원가입
import { useAddressStore } from "@/stores/address";
import axios from "axios";
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
  married: "",
});

const openPostCode = () => {
  new window.daum.Postcode({
    oncomplete: (data) => {
      addressStore.zoneCode = data.zonecode;
      addressStore.roadAddress = data.roadAddress;
    },
  }).open();
};

const isActive = ref(false);

const isExist = async () => {
  try {
    await axios.get("http://localhost/homeis/user/exist/" + joinForm.value.id);
    isActive.value = true;
  } catch (error) {
    alert("id가 중복되었습니다");
    isActive.value = false;
  }
  console.log(isActive.value);
};

const join = async () => {
  if (!confirm("HOMEIS에 가입하시겠습니까?")) return;
  if (joinForm.value.id == "") {
    alert("아이디를 입력해주세요!");
    return;
  } else if (joinForm.value.password == "") {
    alert("비밀먼호를 입력해주세요!");
    return;
  } else if (joinForm.value.name == "") {
    alert("이름을 입력해주세요!");
    return;
  } else if (joinForm.value.birth == "") {
    alert("생일을 입력해주세요!");
    return;
  } else if (jobText.value == "" && joinForm.value.job == "") {
    alert("직업을 입력해주세요!");
    return;
  } else if (
    emailFirst.value == "" ||
    (emailLast.value == "" && emailCheckText.value == "")
  ) {
    alert("이메일을 입력해주세요!");
    return;
  } else if (addressStore.roadAddress == "") {
    alert("주소를 입력해주세요!");
    return;
  }
  try {
    joinForm.value.address =
      addressStore.roadAddress + " " + addressStore.detailAddress;
    joinForm.value.email = emailFirst.value + "@";

    if (jobText.value != "기타") {
      joinForm.value.job = jobText.value;
    }
    if (emailCheckText.value != "free") {
      joinForm.value.email += emailCheckText.value;
    } else {
      joinForm.value.email += emailLast.value;
    }
    console.log(joinForm.value);
    await authStore.join(joinForm.value);
    router.replace("/");
    alert("회원가입을 축하해요~!!");
  } catch (error) {
    console.error("에러:", error);
    alert("가입에 실패하였습니다.");
  }
};

const testCon = () => {
  console.log(joinForm.value);
};

// 아래는 로그인
const authStore = useAuthStore();
const router = useRouter();

const loginForm = ref({
  id: "",
  password: "",
});

const login = async () => {
  try {
    await authStore.login(loginForm.value);
    router.push({ path: "/" });
  } catch (error) {
    console.error("에러:", error);
    alert("로그인에 실패하였습니다!");
  }
};

const showSignIn = () => {
  document.querySelector(".container").classList.remove("right-panel-active");
};

const showSignUp = () => {
  document.querySelector(".container").classList.add("right-panel-active");
};
</script>

<style scoped>
#login-logo {
  width: 10vw;
  height: 10vh;
  background-size: contain;
  background-image: url("../assets/img/logo-size-s.png");
  background-repeat: no-repeat;
}

#login-main {
  width: 100vw;
  height: 100vh;
  background-color: #0367a6;
  display: flex;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)),
    url("../assets/img/hk.jpg");
  background-size: 100% 100%;
  align-items: center;
}

.form__title {
  font-weight: 300;
  margin: 0;
  margin-bottom: 1.25rem;
}

.link {
  color: var(--gray);
  font-size: 0.9rem;
  margin: 1.5rem 0;
  text-decoration: none;
}

.container {
  background-color: white;
  border: none;
  border-radius: 20px;
  box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
    0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
  height: var(--max-height);
  max-width: var(--max-width);
  overflow: hidden;
  position: relative;
  width: 80%;
  height: 80%;
}

.container__form {
  height: 100%;
  position: absolute;
  top: 0;
  transition: all 0.6s ease-in-out;
}

.container--signin {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .container--signin {
  transform: translateX(100%);
}

.container--signup {
  left: 0;
  opacity: 0;
  width: 50%;
  z-index: 1;
}

.container.right-panel-active .container--signup {
  animation: show 0.6s;
  opacity: 1;
  transform: translateX(100%);
  z-index: 5;
}

.container__overlay {
  height: 100%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 0;
  transition: transform 0.6s ease-in-out;
  width: 50%;
  z-index: 100;
}

.container.right-panel-active .container__overlay {
  transform: translateX(-100%);
}

.overlay {
  background-color: lightblue;
  background: url("../assets/img/hk.jpg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  left: -100%;
  position: relative;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 200%;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay__panel {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: absolute;
  text-align: center;
  top: 0;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 50%;
}

.container.right-panel-active .overlay--left {
  transform: translateX(0);
}

.overlay--right {
  right: 0;
  transform: translateX(0);
}

.btn {
  background-color: #0367a6;
  background-image: linear-gradient(90deg, #0367a6 0%, #008997 74%);
  border-radius: 20px;
  border: 1px solid #0367a6;
  color: white;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: 0.1rem;
  padding: 0.9rem 4rem;
}

.form > .btn {
  margin-top: 1.5rem;
}

.btn:active {
  transform: scale(0.95);
}

.btn:focus {
  outline: none;
}

.form {
  background-color: #e9e9e9;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 3rem;
  height: 100%;
  text-align: center;
}

.input {
  background-color: #fff;
  border: none;
  padding: 0.9rem 0.9rem;
  margin: 0.5rem 0;
  width: 100%;
}

#form1 {
  padding-bottom: 50px;
}

.exist {
  display: flex;
  gap: 20px;
}

.id-input {
  background-color: #fff;
  border: none;
  padding: 0.9rem 0.9rem;
  margin: 0.5rem 0;
  width: 80%;
}

.btn-id {
  background-color: #0367a6;
  background-image: linear-gradient(90deg, #0367a6 0%, #008997 74%);
  border-radius: 20px;
  border: 1px solid #0367a6;
  color: white;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: 0.1rem;
  width: 100px;
  height: 40px;
  margin-top: 0.5rem;
}

.form > .btn-id {
  margin-top: 1.5rem;
}

.btn-id:active {
  transform: scale(0.95);
}

.btn-id:focus {
  outline: none;
}
</style>
