<script setup></script>

<template>
  <div
    style="display: flex; align-items: flex-end; border-bottom: 1px solid black"
  >
    <ul class="leftUl">
      <li>
        <img src="../assets/img/logo.png" alt="logo" style="width: 100px" />
      </li>
      <li><router-link to="/free-board">커뮤니티</router-link></li>
      <li><router-link to="/subscription">주택 청약</router-link></li>
      <li><router-link to="/loan">대출 상품</router-link></li>
      <li><router-link to="/road-view">로드 뷰</router-link></li>
      <li><router-link to="/interest-area">관심 지역</router-link></li>
    </ul>

    <ul class="rightUl">
      <li><router-link to="/login">로그인</router-link></li>
      <li><router-link to="/sign-up">회원가입</router-link></li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  align-self: center;
}

.leftUl {
  display: flex;
}

.rightUl {
  display: flex;
}
</style>
