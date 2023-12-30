<template>
  <div class="q-pa-md">
    <q-card-section>
      <div class="text-h6 q-pt-xs text-blue-8 text-center text-weight-bolder">积健为雄!</div>
      <!-- <div class="text-subtitle text-blue-8 text-center text-weight-bolder">遇见您的书院小助手</div> -->
    </q-card-section>
    <q-tabs v-model="tab" class="text-primary">
      <q-tab label="用户注册" name="one" />
      <!-- <q-tab label="手机号注册" name="two" /> -->
    </q-tabs>
    <q-separator />
    <q-form @submit="onSubmit1" @reset="onReset" class="">
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="one">
          <q-input
            filled
            v-model="form.username"
            label="用户名"
            lazy-rules
            :rules="[(val: string | any[]) => val?.length > 0 || '请输入您的用户名']"
            dense
          />
          <q-input
            filled
            v-model="form.userid"
            label="用户id"
            lazy-rules
            :rules="[(val: string | any[]) => val?.length > 0 || '请输入您的密码']"
            dense
          />
          <q-input
            filled
            type="password"
            v-model="form.password"
            label="密码"
            lazy-rules
            :rules="[(val: string | any[]) => val?.length > 0 || '请输入您的密码']"
            dense
          />
        </q-tab-panel>
      </q-tab-panels>
      <div class="button-container text-center">
        <q-btn label="注册" type="submit" color="primary" />
        <q-btn label="重置" type="reset" color="primary" flat class="q-ml-sm" />
        <q-btn label="已有账号？点击登录" color="primary" flat class="q-ml-sm" size="sm" @click="toLogin" />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { register } from "@/api/login";
import Message from "@/utils/message";

const $router = useRouter();
const $route = useRoute();

const form = reactive({ username: "", password: "", userid: "", email: "" });
let tab = ref("one");

const usernameRules = [(val: string) => val?.length > 0 || "请输入用户名"];
const passwordRules = [(val: string) => val?.length > 0 || "请输入密码"];
// const mailRules = [(val: string) => val?.length > 0 || "请输入您的邮箱"];

async function onSubmit1() {
  try {
    Message.info("提交注册信息");
    const response = await register(form.userid, form.username, form.password);
    const userData = response;
    if (!userData) {
      Message.error("注册失败");
      return;
    }
    Message.success("注册成功！");

    $router.replace({ name: "login", query: $route.query });
  } catch (error) {
    Message.error("注册失败");
  }
}
function onReset() {
  form.username = "";
  form.password = "";
  form.userid = "";
}
function toLogin() {
  $router.replace({ name: "login", query: $route.query });
}
</script>

<style lang="scss" scoped></style>
