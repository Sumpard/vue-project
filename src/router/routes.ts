import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layouts/AppLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "/reservation",
        component: () => import("@/views/contents/reserve/reserve-record.vue"),
      },
      {
        path: "/reserveroom",
        component: () => import("@/views/contents/reserve/reserve-room.vue"),
      },
      {
        path: "/equipment",
        component: () => import("@/views/contents/reserve/reserve-equipment.vue"),
      },
      {
        path: "/seat",
        component: () => import("@/views/contents/reserve/reserve-seat.vue"),
      },
      {
        path: "/homepage",
        name: "homepage",
        alias: "/",
        component: () => import("@/views/home/index.vue"),
      },
      {
        //编写通知（管理员）
        path: "/editnotice",
        component: () => import("@/views/admin/notice/notice-create.vue"),
      },
      {
        //通知列表（管理员）
        path: "/adminnoticelist",
        component: () => import("@/views/admin/notice/notice-list.vue"),
      },
      {
        path: "/noticepreview",
        component: () => import("@/views/contents/notice/notice-detail.vue"),
      },
      {
        path: "/noticemodify",
        component: () => import("@/views/admin/notice/notice-edit.vue"),
      },
      {
        path: "/noticelist",
        component: () => import("@/views/contents/notice/notice-list.vue"),
      },
      {
        path: "/homeindex",
        component: () => import("@/views/user/index.vue"),
      },
      {
        path: "/questionsub",
        component: () => import("@/views/contents/feedback/feedback-submit.vue"),
      },
      {
        path: "/questionlist",
        component: () => import("@/views/contents/feedback/feedback-list.vue"),
      },
      {
        path: "/goodlist",
        component: () => import("@/views/admin/entity/entity-list.vue"),
        meta: { requiresAdmin: true },
      },
      {
        path: "/userlist",
        component: () => import("@/views/admin/user/user-list.vue"),
        meta: { requiresAdmin: true },
      },
      {
        path: "/upload-image",
        component: () => import("@/views/fun/UploadImage.vue"),
      },
      {
        //问题反馈列表（管理员）
        path: "/feedbackQuestion",
        component: () => import("@/views/admin/feedback/feedback-list.vue"),
      },
      {
        path: "/review1",
        component: () => import("@/views/admin/review/review-submitted.vue"),
        meta: { requiresAdmin: true },
      },
      {
        path: "/review2",
        component: () => import("@/views/admin/review/review-accepted.vue"),
        meta: { requiresAdmin: true },
      },
      {
        path: "/review3",
        component: () => import("@/views/admin/review/review-refused.vue"),
        meta: { requiresAdmin: true },
      },
    ],
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("@/views/login/index.vue"),
    children: [
      {
        path: "/auth/login",
        name: "login",
        component: () => import("@/views/login/login.vue"),
      },
      {
        path: "/auth/register",
        name: "register",
        component: () => import("@/views/login/register.vue"),
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
