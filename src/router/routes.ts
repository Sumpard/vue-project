import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "index",
    component: () => import("@/layouts/AppLayout.vue"),
    meta: { requireAuth: true },
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
        path: "/homepage",
        name: "homepage",
        component: () => import("@/views/mainpage/homepage.vue"),
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
        component: () => import("@/views/contact/response.vue"),
      },
      {
        path: "/goodlist",
        component: () => import("@/views/managegoods/goodlist.vue"),
      },
      {
        path: "/userlist",
        component: () => import("@/views/list/userlist.vue"),
      },
      {
        path: "/upload-image",
        component: () => import("@/views/fun/UploadImage.vue"),
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
