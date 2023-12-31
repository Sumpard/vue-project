<template>
  <div>
    <div class="tw-flex">
      <p style="font-size: 24px">个人信息</p>
    </div>
    <ElDivider />
    <div class="rin-tr"></div>
    <!-- 表单部分 -->
    <div v-if="user" class="rin-card mdui-card">
      <ElForm ref="formInstance" label-position="left" label-width="100px" style="max-width: 600px">
        <ElFormItem label="用户名">
          <p>{{ user.user_name }}</p>
        </ElFormItem>
        <ElFormItem label="学号">
          <p>{{ user.user_id }}</p>
        </ElFormItem>
        <ElFormItem label="诚信点">
          <p>{{ user.score }}</p>
        </ElFormItem>

        <ElFormItem label="邮件地址" prop="email">
          <el-input :disabled="!isEdit" v-model="user.email"></el-input>
        </ElFormItem>
      </ElForm>
      <div class="right-button">
        <ElButton type="primary" @click="changeIsEdit(true)" v-if="!isEdit">编辑资料</ElButton>
        <ElButton type="primary" @click="changeIsEdit(false)" v-else>取消</ElButton>
        <ElButton type="success" @click="updateAndFinishEditing" v-if="isEdit">完成</ElButton>
      </div>
    </div>

    <div class="form rin-card mdui-card">
      <el-form ref="ruleFormRef" :model="editPasswordForm" :rules="rules" label-position="left" label-width="100px">
        <el-form-item label="旧密码" prop="password">
          <el-input v-model="editPasswordForm.password" show-password />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="editPasswordForm.newPassword" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirm">
          <el-input v-model="editPasswordForm.confirm" show-password />
        </el-form-item>
      </el-form>

      <span class="dialog-footer">
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)"> 提交 </el-button>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";

import { updateemail, updatepassword } from "@/api/user";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const router = useRouter();
const { user } = storeToRefs(userStore);

const updateAndFinishEditing = async () => {
  if (!user.value) return;
  // 调用更新 email 的 API
  try {
    const response = await updateemail(user.value.email);
    // 更新成功后，将编辑模式设置为 false

    ElMessage.success("个人信息更新成功");
    changeIsEdit(false);
  } catch (error) {
    console.error("Error updating email:", error);
    // 处理错误，例如显示错误提示
  }
};

const ruleFormRef = ref<FormInstance>();
const editPasswordForm = reactive({
  newPassword: "",
  password: "",
  confirm: "",
});

const equalToPassword = (rule: any, value: any, callback: any) => {
  if (editPasswordForm.newPassword !== value) {
    callback(new Error("两次输入的密码不一致"));
  } else {
    callback();
  }
};

//验证规则

const rules = reactive<any>({
  password: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
  newPassword: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    { min: 6, message: "密码长度最少为6位", trigger: "blur" },
  ],
  confirm: [
    { required: true, trigger: "blur", message: "请再次输入您的密码" },
    { required: true, validator: equalToPassword, trigger: "blur" },
    { min: 6, message: "密码长度最少为6位", trigger: "blur" },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    // 校验成功
    if (valid) {
      try {
        const result = await updatepassword(editPasswordForm.password, editPasswordForm.newPassword);
        if (result.code === 200) {
          ElMessage({ message: "密码更改成功", type: "success" });
          userStore.logout();

          ElMessage({ message: "请重新登录", type: "success" });
          router.push({ name: "login" });
        } else {
          // Handle backend validation errors
          editPasswordForm.password = "";
          ElMessage.error("原始密码错误，请重新输入");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    } else {
      // 校验失败
      console.warn("Form validation failed:", fields);
    }
  });
};

//清除校验效果并且清空表单参数的函数
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const isEdit = ref(false);

const changeIsEdit = (val: boolean) => {
  isEdit.value = val;
};
</script>

<style scoped lang="scss">
@import url("https://cdn.jsdelivr.net/gh/AyagawaSeirin/homepage@latest/mdui/css/mdui.min.css");
.form {
  margin: 20px 0 0 0;
}
.rin-card {
  /*margin: 20px 0;*/
  padding: 20px 40px;
  /*padding-bottom:0;*/
}
.tw-flex {
  display: flex;
  justify-content: space-between;
}
.right-button {
  /* Adjust as needed for vertical positioning */
  margin-right: 10px;
  margin-top: 1px; /* Align the button to the right side */
  /* Add other styles for your button as needed */
}
</style>

<style scoped lang="scss">
.formStar {
  font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC", sans-serif;
  font-weight: 200;
  font-style: normal;
  font-size: 12px;
  color: #fb0404;
  padding: 5px;
}
.formLabel {
  font-size: 20px;
  color: #333333;
  font-family: "MicrosoftYaHeiLight", "微软雅黑 Light", "微软雅黑", sans-serif;
  font-weight: 200;
  line-height: 30px;
}
</style>
