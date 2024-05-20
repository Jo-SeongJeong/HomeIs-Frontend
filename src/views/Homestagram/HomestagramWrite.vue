<script setup>
import boardApi from "@/api/boardApi";
import { ref } from "vue";
import { useRouter } from "vue-router";
import homestaApi from "@/api/homestaApi";
import imageUpload from "../../components/homestagram/imageUpload.vue";
import "../../assets/styles/button.css";

const board = ref({
  userId: JSON.parse(localStorage.getItem("auth")).user.id,
  title: "",
  content: "",
});

const router = useRouter();

const tagName = ref("");
const tagFullValue = ref("");
const addTag = () => {
  if (tagName.value.trim() === "") {
    alert("태그를 입력하세요.");
    return;
  } else if (tagFullValue.value.length > 300) {
    alert("태그가 너무 많습니다 그만 입력하세요.");
    return;
  }
  tagName.value = tagName.value.replaceAll("#", "");
  const tagBox = document.getElementById("tag-box");
  const newTag = document.createElement("div");
  newTag.id = "tag";
  newTag.textContent = "#" + tagName.value;
  if (tagName.value.length <= 2) {
    newTag.style.background =
      "linear-gradient(90deg, rgba(2,0,36,0.5) 0%, rgba(131,131,241,0.5) 35%, rgba(0,212,255,0.5) 100%)";
  } else if (tagName.value.length === 3) {
    newTag.style.background =
      "linear-gradient(90deg, rgba(255,0,0,0.5) 0%, rgba(255,255,0,0.5) 50%, rgba(0,255,255,0.5) 100%)";
  } else if (tagName.value.length === 4) {
    newTag.style.background =
      "linear-gradient(90deg, rgba(255,0,255,0.5) 0%, rgba(0,255,0,0.5) 50%, rgba(0,0,255,0.5) 100%)";
  } else if (tagName.value.length === 5) {
    newTag.style.background =
      "linear-gradient(90deg, rgba(255,215,0,0.5) 0%, rgba(255,140,0,0.5) 50%, rgba(255,69,0,0.5) 100%)";
  } else if (tagName.value.length === 6) {
    newTag.style.background =
      "linear-gradient(90deg, rgba(138,43,226,0.5) 0%, rgba(218,112,214,0.5) 50%, rgba(255,105,180,0.5) 100%)";
  } else if (tagName.value.length === 7) {
    newTag.style.background =
      "linear-gradient(90deg, rgba(70,130,180,0.5) 0%, rgba(0,191,255,0.5) 50%, rgba(173,216,230,0.5) 100%)";
  } else if (tagName.value.length === 8) {
    newTag.style.background =
      "linear-gradient(90deg, rgba(0,250,154,0.5) 0%, rgba(50,205,50,0.5) 50%, rgba(34,139,34,0.5) 100%)";
  } else if (tagName.value.length === 9) {
    newTag.style.background =
      "linear-gradient(90deg, rgba(255,99,71,0.5) 0%, rgba(255,69,0,0.5) 50%, rgba(255,0,0,0.5) 100%)";
  } else if (tagName.value.length === 10) {
    newTag.style.background =
      "linear-gradient(90deg, rgba(32,178,170,0.5) 0%, rgba(95,158,160,0.5) 50%, rgba(176,224,230,0.5) 100%)";
  } else if (tagName.value.length === 11) {
    newTag.style.background =
      "linear-gradient(90deg, rgba(216,191,216,0.5) 0%, rgba(221,160,221,0.5) 50%, rgba(238,130,238,0.5) 100%)";
  } else if (tagName.value.length === 12) {
    newTag.style.background =
      "linear-gradient(90deg, rgba(255,160,122,0.5) 0%, rgba(250,128,114,0.5) 50%, rgba(255,69,0,0.5) 100%)";
  } else if (tagName.value.length === 13) {
    newTag.style.background =
      "linear-gradient(90deg, rgba(100,149,237,0.5) 0%, rgba(30,144,255,0.5) 50%, rgba(135,206,250,0.5) 100%)";
  } else if (tagName.value.length === 14) {
    newTag.style.background =
      "linear-gradient(90deg, rgba(152,251,152,0.5) 0%, rgba(0,255,127,0.5) 50%, rgba(0,100,0,0.5) 100%)";
  } else if (tagName.value.length === 15) {
    newTag.style.background =
      "linear-gradient(90deg, rgba(255,105,180,0.5) 0%, rgba(255,20,147,0.5) 50%, rgba(199,21,133,0.5) 100%)";
  }
  newTag.style.height = "1.6rem";
  newTag.style.borderRadius = "4px";
  newTag.style.marginRight = "1vw";
  newTag.style.display = "inline-block";
  tagBox.appendChild(newTag);

  tagFullValue.value += "#" + tagName.value;
  board.value.content = tagFullValue.value;
  tagName.value = "";
  console.log(tagFullValue.value);
};

const receivedFiles = ref([]);
const sendFileHandler = (files) => {
  receivedFiles.value = files;
  console.log("RECEIVED FILE = ", receivedFiles.value);
};

const registHomesta = async () => {
  if (!confirm("정말 등록하시겠습니까?")) return;

  const formData = new FormData();
  formData.append("userId", board.value.userId);
  formData.append("title", board.value.title);
  formData.append("content", board.value.content);
  for (const fileObj of receivedFiles.value) {
    formData.append(`upfile`, fileObj.file);
  }
  await boardApi.post("/homesta/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
</script>

<template>
  <div id="homesta-write-main">
    <form @submit.prevent="registHomesta()">
      <div id="write-left">
        <div id="image_container">
          <imageUpload @send-file="sendFileHandler"></imageUpload>
        </div>
      </div>
      <div id="write-right">
        <input
          type="text"
          name="title"
          id="title"
          v-model="board.title"
          dir="rtl"
          placeholder="제목을 입력하세요"
        />
        <div id="tag-box"></div>
        <div id="addTagBox">
          <input type="text" v-model="tagName" id="inputTag" dir="rtl" />
          <button @click.prevent="addTag" class="custom-btn btn-5">
            태그 추가
          </button>
        </div>
        <input
          type="submit"
          value="등록"
          class="custom-btn btn-7"
          id="submit"
        />
      </div>
    </form>
  </div>
</template>
<style scoped>
#homesta-write-main {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  form {
    margin: 100px;
    display: flex;
    flex-direction: row;
  }
  #write-left {
    margin-right: 3vw;
    border: 1px solid black;
    width: 40vw;
    height: 60vh;
  }
  #write-right {
    display: flex;
    flex-direction: column;
    width: 40vw;
    height: 60vh;
    #addTagBox {
      width: 100%;
      height: 8vh;
      button {
        width: 18%;
      }
      #inputTag {
        padding-right: 1vw;
        font-size: 1rem;
        width: 74%;
        height: 5vh;
        border: none;
        color: #222222;
        border-bottom: solid #aaaaaa 1px;
        background: none;
      }
      #inputTag::placeholder {
        color: #aaaaaa;
      }
      #inputTag:focus {
        outline: none;
      }
    }
  }
}
#submit {
  border-radius: 6px;
}
#tag-box {
  padding: 3vw;
  width: 100%;
  height: 40vh;
  font-size: 1.4rem;
}

#title {
  padding-right: 1vw;
  font-size: 1.5rem;
  width: 40vw;
  height: 8vh;
  border: none;
  color: #222222;
  border-bottom: solid #aaaaaa 1px;
  background: none;
}
#title::placeholder {
  color: #aaaaaa;
}
#title:focus {
  outline: none;
}
</style>
