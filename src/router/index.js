import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("@/views/AppMain.vue"),
      meta: { reload: true },
    },
    {
      path: "/board",
      component: () => import("@/views/Board/BoardView.vue"),
      beforeEnter: (to, from, next) => {
        const auth = JSON.parse(localStorage.getItem("auth"));
        if (auth.user == null) {
          alert('접근 권한이 없습니다.');
          next("/");
          return;
        }

        const path = to.fullPath;
        if (path.indexOf('free-board') != -1) {
          localStorage.setItem("headerTitle", JSON.stringify({title: '자유게시판'}));
        } else if (path.indexOf('notiace') != -1) {
          localStorage.setItem("headerTitle", JSON.stringify({title: '공지 및 문의'}));
        } else if (path.indexOf('homestagram') != -1) {
          localStorage.setItem("headerTitle", JSON.stringify({title: '홈스타그램'}));
        }
        next();
      },
      children: [
        {
          path: "free-board/:page",
          name: "FreeBoardList",
          beforeEnter: (to, from, next) => {
            localStorage.setItem("headerTitle", JSON.stringify({title: '자유게시판'}));
            next();
          },
          component: () => import("@/views/Board/FreeBoardList.vue"),
        },
        {
          path: "free-board/detail/:id/:page",
          name: "FreeBoardDetail",
          component: () => import("@/views/Board/FreeBoardDetail.vue"),
        },
        {
          path: "free-board/write",
          name: "FreeBoardWrite",
          component: () => import("@/views/Board/FreeBoardWrite.vue"),
        },
        {
          path: "notice",
          name: "Notice",
          beforeEnter: (to, from, next) => {
            localStorage.setItem("headerTitle", JSON.stringify({title: '공지 및 문의'}));
            next();
          },
          component: () => import("@/views/Notice/NoticeMainView.vue"),
        },
        {
          path: "notice/write",
          name: "NoticeWrite",
          component: () => import("@/views/Notice/NoticeWriteView.vue"),
        },
        {
          path: "notice/:id",
          name: "NoticeDetail",
          component: () => import("@/views/Notice/NoticeDetail.vue"),
        },
        {
          path: "notice/update/:id",
          name: "NoticeUpdate",
          component: () => import("@/views/Notice/NoticeUpdateView.vue"),
        },
        {
          path: "qna/write",
          name: "qna",
          component: () => import("@/views/Qna/QnaWriteView.vue"),
        },
        {
          path: "qna/:id",
          name: "QnaDetail",
          component: () => import("@/views/Qna/QnaDetail.vue"),
        },
        {
          path: "homestagram",
          name: "HomestagramView",
          beforeEnter: (to, from, next) => {
            localStorage.setItem("headerTitle", JSON.stringify({title: '홈스타그램'}));
            next();
          },
          component: () => import("@/views/Homestagram/HomestagramView.vue"),
        },
        {
          path: "homestagram/write",
          name: "HomestagramWrite",
          component: () => import("@/views/Homestagram/HomestagramWrite.vue"),
        },
      ],
    },
    {
      path: "/loan",
      name: "loan",
      beforeEnter: (to, from, next) => {
        const auth = JSON.parse(localStorage.getItem("auth"));
        if (auth.user == null) {
          alert('접근 권한이 없습니다.');
          next("/");
          return;
        }
        next();
      },
      component: () => import("@/views/Loan/AppLoan.vue"),
    },
    {
      path: "/interest-area",
      name: "interest-area",
      beforeEnter: (to, from, next) => {
        const auth = JSON.parse(localStorage.getItem("auth"));
        if (auth.user == null) {
          alert('접근 권한이 없습니다.');
          next("/");
          return;
        }
        next();
      },
      component: () => import("@/views/InterestArea/InterestAreaView.vue"),
    },
    {
      path: "/subscription",
      name: "subscription",
      beforeEnter: (to, from, next) => {
        const auth = JSON.parse(localStorage.getItem("auth"));
        if (auth.user == null) {
          alert('접근 권한이 없습니다.');
          next("/");
          return;
        }
        next();
      },
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
