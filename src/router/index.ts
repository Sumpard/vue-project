import { AxiosError } from "axios";
import { ElMessage } from "element-plus";
import { RouteRecordRaw, Router, createRouter, createWebHistory } from "vue-router";

import { verifyToken } from "@/api/login";
import { useUserStore } from "@/stores/user";

import routes from "./routes";

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  console.log("beforeEach", from, to, to.meta);
  if (to.meta.requiresAuth) {
    const userStore = useUserStore();
    if (userStore.user && userStore.token) {
      try {
        await verifyToken(userStore.token);
        next();
      } catch (e) {
        const err = e as AxiosError;
        console.log(e);
        if (err.response?.status == 400) {
          next({ name: "404" }); // Pretend that the page is not existent
        } else {
          ElMessage.error("登录状态过期，请重新登录！");
          next({ name: "login", query: { redirect: to.fullPath } }); // Need login
        }
      }
    } else {
      ElMessage.error("未登录！");
      next({ name: "login", query: { redirect: to.fullPath } });
    }
  } else {
    next();
  }
});

export default router;

export const createDefaultRouter: (routes: Array<RouteRecordRaw>) => Router = (routes) =>
  createRouter({
    history: createWebHistory(),
    routes,
  });

export function redirectLogin() {
  router.push({ name: "login", query: { redirect: router.currentRoute.value.fullPath } });
}
