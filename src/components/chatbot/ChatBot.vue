<script setup>
import { ref } from "vue";
import boardApi from "@/api/boardApi";

// 상태 정의
const userInput = ref("");
const messages = ref([]);

console.log(messages);

// 채팅박스와 모달 상태
const isChatBoxVisible = ref(false);
const isModalVisible = ref(false);

// 채팅박스와 모달 토글 함수
const toggleChatBox = () => {
  isChatBoxVisible.value = !isChatBoxVisible.value;
};

const toggleModal = () => {
  isModalVisible.value = !isModalVisible.value;
};

// 메시지 추가 함수
const addMessage = (text, type) => {
  const id = Date.now().toString(); // 메시지 ID 생성
  messages.value.unshift({ id, text, type });
  return id; // 메시지 ID 반환
};

const updateMessage = (messageId, newText) => {
  const message = messages.value.find((msg) => msg.id === messageId);
  if (message) {
    message.text = newText;
  }
};

// API로부터 답변 받아오는 함수
const fetchReply = async (inputText) => {
  try {
    const response = await boardApi.post("/prompt", {
      messages: [
        {
          content: inputText,
        },
      ],
    });
    const reply = response.data; // API 응답에서 답변을 추출합니다.
    return reply;
  } catch (error) {
    console.error("Error fetching reply:", error);
    addMessage(
      "답변을 가져오는 중 오류가 발생했습니다.",
      "chat-box-body-receive"
    );
  }
};

// 사용자 메시지 보내기 함수
const sendMessage = async () => {
  if (userInput.value.trim() !== "") {
    const userMessage = userInput.value;
    userInput.value = ""; // 입력창 초기화

    // 사용자 메시지 추가
    addMessage(userMessage, "chat-box-body-send");

    // '답변 생성 중...' 메시지 추가
    const loadingMessageId = addMessage(
      "답변 생성 중...",
      "chat-box-body-receive"
    );

    // 실제 답변 가져오기
    const reply = await fetchReply(userMessage);

    // '답변 생성 중...' 메시지를 실제 답변으로 교체
    updateMessage(loadingMessageId, reply);
  }
};
</script>

<template>
  <div>
    <div v-if="isChatBoxVisible" class="chat-box">
      <div class="chat-box-header">
        <h3>Boomy에게 무엇이든 물어보세요!</h3>
        <p @click="toggleChatBox"><i class="fa fa-times"></i></p>
      </div>
      <div class="chat-box-body">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="message.type"
        >
          <p v-html="message.text"></p>
        </div>
      </div>
      <div class="chat-box-footer">
        <button @click="toggleModal"><i class="fa fa-plus"></i></button>
        <input
          v-model="userInput"
          placeholder="Enter Your Message"
          type="text"
          @keyup.enter="sendMessage"
        />
        <i class="send far fa-paper-plane" @click="sendMessage"></i>
      </div>
    </div>
    <div v-else class="chat-button" @click="toggleChatBox"><span></span></div>

    <div v-if="isModalVisible" class="modal">
      <div class="modal-content">
        <span class="modal-close-button" @click="toggleModal">&times;</span>
        <h1>Add What you want here.</h1>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-box {
  height: 90%;
  width: 400px;
  margin: 0 auto;
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  z-index: 15;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.005);
  right: 0;
  bottom: 0;
  margin: 15px;
  background: #fff;
  border-radius: 15px;
}
.chat-box-header {
  background-color: rgb(88, 153, 214);
  height: 40px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  padding: 0.5em 0;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2), 0 -1px 10px rgba(172, 54, 195, 0.3),
    0 1px 10px rgba(0, 0, 0, 0.025);
}
.chat-box-header h3 {
  font-weight: 400;
  float: left;
  position: absolute;
  left: 25%;
}
.chat-box-header p {
  float: right;
  position: absolute;
  right: 16px;
  cursor: pointer;
  width: 50px;
  text-align: center;
  line-height: 2;
  margin: 0;
}
.chat-box-body {
  height: 500px;
  background-color: white;
  overflow-y: scroll;
  padding: 12px;
  display: flex;
  flex-direction: column-reverse;
}
.chat-box-body-send {
  width: 250px;
  margin-bottom: 0;
  margin-left: auto;
  background-color: #e9e9ea;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.015);
  margin-bottom: 14px;
}
.chat-box-body-send p {
  margin: 0;
  color: #444;
  font-size: 14px;
  margin-bottom: 0.25rem;
}
.chat-box-body-send span {
  float: right;
  color: #777;
  font-size: 10px;
}
.chat-box-body-receive {
  width: 250px;
  margin-bottom: 0;
  margin-right: auto;
  background-color: #e9e9ea;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.015);
  margin-bottom: 14px;
}
.chat-box-body-receive p {
  margin: 0;
  color: #444;
  font-size: 14px;
  margin-bottom: 0.25rem;
}
.chat-box-body-receive span {
  float: right;
  color: #777;
  font-size: 10px;
}
.chat-box-body::-webkit-scrollbar {
  width: 5px;
  opacity: 0;
}
.chat-box-footer {
  position: relative;
  display: flex;
  background-color: rgb(88, 153, 214);
}
.chat-box-footer button {
  border: none;
  padding: 16px;
  font-size: 14px;
  cursor: pointer;
  background-color: rgb(88, 153, 214);
  display: flex;
  justify-content: center;
  align-items: center;
}
.chat-box-footer button:focus {
  outline: none;
}
.chat-box-footer input {
  padding: 10px;
  border: none;
  border-radius: 50px;
  background: white;
  margin: 10px;
  font-weight: 600;
  color: #444;
  width: 280px;
}
.chat-box-footer input:focus {
  outline: none;
}
.chat-box-footer .send {
  transform: translate(0px, 20px);
  cursor: pointer;
  margin-left: 10px;
}
.chat-button {
  padding: 25px 16px;
  background-color: rgb(88, 153, 214);
  width: 120px;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 15px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-left-radius: 25px;
  box-shadow: 0 2px 15px rgba(88, 153, 214, 0.21);
  cursor: pointer;
}
.chat-button span::before {
  content: "";
  height: 15px;
  width: 15px;
  background: #47cf73;
  position: absolute;
  transform: translate(0, -7px);
  border-radius: 15px;
}
.chat-button span::after {
  content: "Boomy";
  font-size: 14px;
  color: white;
  position: absolute;
  left: 50px;
  top: 18px;
}
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transform: scale(1.1);
  transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
}
.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 1rem 1.5rem;
  width: 24rem;
  border-radius: 0.5rem;
}
.modal-close-button {
  float: right;
  width: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  cursor: pointer;
  border-radius: 0.25rem;
  background-color: lightgray;
}
.modal-close-button:hover {
  background-color: darkgray;
}
.show-modal {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
  transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
  z-index: 30;
}
</style>
