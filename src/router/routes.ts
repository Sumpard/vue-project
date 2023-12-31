import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layouts/AppLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "homepage",
        name: "homepage",
        alias: "/",
        component: () => import("@/views/home/index.vue"),
      },
      {
        path: "notice",
        children: [
          {
            path: "list",
            component: () => import("@/views/contents/notice/notice-list.vue"),
          },
          {
            path: ":noticeId",
            props: true,
            component: () => import("@/views/contents/notice/notice-detail.vue"),
          },
        ],
      },
      {
        path: "user/home",
        name: "user-home",
        component: () => import("@/views/user/index.vue"),
      },
      {
        path: "reserve",
        children: [
          {
            path: "room",
            component: () => import("@/views/contents/reserve/reserve-room.vue"),
          },
          {
            path: "seat",
            component: () => import("@/views/contents/reserve/reserve-seat.vue"),
          },
          {
            path: "equipment",
            component: () => import("@/views/contents/reserve/reserve-equipment.vue"),
          },
          {
            path: "record",
            component: () => import("@/views/contents/reserve/reserve-record.vue"),
          },
        ],
      },
      {
        path: "feedback",
        children: [
          {
            path: "submit",
            component: () => import("@/views/contents/feedback/feedback-submit.vue"),
          },
          {
            path: "list",
            component: () => import("@/views/contents/feedback/feedback-list.vue"),
          },
        ],
      },
      {
        path: "admin",
        children: [
          {
            path: "users",
            component: () => import("@/views/admin/user/user-list.vue"),
          },
          {
            path: "entities",
            component: () => import("@/views/admin/entity/entity-list.vue"),
          },
          {
            path: "notice",
            children: [
              {
                path: "create",
                component: () => import("@/views/admin/notice/notice-create.vue"),
              },
              {
                path: "edit",
                component: () => import("@/views/admin/notice/notice-edit.vue"),
              },
              {
                path: "list",
                component: () => import("@/views/admin/notice/notice-list.vue"),
              },
            ],
          },
          {
            path: "review",
            children: [
              {
                path: "submitted",
                component: () => import("@/views/admin/review/review-submitted.vue"),
              },
              {
                path: "accepted",
                component: () => import("@/views/admin/review/review-accepted.vue"),
              },
              {
                path: "refused",
                component: () => import("@/views/admin/review/review-refused.vue"),
              },
            ],
          },
          {
            path: "feedback",
            children: [
              {
                path: "list",
                component: () => import("@/views/admin/feedback/feedback-list.vue"),
              },
            ],
          },
        ],
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
