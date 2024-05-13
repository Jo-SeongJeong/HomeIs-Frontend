import { createRouter, createWebHistory } from "vue-router";

import AppMain from "@/views/AppMain.vue";
import AppFreeBoard from "@/views/AppFreeBoard.vue";
import AppLoan from "@/views/AppLoan.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: AppMain,
    },
    {
      path: "/free",
      name: "free",
      component: AppFreeBoard,
    },
    {
      path: "/loan",
      name: "loan",
      component: AppLoan,
    },
  ],
});

export default router;
