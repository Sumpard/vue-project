<template>
  <div class="chart-contain">
    <el-form>
      <el-row>
        <el-form-item label="搜索：" label-width="70">
          <el-input
            v-model="search"
            class="w-50 m-2"
            :prefix-icon="Search"
            size="large"
            placeholder="搜索撰写人或标题"
            clearable
          />
        </el-form-item>
      </el-row>
    </el-form>
  </div>
  <div class="outer">
    <div class="my-info">
      <el-table
        v-loading="loading"
        :data="filterTableData"
        max-height="650"
        highlight-current-row
        :default-sort="{ prop: 'publish_time', order: 'descending' }"
      >
        <el-table-column prop="publish_time" label="通知编写时间" sortable>
          <template v-slot="{ row }">
            {{ row.publish_time }}
          </template>
        </el-table-column>
        <el-table-column prop="notice_title" label="通知标题">
          <template v-slot="{ row }">
            {{ truncText(row.notice_title, 15) }}
          </template>
        </el-table-column>
        <el-table-column prop="publisher_name" label="撰写人">
          <template v-slot="{ row }">
            {{ row.publisher_name }}
          </template>
        </el-table-column>
        <el-table-column prop="notice_type" label="通知类别">
          <template #default="scope">
            <el-tag :type="''" disable-transitions>{{ scope.row.notice_type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="查看详情" width="120">
          <template #default="scope">
            <el-button link type="primary" size="large" @click="openPreview(scope.row)">
              <el-icon><i-ep-DArrowRight /></el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";

import { getNoticeByType } from "@/api/notice";
import { Notice } from "@/interfaces/notice";
import { truncText } from "@/utils/text-utils";

const props = defineProps<{ type: string }>();

const loading = ref(true);
const tableData = ref<Notice[]>([]);
const search = ref("");
const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.publisher_name.toLowerCase().includes(search.value.toLowerCase()) ||
      data.notice_title.toLowerCase().includes(search.value.toLowerCase())
  )
);

const router = useRouter();

const openPreview = (row: Notice) => {
  router.push({ name: "notice-detail", params: { noticeId: row.notice_id } });
};

onMounted(async () => {
  tableData.value = await getNoticeByType(props.type);
  loading.value = false;
});
</script>

<style scoped>
.divide {
  margin: 15px 0px 0px;
}
.chart-contain {
  display: flex;
  flex-direction: column;
}
.outer {
  display: flex;
  justify-content: center; /* 子元素水平居中 */
}
.my-info {
  width: 90%;
  overflow: hidden;
  min-height: 570px;
  transition: all 0.8s ease;
  background-color: rgb(255, 255, 255);

  font-family: "maoken", "urafont", "微软雅黑";
  font-weight: 500;
  border: 0.1rem solid #dcdfe6;
  border-radius: 1rem;
  border-width: 1px;
  display: flex;
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
.img-container {
  display: table;
  float: left;
  width: 20%;
  text-align: center;
  line-height: 27px;
  color: blue;
}
.img-container img {
  margin: auto;
  width: 53px;
  height: 53px;
}
.form-item-with-margin {
  margin-left: 15%; /* 适当调整间距 */
  margin-right: 20px;
}
.details-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 将元素垂直对齐方式设置为 flex-start */
}
.el-divider {
  width: 80%;
  margin-left: 2000px auto;
}
</style>
