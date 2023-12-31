import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layouts/AppLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "/reserve/record",
        component: () => import("@/views/contents/reserve/reserve-record.vue"),
      },
      {
        path: "/reserve/room",
        component: () => import("@/views/contents/reserve/reserve-room.vue"),
      },
      {
        path: "/reserve/equipment",
        component: () => import("@/views/contents/reserve/reserve-equipment.vue"),
      },
      {
        path: "/reserve/seat",
        component: () => import("@/views/contents/reserve/reserve-seat.vue"),
      },
      {
        path: "/homepage",
        name: "homepage",
        alias: "/",
        component: () => import("@/views/home/index.vue"),
      },
      {
        path: "/admin/notice/create",
        component: () => import("@/views/admin/notice/notice-create.vue"),
      },
      {
        path: "/admin/notice/list",
        component: () => import("@/views/admin/notice/notice-list.vue"),
      },
      {
        path: "/notice",
        component: () => import("@/views/contents/notice/notice-detail.vue"),
      },
      {
        path: "/admin/notice/edit",
        component: () => import("@/views/admin/notice/notice-edit.vue"),
      },
      {
        path: "/notice/list",
        component: () => import("@/views/contents/notice/notice-list.vue"),
      },
      {
        path: "/user/home",
        name: "user-home",
        component: () => import("@/views/user/index.vue"),
      },
      {
        path: "/feedback/submit",
        component: () => import("@/views/contents/feedback/feedback-submit.vue"),
      },
      {
        path: "/feedback/list",
        component: () => import("@/views/contents/feedback/feedback-list.vue"),
      },
      {
        path: "/admin/entities",
        component: () => import("@/views/admin/entity/entity-list.vue"),
        meta: { requiresAdmin: true },
      },
      {
        path: "/admin/users",
        component: () => import("@/views/admin/user/user-list.vue"),
        meta: { requiresAdmin: true },
      },
      {
        path: "/upload-image",
        component: () => import("@/views/fun/UploadImage.vue"),
      },
      {
        path: "/admin/feedback/list",
        component: () => import("@/views/admin/feedback/feedback-list.vue"),
      },
      {
        path: "/admin/review/submitted",
        component: () => import("@/views/admin/review/review-submitted.vue"),
        meta: { requiresAdmin: true },
      },
      {
        path: "/admin/review/accepted",
        component: () => import("@/views/admin/review/review-accepted.vue"),
        meta: { requiresAdmin: true },
      },
      {
        path: "/admin/review/refused",
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
