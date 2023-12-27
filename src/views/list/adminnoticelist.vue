<template>
  <div class="outer">
    <div class="my-info">
      <el-table
        :data="filterTableData"
        max-height="550"
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
            {{ truncateText(row.notice_title, 15) }}
          </template>
        </el-table-column>
        <el-table-column prop="publisher_name" label="撰写人">
          <template v-slot="{ row }">
            {{ row.publisher_name }}
          </template>
        </el-table-column>
        <el-table-column prop="notice_type" label="通知类别">
          <template v-slot="{ row }">
            {{ row.notice_type }}
          </template>
        </el-table-column>
        <el-table-column label="搜索" fixed="right" width="200">
          <template #header>
            <el-input v-model="search" size="small" placeholder="请输入撰写人姓名进行搜索" clearable />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="查看详情" width="120">
          <template #default="scope">
            <el-button link type="primary" size="large" @click="openPreview(scope.row)">
              <el-icon><i-ep-DArrowRight /></el-icon>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="openModify(scope.row)">修改</el-button>
            <el-button link type="primary" size="small" @click="onDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessageBox } from "element-plus";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { deletNotice, getNotice } from "@/api/notice";
import { useUserStore } from "@/stores/user";
import Message from "@/utils/message";

const selectedRow = ref(null); //所选notice的内容
const router = useRouter(); // 获取路由对象
const userStore = useUserStore();
const tableData = ref([]);
const search = ref("");
const filterTableData = computed(() =>
  tableData.value.filter(
    (data) => !search.value || data.publisher_name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const truncateText = (text: string, maxLength: number) => {
  //截断text以防内容过长
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const openPreview = (row) => {
  //获取会话框内容
  selectedRow.value = row;
  console.log("本条通知： ", selectedRow.value);
  router.push({
    path: "/noticepreview",
    query: {
      content: row.notice_content,
      type: row.notice_type,
      title: row.notice_title,
      time: row.publish_time,
      name: row.publisher_name,
    },
  });
};

const openModify = (row) => {
  //获取会话框内容
  selectedRow.value = row;
  console.log("本条通知： ", selectedRow.value);
  router.push({
    path: "/noticemodify",
    query: {
      content: row.notice_content,
      type: row.notice_type,
      title: row.notice_title,
      time: row.publish_time,
      name: row.publisher_name,
      id: row.notice_id,
    },
  });
};

const onDelete = async (row) => {
  console.log("notice to be delete(id title): ", row.notice_id, row.notice_title);
  await ElMessageBox.confirm("此操作将删除该通知, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    console.log("delete request submitting");
    const response = await deletNotice(parseInt(row.notice_id));
    console.log("response:", response);
    if (response.code === 200) {
      Message.success("删除成功");
    } else {
      Message.error(response.msg || "删除失败");
    }
    location.reload();
  });
};

onMounted(async () => {
  // 通过 API 请求获取数据
  try {
    const response = await getNotice("");
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
  margin: 15px 0px 0px;
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
