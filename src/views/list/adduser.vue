<template>
  <!-- Form -->

  <el-button @click="dialogFormVisible = true"> 新建用户 </el-button>
  <el-dialog v-model="dialogFormVisible" title="新增用户" :before-close="handleClose" draggable>
    <el-form ref="ruleFormRef" :model="form" :rules="rules">
      <el-form-item label="用户名" prop="user_name" :label-width="formLabelWidth">
        <el-input v-model="form.user_name" autocomplete="off" clearable />
      </el-form-item>
      <el-form-item label="学号" prop="user_id" :label-width="formLabelWidth">
        <el-input v-model="form.user_id" autocomplete="off" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
        <el-input v-model="form.password" placeholder="默认为123456，可不输入" autocomplete="off" clearable />
      </el-form-item>

      <el-form-item label="身份" prop="user_role" :label-width="formLabelWidth">
        <el-select v-model="form.user_role" placeholder="请选择类型">
          <el-option label="普通用户" value="REGULAR_USER" />
          <el-option label="管理员" value="MANAGER" />
        </el-select>
      </el-form-item>

      <el-form-item label="诚信点" prop="score" :label-width="formLabelWidth">
        <el-input v-model="form.score" placeholder="默认为100，可不输入" autocomplete="off" clearable />
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off" clearable />
      </el-form-item>
      <!-- <el-form-item label="Zones" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择类型">
            <el-option label="Zone No.1" value="shanghai" />
            <el-option label="Zone No.2" value="beijing" />
          </el-select>
        </el-form-item> -->
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus";

import { adduser } from "@/api/goods";

const uploadedImage = ref<string | null>(null);
const uploadApi = "/api/upload";

const beforeUpload = (file: File) => {
  convertFileToBase64(file);
  return false;
};

const handleSuccess = (response: any, file: File) => {};

const convertFileToBase64 = (file: File) => {
  const reader = new FileReader();
  reader.onload = () => {
    uploadedImage.value = reader.result as string;
  };
  reader.readAsDataURL(file);
};

const ruleFormRef = ref<FormInstance>();
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
const form = reactive({
  avatar: "",
  email: "",
  password: "123456",
  score: 100,
  user_id: "",
  user_name: "",
  user_role: "",
});

const rules = reactive<any>({
  user_name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  user_id: [{ required: true, message: "请输入学号", trigger: "blur" }],
  user_role: [{ required: true, message: "请选择身份", trigger: "blur" }],
  score: [{ required: true, message: "请选择状态", trigger: "blur" }],
});

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    // 校验成功
    if (valid) {
      try {
        const result = await adduser(
          form.avatar,
          form.email,
          form.password,
          form.score,
          form.user_id,
          form.user_name,
          form.user_role
        );
        if (!result) {
          ElMessage.error("增加失败");
          return;
        }
        ElMessage({ message: "增加用户成功.", type: "success" });
        dialogFormVisible.value = false;
      } catch (error) {
        console.error("Error: ", error);
      }
    } else {
      // 校验失败
      console.warn("Form validation failed:", fields);
    }
  });
};

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("确定关闭?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
