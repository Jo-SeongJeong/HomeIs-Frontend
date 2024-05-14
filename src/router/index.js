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
      path: "/board",
      component: () => import("@/views/Board/BoardView.vue"),
      children: [
        {
          path: "",
          name: "FreeBoardList",
          component: () => import("@/views/Board/FreeBoardList.vue"),
        },
        {
          path: ":id",
          name: "FreeBoardDetail",
          component: () => import("@/views/Board/FreeBoardDetail.vue"),
        },
        {
          path: "/notice",
          name: "notice",
          component: () => import("@/views/Notice/NoticeMainView.vue"),
        },
      ],
    },
    {
      path: "/free-board/write",
      name: "FreeBoardWrite",
      component: () => import("@/views/Board/FreeBoardWrite.vue"),
    },
    {
      path: "/loan",
      name: "loan",
      component: () => import("@/views/Loan/AppLoan.vue"),
    },

    
    {
      path: "/interest-area",
      name: "interest-area",
      component: () => import("@/views/InterestArea/InterestAreaView.vue"),
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
    {
      path: "/map",
      name: "map",
      component: () => import("@/views/Map/MapView.vue"),
    },
  ],
});

export default router;
