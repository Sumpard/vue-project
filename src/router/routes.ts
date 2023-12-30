import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layouts/AppLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "/reservation",
        component: () => import("@/views/list/record.vue"),
      },
      {
        path: "/reserveroom",
        component: () => import("@/views/room/reserveRoom.vue"),
      },
      {
        path: "/equipment",
        component: () => import("@/views/equip/equipment.vue"),
      },
      {
        path: "/seat",
        component: () => import("@/views/seat/seat.vue"),
      },
      {
        path: "/homepage",
        name: "homepage",
        alias: "/",
        component: () => import("@/views/mainpage/homepage.vue"),
      },
      {
        //编写通知（管理员）
        path: "/editnotice",
        component: () => import("@/views/mainpage/editnotice.vue"),
      },
      {
        //通知列表（管理员）
        path: "/adminnoticelist",
        component: () => import("@/views/list/adminnoticelist.vue"),
      },
      {
        path: "/noticepreview",
        component: () => import("@/views/mainpage/noticepreview.vue"),
      },
      {
        path: "/noticemodify",
        component: () => import("@/views/mainpage/modifynotice.vue"),
      },
      {
        path: "/noticelist",
        component: () => import("@/views/mainpage/noticelist.vue"),
      },
      {
        path: "/homeindex",
        component: () => import("@/views/home/homeindex.vue"),
      },
      {
        path: "/questionsub",
        component: () => import("@/views/contact/contactUs02.vue"),
      },
      {
        path: "/questionlist",
        component: () => import("@/views/list/questionlist.vue"),
      },
      {
        path: "/goodlist",
        component: () => import("@/views/managegoods/goodlist.vue"),
        meta: { requiresAdmin: true },
      },
      {
        path: "/userlist",
        component: () => import("@/views/list/userlist.vue"),
        meta: { requiresAdmin: true },
      },
      {
        path: "/upload-image",
        component: () => import("@/views/fun/UploadImage.vue"),
      },
      {
        //问题反馈列表（管理员）
        path: "/feedbackQuestion",
        component: () => import("@/views/list/feedbackQuestion.vue"),
      },
      {
        path: "/review1",
        component: () => import("@/views/review/review_submitted.vue"),
        meta: { requiresAdmin: true },
      },
      {
        path: "/review2",
        component: () => import("@/views/review/review_accepted.vue"),
        meta: { requiresAdmin: true },
      },
      {
        path: "/review3",
        component: () => import("@/views/review/review_refused.vue"),
        meta: { requiresAdmin: true },
      },
    ],
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("@/views/login/LoginPage.vue"),
    children: [
      {
        path: "/auth/login",
        name: "login",
        component: () => import("@/views/login/Login.vue"),
      },
      {
        path: "/auth/register",
        name: "register",
        component: () => import("@/views/login/Register.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    name: "404",
    component: () => import("@/views/Error404.vue"),
  },
];

export default routes;
