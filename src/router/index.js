import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("@/views/AppMain.vue"),
    },
    {
      path: "/free-board",
      component: () => import("@/views/FreeBoard/FreeBoard.vue"),
      children: [
        {
          path: "",
          name: "FreeBoardList",
          component: () => import("@/views/FreeBoard/FreeBoardList.vue"),
        },
        {
          path: ":id",
          name: "FreeBoardDetail",
          component: () => import("@/views/FreeBoard/FreeBoardDetail.vue"),
        },
      ],
    },
    {
      path: "/loan",
      name: "loan",
      component: () => import("@/views/Loan/AppLoan.vue"),
    },
    {
      path: "/road-view",
      name: "road-view",
      component: () => import("@/views/Map/RoadView.vue"),
    },
    {
      path: "/interest-area",
      name: "interest-area",
      component: () => import("@/views/Map/InterestArea.vue"),
    },
    {
      path: "/subscription",
      name: "subscription",
      component: () => import("@/views/SubScription/AppSubScription.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/AppLogin.vue"),
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: () => import("@/views/AppSignUp.vue"),
    },
  ],
});

export default router;
