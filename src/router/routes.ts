import { RouteRecordRaw } from "vue-router";

import reservation from "@/views/Useview.vue";
import equipment from "@/views/equip/equipment.vue";
import homeindex from "@/views/home/homeindex.vue";
import reserveroom from "@/views/room/reserveRoom.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "index",
    redirect: "/auth/login",
    component: () => import("@/layouts/manage.vue"),
    meta: { keepalive: false },
    children: [
      {
        path: "/main",
        name: "main",
        component: () => import("@/views/Main.vue"),
        meta: { keepalive: false },
      },
      {
        path: "/reservation",
        component: reservation,
      },
      {
        path: "/reserveroom",
        component: reserveroom,
      },
      {
        path: "/equipment",
        component: equipment,
      },
      {
        path: "/homepage",
        name: "homepage",
        component: () => import("@/views/mainpage/homepage.vue"),
      },
      {
        path: "/homeindex",
        component: homeindex,
      },
      {
        path: "/contact",
        component: () => import("@/views/contact/contactUs02.vue"),
      },
      {
        path: "/response",
        component: () => import("@/views/contact/response.vue"),
      },
      {
        path: "/add",
        component: () => import("@/views/managegoods/add.vue"),
      },
      {
        path: "/userlist",
        component: () => import("@/views/list/userlist.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    name: "404",
    component: () => import("@/views/Error404.vue"),
  },
  {
    path: "/testlnav",
    name: "testlnav",
    component: () => import("@/views/testlnav.vue"),
  },
  {
    path: "/try",
    name: "try",
    component: () => import("@/views/try.vue"),
  },
  {
    path: "/tabletest",
    name: "tabletest",
    component: () => import("@/views/tabulation/tabletest.vue"),
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("@/views/login/LoginPage.vue"),
    meta: { keepalive: false },
    children: [
      {
        path: "/auth/login",
        name: "login",
        component: () => import("@/views/login/Login.vue"),
        meta: { keepalive: false },
      },
      {
        path: "/auth/register",
        name: "register",
        component: () => import("@/views/login/Register.vue"),
        meta: { keepalive: false },
      },
    ],
  },
];

export default routes;
