import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { useKakao } from "vue3-kakao-maps/@utils";
import "./assets/styles/global.css";

useKakao("e4e091435b2102c8e28e00b113bcbf06");
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
