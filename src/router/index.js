import { createRouter, createWebHistory } from "vue-router";

import AppMain from "@/views/AppMain.vue";
import AppLoan from "@/views/AppLoan.vue";
import AppRoadView from "@/views/AppRoadView.vue";
import AppInterestArea from "@/views/AppInterestArea.vue";
import AppSubScription from "@/views/AppSubScription.vue";
import AppLogin from "@/views/AppLogin.vue";
import AppSignUp from "@/views/AppSignUp.vue";
import FreeBoard from "@/views/FreeBoard/FreeBoard.vue";
import FreeBoardList from "@/views/FreeBoard/FreeBoardList.vue";
import FreeBoardDetail from "@/views/FreeBoard/FreeBoardDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: AppMain,
    },
    {
      path: "/free-board",
      component: FreeBoard,
      children: [
        {
          path: "",
          name: "FreeBoardList",
          component: FreeBoardList,
        },
        {
          path: ":id",
          name: "FreeBoardDetail",
          component: FreeBoardDetail,
        },
      ],
    },
    {
      path: "/loan",
      name: "loan",
      component: AppLoan,
    },
    {
      path: "/road-view",
      name: "road-view",
      component: AppRoadView,
    },
    {
      path: "/interest-area",
      name: "interest-area",
      component: AppInterestArea,
    },
    {
      path: "/subscription",
      name: "subscription",
      component: AppSubScription,
    },
    {
      path: "/login",
      name: "login",
      component: AppLogin,
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: AppSignUp,
    },
  ],
});

export default router;
