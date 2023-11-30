import { RouteRecordRaw } from "vue-router";
import reservation from '@/views/Useview.vue'
import reserveroom from '@/views/room/reserveRoom.vue'
import contactus from '@/views/contact/contactUs.vue'
import mainpage from '@/views/mainpage/imageShow.vue'
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "index",
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
        path:"/mainpage",
        name:"mainpage",
        component:mainpage
      },
      {path:'/reservation',
        component:reservation
      },
      {path:'/reserveroom',
        component:reserveroom
    },
      {
        path:'/contact',
        component:contactus
      }
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
