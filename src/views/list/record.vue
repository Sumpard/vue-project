<template>
  <div class="my-info">
    <el-table
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      :data="filterTableData"
      max-height="550"
      highlight-current-row
      :default-sort="{ prop: 'score', order: 'descending' }"
    >
      <el-table-column prop="available_name" label="预约名称"></el-table-column>
      <el-table-column prop="available_type_name" label="预约类型"> </el-table-column>
      <el-table-column label="预约时间">
        <template v-slot="{ row }">
          {{ row.appoint_start_time }}
          <br />-{{ row.appoint_end_time }}
        </template>
      </el-table-column>
      <el-table-column
        prop="appointment_status"
        label="预约状态"
        :filters="[
          { text: '审核中', value: 'SUBMITTED' },
          { text: '已通过', value: 'ACCEPTED' },
          { text: '已拒绝', value: 'REFUSED' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template v-slot="{ row }">
          {{ mapstatus(row.appointment_status) }}
        </template>
      </el-table-column>
      <el-table-column prop="appointment_description" label="预约描述"></el-table-column>

      <el-table-column prop="submit_time" sortable label="提交时间"></el-table-column>

      <el-table-column label="预约回复" fixed="right" width="200">
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
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";

import { getAppointSelf } from "@/api/record";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const ruleFormRef = ref<FormInstance>();
const tableData = ref<any[]>([]);
const search = ref("");
const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.user_id.toLowerCase().includes(search.value.toLowerCase()) ||
      data.user_name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const filterTag = (value: string, row: any) => {
  return row.appointment_status === value;
};

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

onMounted(async () => {
  // 通过 API 请求获取数据
  try {
    const response1 = await getAppointSelf("SUBMITTED", userStore.user!.user_id);

    const response2 = await getAppointSelf("ACCEPTED", userStore.user!.user_id);

    const response3 = await getAppointSelf("REFUSED", userStore.user!.user_id);
    const arr = [...response1, ...response2, ...response3];
    tableData.value = arr;
    // console.log(tableData.value)
    ElMessage({ message: "获取成功", type: "success" });
  } catch (error) {
    console.error("API request failed:", error);
  }
});
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/gh/AyagawaSeirin/homepage@latest/mdui/css/mdui.min.css");
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
