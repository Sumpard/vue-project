import router from "@/router";

export function toLogin() {
  // router.push({ name: "login", query: route.value.query });
  router.push({ name: "login", query: { redirect: router.currentRoute.value.fullPath } });
}

export function toIndex() {
  router.replace({ name: "interview" });
}
