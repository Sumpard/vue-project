<template>
  <div class="my-info">
    <div class="rin-card"><add-user-dialog /></div>

    <el-divider class="divide" />

    <el-table
      v-loading="loading"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      :data="filterTableData"
      max-height="550"
      highlight-current-row
      :default-sort="{ prop: 'score', order: 'descending' }"
    >
      <el-table-column prop="user_id" label="学号"></el-table-column>
      <el-table-column prop="user_name" label="用户名"></el-table-column>
      <el-table-column
        prop="user_role"
        label="身份"
        :filters="[
          { text: '普通用户', value: 'REGULAR_USER' },
          { text: '管理员', value: 'MANAGER' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template v-slot="{ row }">
          <template v-if="!row.editingrole">
            {{ mapUserRole(row.user_role) }}
          </template>
          <template v-if="row.editingrole">
            <el-select v-model="row.editedRole" placeholder="请选择身份">
              <el-option label="普通用户" value="REGULAR_USER" />
              <el-option label="管理员" value="MANAGER" />
            </el-select>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="score" sortable label="诚信点" width="200px">
        <template v-slot="{ row }">
          <template v-if="!row.editingscore">
            {{ row.score }}
          </template>
          <template v-if="row.editingscore">
            <el-form class="center" ref="ruleFormRef" :model="form" :rules="rules">
              <el-form-item :cell-style="{ 'text-align': 'center' }" prop="score">
                <div>
                  <el-input-number class="center" v-model="form.score" />
                </div>
              </el-form-item>
            </el-form>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="修改" fixed="right" width="250">
        <template #header>
          <el-input v-model="search" size="small" placeholder="请输入学号或用户名搜索" clearable />
        </template>
        <template v-slot="{ row }">
          <el-button type="primary" link size="small" @click="startEditingscore(row)" v-if="!row.editingscore"
            >修改诚信点</el-button
          >
          <el-button
            type="success"
            link
            size="small"
            @click="saveEditingscore(row, ruleFormRef, form)"
            v-if="row.editingscore"
            >保存诚信点</el-button
          >
          <el-button type="primary" link size="small" @click="startEditingrole(row)" v-if="!row.editingrole"
            >修改身份</el-button
          >
          <el-button type="success" link size="small" @click="saveEditingrole(row)" v-if="row.editingrole"
            >保存身份</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";

import { User, getAllUsers, updateUserRole, updateUserScore } from "@/api/user";

import AddUserDialog from "./components/AddUserDialog.vue";

const loading = ref(true);
const ruleFormRef = ref<FormInstance>();
const tableData = ref<User[]>([]);
const search = ref("");
const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.user_id.toLowerCase().includes(search.value.toLowerCase()) ||
      data.user_name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const form = reactive({
  score: undefined,
});

const rules = reactive<any>({
  score: [{ required: true, message: "请输入分数", trigger: "blur" }],
});

const filterTag = (value: string, row: any) => {
  return row.user_role === value;
};

const startEditingscore = (row: any) => {
  // 进入编辑模式
  form.score = row.score;
  row.editingscore = true;
};

const startEditingrole = (row: any) => {
  // 进入编辑模式
  row.editedRole = row.user_role;
  row.editingrole = true;
};

const mapUserRole = (userRole: any) => {
  // 映射user_role到相应的文本
  return userRole === "MANAGER" ? "管理员" : userRole === "REGULAR_USER" ? "普通用户" : "";
};

const saveEditingscore = async (row: any, formEl: FormInstance | undefined, form: any) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    // 校验成功
    if (valid) {
      try {
        form.score = parseInt(form.score, 10);
        const result = await updateUserScore(row.user_id, form.score);
        if (!result) {
          ElMessage.error("修改诚信点失败");
          return;
        }
        ElMessage({ message: "修改诚信点成功", type: "success" });
        row.editingscore = false;
        row.score = form.score;
      } catch (error) {
        console.error("Failed to save editing:", error);
      }
    } else {
      // 校验失败
      console.warn("Form validation failed:", fields);
    }
  });
};

const saveEditingrole = async (row: any) => {
  try {
    const result2 = await updateUserRole(row.user_id, row.editedRole);

    if (!result2) {
      ElMessage.error("修改身份失败");
      return;
    }
    ElMessage({ message: "修改身份成功", type: "success" });
    row.editingrole = false;
    row.user_role = row.editedRole;
  } catch (error) {
    console.error("Failed to save editing:", error);
  }
};

onMounted(async () => {
  // 通过 API 请求获取数据
  try {
    const response = await getAllUsers();
    if (response.code === 200) {
      tableData.value = response.data;
      loading.value = false;
    } else {
      console.error("Failed to fetch data:", response.msg);
    }
  } catch (error) {
    console.error("API request failed:", error);
  }
});
</script>

<style scoped>
.divide {
  margin: 15px 0px 0px;
}
.my-info {
  width: 100%;
  overflow: hidden;
  min-height: 570px;
  transition: all 0.8s ease;
  background-color: rgb(255, 255, 255);

  font-family: "maoken", "urafont", "微软雅黑";
  font-weight: 500;
  border: 0.1rem solid #dcdfe6;
  border-radius: 1rem;
}
.rin-card {
  /*margin: 20px 0;*/
  padding: 15px 40px 0px;
  /*padding-bottom:0;*/
}
.input-number-container {
  display: flex;
  align-items: center; /* 上下居中 */
  justify-content: center; /* 左右居中 */
}
.center {
  padding: 0 0 0 0;
  display: flex;
  align-items: center;
}

.centered-label .el-form-item__content {
  padding: 0px;
  margin-left: 50%; /*不加这行的话，label会出现很难选中复制的情况。*/
}
</style>
