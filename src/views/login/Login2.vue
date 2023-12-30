<template>
  <div class="el-pa-md">
    <el-card>
      <div class="text-h6 el-pb-md text-blue-8 text-center text-weight-bolder">积健为雄!</div>
      <div class="text-subtitle text-blue-8 text-center text-weight-bolder">遇见您的书院小助手</div>
    </el-card>
    <!--     <el-tabs v-model="tab" class="text-primary" >
      <el-tab-pane label="用户登录" name="one" ></el-tab-pane>
    </el-tabs> -->
    <!--     <el-divider></el-divider> -->
    <div class="title-login">
      <el-text class="tt">用户登录</el-text>
    </div>
    <el-divider class="divide"></el-divider>
    <div class="form-contain">
      <el-form :model="form" class="el-gutter-md"
        ><!-- class="el-gutter-md" -->
        <el-form-item name="one">
          <el-form-item label="用户id">
            <el-input
              v-model="form.username"
              placeholder="请输入您的用户id"
              :rules="[{ required: true, message: '请输入您的用户id', trigger: 'blur' }]"
              clearable
              class="input-margin w-50 m-3"
            ></el-input>
          </el-form-item>

          <el-form-item label="密码">
            <el-input
              v-model="form.password"
              placeholder="请输入您的密码"
              :rules="[{ required: true, message: '请输入您的密码', trigger: 'blur' }]"
              clearable
              show-password
              class="m-3 input-margin2"
            ></el-input>
          </el-form-item>
        </el-form-item>

        <div class="image-container">
          <el-form-item label="验证码">
            <el-input
              v-model="form.verifyCode"
              placeholder="请输入验证码"
              class="code-input"
              :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]"
              clearable
            ></el-input>
          </el-form-item>
          <div class="verify-wrapper">
            <el-image :src="captcha" alt="验证码" class="code-img" @click="refreshCaptcha"></el-image>
            <span class="text_" type="info" @click="refreshCaptcha">看不清楚？换一张</span>
          </div>
        </div>
        <div class="butt">
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button @click="onReset">重置</el-button>
          <el-button type="text" size="small" @click="toRegister">没有账户？点击注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { checkCaptcha, getCaptcha, login } from "@/api/login";
import { getUserMe } from "@/api/user";
import { useUserStore } from "@/stores/user";
import Message from "@/utils/message";

const $router = useRouter();
const $route = useRoute();

const form = reactive({ username: "", password: "", verifyCode: "" });
let tab = ref("one");

const captcha = ref("");

let rules: {
  username: [{ required: true; message: "请输入您的用户id"; trigger: "blur" }];
  password: [{ required: true; message: "请输入您的密码"; trigger: "blur" }];
  verifyCode: [{ required: true; message: "请输入验证码"; trigger: "blur" }];
};

onMounted(refreshCaptcha);

async function refreshCaptcha() {
  const verifyCodeData = await getCaptcha();
  captcha.value = "data:image/png;base64," + verifyCodeData.img;
}

async function onSubmit() {
  const userStore = useUserStore();

  const precheckResult = await checkCaptcha(form.verifyCode);
  console.log(precheckResult);
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
  userStore.login({ token }); // 存token
  const user = await getUserMe();
  userStore.login({ token, user });
  Message.success("欢迎你，" + user.user_name + "!");

  if ($route.query.redirect) {
    $router.replace($route.query.redirect as string);
  } else {
    $router.replace("/");
  }
}

async function onReset() {
  const precheckResult = await checkCaptcha(form.verifyCode);
  form.username = "";
  form.password = "";
  form.verifyCode = "";
}
function toRegister() {
  $router.replace({ name: "register", query: $route.query });
}
</script>

<style lang="scss" scoped>
.custom-tab-panels {
  margin-bottom: -25px;
  padding-bottom: 0px;
}

.image-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.code-input {
  margin-left: 10px;
}

.code-img {
  width: 100px;
  height: auto;
  margin-left: 10px;
  margin-right: 10px;
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
  margin-top: -10px;
}

.eltabs {
  height: 160px;
}

.input-margin {
  margin-bottom: 20px;
  margin-top: 0px;
}

.el-gutter-md {
  margin-top: 0px;
}

.mr {
  margin-right: 20px;
}

.form-contain {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.title-login {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.tt {
  padding: 0;
  color: #077bc3;
  text-align: center;

  font-size: 18px;
}

.el-divider--horizontal {
  margin-top: 10px;
  margin-bottom: 5px;
  height: 3px;
  background-color: #179ddf;
}

.input-margin2 {
  margin-bottom: 5px;
  margin-top: 0px;
}

.el-form-item__label {
  width: 100px;
  font-weight: bold;
  color: rgb(23, 138, 187);
}

.butt {
  margin-left: 30px;
}

.el-card__body {
  border: none;
  border-bottom: none;
}
.el-card {
  border: none;
}
</style>
