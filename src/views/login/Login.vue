<template>
  <div class="q-pa-md">
    <q-card-section>
      <div class="text-h6 q-pb-md text-blue-8 text-center text-weight-bolder">积健为雄!</div>
      <div class="text-subtitle text-blue-8 text-center text-weight-bolder">遇见您的书院小助手</div>
    </q-card-section>
    <q-tabs v-model="tab" class="text-primary">
      <q-tab label="用户登录" name="one" />
      <!-- <q-tab label="手机号登录" name="two" /> -->
    </q-tabs>
    <q-separator />
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-tab-panels v-model="tab" animated class="custom-tab-panels">
        <q-tab-panel name="one">
          <q-input filled v-model="form.username" label="用户id" lazy-rules
            :rules="[(val: string | any[]) => val?.length > 0 || '请输入您的用户id']" dense />
          <q-input filled type="password" v-model="form.password" label="密码" lazy-rules
            :rules="[(val: string | any[]) => val?.length > 0 || '请输入您的密码']" dense />
        </q-tab-panel>

        <!-- <q-tab-panel name="two">
          <q-input filled v-model="form.username" label="用户名" lazy-rules
            :rules="[(val: string | any[]) => val?.length > 0 || '请输入您的用户名']" />
          <q-input filled type="password" v-model="form.password" label="手机号" lazy-rules
            :rules="[(val: string | any[]) => val?.length > 0 || '请输入您的手机号']" />
        </q-tab-panel> -->
      </q-tab-panels>
      <div class="image-container">

        <q-input filled v-model="form.verifycode" label="验证码" class="code-input" lazy-rules
          :rules="[(val: string | any[]) => val?.length > 0 || '请输入验证码']" dense></q-input>
        <img :src="verifyCodeImage" alt="验证码" class="code-img">
      </div>
      <div>
        <q-btn label="登录" type="submit" color="primary" />
        <q-btn label="重置" type="reset" color="primary" flat class="q-ml-sm" />
        <q-btn label="没有账户？点击注册" color="primary" flat class="q-ml-sm" size="sm" @click="toRegister" />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { login, getverifycode, getanswer, verifyanswer } from "@/api/login";
import { getUserMe } from "@/api/user";
import Message from "@/utils/message";
import { useUserStore } from "@/stores/user";

const $router = useRouter();
const $route = useRoute();

$router.push({
  query: {
    redirect: '/homepage' // 目标URL中的 redirect 参数值
  }
});

const form = reactive({ username: "", password: "", verifycode: "" });
let tab = ref("one");
// 创建图片对象

const verifyCodeImage = ref('');

async function getcodeimg() {
  try {
    const verifyCodeData = await getverifycode();
    verifyCodeImage.value = 'data:image/png;base64,' + verifyCodeData.img;
    console.log("get verifycode", verifyCodeData);
    // 处理验证码数据
  } catch (error) {
    console.error(error);
  }
}

async function onSubmit() {
  const userStore = useUserStore();
  try {
    Message.info("提交登录信息");
    // 获取token
    const Ans = await getanswer();
    console.log(Ans);
    const Ans_check = await verifyanswer(form.verifycode);
    console.log(Ans_check);
    if (Ans_check.code != "200") {
      Message.error(" 验证码错误");
      console.log("验证码错误", Ans_check);
    }
    else {
      console.log("登录信息： ", form.username, form.password, form.verifycode);
      const { data } = await login(form.username, form.password, form.verifycode);

      //Message.info("登录成功");
      console.log("登录成功", data);
      const token = data;
      userStore.login({ token }); // 存token
      // 获取用户
      const user = await getUserMe();

      //Message.info("获取用户");
      console.log("获取用户", user);
      userStore.login({ token, user });
      Message.success(`登录成功！`);

      if ($route.query.redirect) {
        $router.replace($route.query.redirect as string);
      } else {
        $router.replace({ name: "register" });
      }
    }
  } catch (error) {
    console.log("登录失败", error);
  }
}
// Submit2手机号
function onReset() {
  form.username = "";
  form.password = "";
}
function toRegister() {
  $router.replace({ name: "register", query: $route.query });
}

getcodeimg();

</script>

<style lang="scss">
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
</style>
