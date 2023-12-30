import type { VueCookies } from "vue-cookies";

import { User, getUserMe } from "@/api/user";

export const useUserStore = defineStore("user", () => {
  const $cookies = inject<VueCookies>("$cookies")!;

  const user = ref<User | undefined>($cookies.get("user"));
  const token = ref<string | undefined>($cookies.get("token"));

  const fuckingAvatar = () => {
    const tmp = JSON.parse(JSON.stringify(unref(user)));
    delete tmp.avatar;
    $cookies.set("user", tmp);
  };

  const avatar = computed(() =>
    user.value && user.value.avatar.length > 0
      ? import.meta.env.VITE_APP_BASE_API + "/" + user.value.avatar
      : "/img/default-user.png"
  );

  const login = (data: { token?: string; user?: User }) => {
    user.value = data.user;
    token.value = data.token;
    $cookies.set("token", data.token);
    fuckingAvatar();
  };
  const logout = () => {
    user.value = undefined;
    token.value = undefined;
    $cookies.remove("user");
    $cookies.remove("token");
  };
  const fetch = async () => {
    try {
      user.value = await getUserMe();
      fuckingAvatar();
      console.log("fetch", user.value, $cookies.get("user"));
    } catch (e) {}
    return user.value;
  };
  const isAdmin = computed(() => {
    return user.value?.user_role == "MANAGER";
  });

  fetch();

  return { user, token, avatar, login, logout, fetch, isAdmin };
});
