<script setup>
import Header from "./components/Header.vue";
import ChatBot from "./components/chatbot/ChatBot.vue";
import { useAuthStore } from "./stores/auth";

const authStore = useAuthStore();

const isLogin = () => {
  const token = authStore.token;
  if (token == null) {
    return false;
  }
  return true;
};
</script>

<template>
  <Header />
  <div>
    <router-view />
  </div>
  <ChatBot class="chat" :class="{ active: !isLogin() }" />
</template>

<style scoped>
body {
  overflow-x: hidden;
}
.chat {
  position: fixed;
  bottom: 1vh;
  right: 0.1vw;
  z-index: 1000;
}

.active {
  display: none;
}
</style>
