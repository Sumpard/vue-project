<template>
  <div class="q-pa-md">
    <q-card-section>
      <div class="text-h6 q-pb-md text-blue-8 text-center text-weight-bolder">积健为雄!</div>
      <div class="text-subtitle text-blue-8 text-center text-weight-bolder">遇见您的书院小助手</div>
    </q-card-section>
    <q-tabs v-model="tab" class="text-primary">
      <q-tab label="用户登录" name="one" />
    </q-tabs>
    <q-separator />
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-tab-panels v-model="tab" animated class="custom-tab-panels">
        <q-tab-panel name="one">
          <q-input
            filled
            v-model="form.username"
            label="用户id"
            lazy-rules
            :rules="[(val: string | any[]) => val?.length > 0 || '请输入您的用户id']"
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
      <div class="image-container">
        <q-input
          filled
          v-model="form.verifyCode"
          label="验证码"
          class="code-input"
          lazy-rules
          :rules="[(val: string | any[]) => val?.length > 0 || '请输入验证码']"
          dense
        ></q-input>
        <div class="verify-wrapper">
          <img :src="captcha" alt="验证码" class="code-img" @click="refreshCaptcha" />
          <el-text class="text_" type="info" @click="refreshCaptcha">看不清楚？换一张</el-text>
        </div>
      </div>
      <div class="butt">
        <q-btn label="登录" type="submit" color="primary" />
        <q-btn label="重置" type="reset" color="primary" flat class="q-ml-sm" />
        <q-btn label="没有账户？点击注册" color="primary" flat class="q-ml-sm" size="sm" @click="toRegister" />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { checkCaptcha, getCaptcha, login } from "@/api/login";
import { useUserStore } from "@/stores/user";
import Message from "@/utils/message";

const $router = useRouter();
const $route = useRoute();

const form = reactive({ username: "", password: "", verifyCode: "" });
let tab = ref("one");

const captcha = ref("");

onMounted(refreshCaptcha);

async function refreshCaptcha() {
  const verifyCodeData = await getCaptcha();
  captcha.value = "data:image/png;base64," + verifyCodeData.img;
}

async function onSubmit() {
  const userStore = useUserStore();

  const precheckResult = await checkCaptcha(form.verifyCode);
  if (precheckResult.code !== 200) {
    Message.error("验证码错误");
    refreshCaptcha();
    return;
  }

  const { code, data } = await login(form.username, form.password, form.verifyCode);
  if (code != 200) {
    Message.error("登录失败,用户id或密码错误");
    return;
  }

  const token = data;
  userStore.login(token); // 存token
  const user = await userStore.fetch();
  Message.success("欢迎你，" + user!.user_name + "!");

  if ($route.query.redirect) {
    $router.replace($route.query.redirect as string);
  } else {
    $router.replace("/");
  }
}

function onReset() {
  form.username = "";
  form.password = "";
}
function toRegister() {
  $router.replace({ name: "register", query: $route.query });
}
</script>

<style scoped lang="scss">
.custom-tab-panels {
  margin-bottom: -25px;
  padding-bottom: 0px;
}

.image-container {
  display: flex;
  align-items: center;
}

.code-input {
  margin-left: 10px;
}

.code-img {
  width: 120px;
  height: auto;
  margin-left: 10px;
}

.text_ {
  font-size: 11px;
  position: absolute;
  top: 35px;
  bottom: 0;
  left: 10%;
}

.text_:hover {
  cursor: pointer;
  color: #1890ff;
  transition: color 0.3s;
}

.verify-wrapper {
  position: relative;
}

.butt {
  margin-left: 40px;
}
</style>
