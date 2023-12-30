<template>
  <div class="my-info">
    <el-dialog v-model="dialogFormVisible" title="审核回复" :before-close="handleClose" draggable width="500px">
      <el-form ref="ruleFormRef" :model="form" :rules="rules">
        <el-form-item label="回复内容" prop="reply" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.reply" autocomplete="off" clearable />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitForm(ruleFormRef)"> 提交 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-table
      v-loading="loading"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      :data="tableData"
      max-height="550"
      highlight-current-row
      :default-sort="{ prop: 'score', order: 'descending' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="available_name" label="预约名称"></el-table-column>
      <el-table-column prop="available_type_name" label="预约类型"> </el-table-column>
      <el-table-column prop="renter_name" label="预约人"> </el-table-column>
      <el-table-column prop="renter_phone" label="联系电话"> </el-table-column>
      <el-table-column label="预约时间">
        <template v-slot="{ row }"> {{ row.appoint_start_time }}——{{ row.appoint_end_time }} </template>
      </el-table-column>
      <el-table-column prop="appointment_status" label="预约状态">
        <template v-slot="{ row }">
          {{ mapstatus(row.appointment_status) }}
        </template>
      </el-table-column>
      <el-table-column prop="appointment_description" label="预约描述"></el-table-column>
      <el-table-column prop="reviewer_name" label="审核人"></el-table-column>
      <el-table-column prop="submit_time" sortable label="预约提交时间"></el-table-column>
    </el-table>
    <div class="divide">
      <el-button type="primary" :disabled="disableAuditButton" @click="refuse">审核不通过</el-button>
      <el-button type="danger" @click="handleDelete">删除记录</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";

import { deleteRecord, getAppointAll, reviewAppointmentRefuse } from "@/api/review";
import { useUserStore } from "@/stores/user";

const ruleFormRef = ref<FormInstance>();

const formLabelWidth = "80px";
const form = reactive({
  reply: "",
});
const rules = reactive<any>({
  reply: [{ required: true, message: "请输入回复", trigger: "blur" }],
});
const userStore = useUserStore();
export interface Appointment {
  appointment_id: number;
}

const loading = ref(true);
const tableData = ref([]);
const search = ref("");
const dialogFormVisible = ref(false);
const selectedRows = ref<Appointment[]>([]);
const disableAuditButton = ref(false);

const mapstatus = (appointment_status: any) => {
  // 映射user_role到相应的文本
  return appointment_status === "SUBMITTED"
    ? "审核中"
    : appointment_status === "ACCEPTED"
      ? "已通过"
      : appointment_status === "REFUSED"
        ? "已拒绝"
        : "";
};

const handleSelectionChange = (selection: Appointment[]) => {
  selectedRows.value = selection;
  disableAuditButton.value = selectedRows.value.length > 1;
};

const handleDelete = async () => {
  if (selectedRows.value.length === 0) {
    // 没有选中的行
    return;
  }
  for (const row of selectedRows.value) {
    // 替换为实际的 API 调用，逐个调用 API
    const response = await deleteRecord(row.appointment_id);
    // 模拟删除成功
    if (response.code === 200) {
      ElMessage({ message: "删除预约记录成功", type: "success" });
    }
  }

  tableData.value = tableData.value.filter((row) => !selectedRows.value.includes(row));
  selectedRows.value = [];
};

const refuse = async () => {
  if (selectedRows.value.length !== 1) {
    // 如果选中行不是一行，不执行审核不通过操作
    return;
  }
  dialogFormVisible.value = true;
};
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    // 校验成功
    if (valid) {
      try {
        const id = selectedRows.value[0].appointment_id;
        const response = await reviewAppointmentRefuse(
          id,
          form.reply,
          userStore.user!.user_id,
          userStore.user!.user_name
        );

        if (response.code === 200) {
          ElMessage({ message: "审核不通过成功", type: "success" });
        }

        dialogFormVisible.value = false;
        form.reply = "";
        tableData.value = tableData.value.filter((row) => !selectedRows.value.includes(row));
        selectedRows.value = [];
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

onMounted(async () => {
  // 通过 API 请求获取数据
  try {
    const response = await getAppointAll("ACCEPTED");

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
@import url("https://cdn.jsdelivr.net/gh/AyagawaSeirin/homepage@latest/mdui/css/mdui.min.css");
.divide {
  margin: 15px 30px 15px;
}
.my-info {
  width: 100%;
  overflow: hidden;
  min-height: 600px;
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
