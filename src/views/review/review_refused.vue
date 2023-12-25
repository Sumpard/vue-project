<template>
  <div class="my-info">
    <el-table
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

      <el-table-column label="预约回复" fixed="right" width="100">
        <template v-slot="{ row }">
          <template v-if="!row.reply"> 暂无回复 </template>
          <template v-else>
            <el-popover placement="bottom" title="回复" :width="200" trigger="click" :content="row.reply">
              <template #reference>
                <el-button type="primary" link size="small">查看</el-button>
              </template>
            </el-popover>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="divide">
      <el-button type="danger" @click="handleDelete">删除记录</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { deleteRecord, getAppointAll } from "@/api/review";

export interface Appointment {
  appointment_id: number;
}

const tableData = ref([]);
const search = ref("");
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
    console.log(response);
    console.log("Deleting row with ID:", row.appointment_id);
    if (response.code === 200) {
      ElMessage({ message: "删除预约记录成功", type: "success" });
    }
  }

  tableData.value = tableData.value.filter((row) => !selectedRows.value.includes(row));
  selectedRows.value = [];
};

onMounted(async () => {
  // 通过 API 请求获取数据
  try {
    const response = await getAppointAll("REFUSED");
    console.log(response);

    if (response.code === 200) {
      tableData.value = response.data;
      // console.log(tableData.value)
      ElMessage({ message: "获取成功", type: "success" });
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
