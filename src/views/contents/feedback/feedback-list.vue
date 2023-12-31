<template>
  <div class="outer">
    <div class="my-info">
      <el-table
        v-loading="loading"
        :data="filterTableData"
        max-height="550"
        highlight-current-row
        :default-sort="{ prop: 'propose_time', order: 'descending' }"
      >
        <el-table-column prop="propose_time" label="反馈时间" sortable>
          <template v-slot="{ row }">
            {{ formatTimestamp(row.propose_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="question_texts" label="反馈内容摘要">
          <template v-slot="{ row }">
            {{ truncateText(row.question_texts, 15) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="question_status"
          label="反馈状态"
          :filters="[
            { text: '已提交', value: 'SUBMITTED' },
            { text: '已答复', value: 'FINISHED' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag :type="scope.row.question_status === 'SUBMITTED' ? '' : 'success'" disable-transitions>{{
              mapstatus(scope.row.question_status)
            }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="查看详情" width="120">
          <template #default="scope">
            <el-button link type="primary" size="large" @click="openDialog(scope.row)">
              <el-icon><i-ep-DArrowRight /></el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 会话框查看详情 -->
      <el-dialog v-model="dialogVisible" title="反馈详情" width="50%">
        <div v-if="selectedRow">
          <el-form>
            <el-divider content-position="left">您的反馈</el-divider>
            <el-form-item class="form-item-with-margin">
              <div class="details-container">
                <!-- 用户侧 -->
                <el-row>
                  <el-form-item label="反馈时间：">
                    <p>{{ formatTimestamp(selectedRow.propose_time) }}</p>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="反馈内容：">
                    <p>{{ selectedRow.question_texts }}</p>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="反馈处理状态：">
                    <p style="color: rgb(37, 165, 250)">{{ mapstatus(selectedRow.question_status) }}</p>
                  </el-form-item>
                </el-row>
                <!-- 添加其他需要显示的详情 -->
                <!-- 显示图片 -->
                <el-row v-if="selectedRow.question_images.length >= 1 && selectedRow.question_images[0] != ''">
                  <el-form-item label="反馈图片：">
                    <div class="img-container">
                      <div v-for="(image, index) in selectedRow.question_images" :key="index">
                        <el-image
                          :src="sf(image)"
                          alt="Image"
                          class="img"
                          :preview-src-list="[sf(image)]"
                          fit="cover"
                        />
                      </div>
                    </div>
                  </el-form-item>
                </el-row>
                <el-row v-else>
                  <el-form-item label="反馈图片：">
                    <p>未上传图片</p>
                  </el-form-item>
                </el-row>
              </div>
            </el-form-item>

            <el-divider content-position="left">院长回复</el-divider>
            <el-form-item class="form-item-with-margin">
              <div class="details-container">
                <!--院长回复侧  -->
                <el-row>
                  <el-form-item label="院长回复内容：" v-if="selectedRow.reply_texts != null">
                    <p>{{ selectedRow.reply_texts }}</p>
                  </el-form-item>
                  <el-form-item label="院长回复内容：" v-else>
                    <p>院长暂未回复</p>
                  </el-form-item>
                </el-row>
                <el-form-item label="反馈回复图片：" v-if="selectedRow.reply_images[0] != ''">
                  <div class="img-container">
                    <div v-for="(image, index) in selectedRow.reply_images" :key="index">
                      <el-image :src="sf(image)" alt="Image" class="img" :preview-src-list="[sf(image)]" fit="cover" />
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="反馈回复图片：" v-else>
                  <p>院长未上传图片</p>
                </el-form-item>
              </div>
            </el-form-item>
          </el-form>
        </div>

        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false"> 关闭 </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getQuestion } from "@/api/question";
import { useUserStore } from "@/stores/user";
import { sf } from "@/utils/static-file";
import { formatTimestamp } from "@/utils/timeformat";

const loading = ref(true);
const dialogVisible = ref(false); //会话框显示
const selectedRow = ref<any>(); //会话框内容

const userStore = useUserStore();
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

const openDialog = (row) => {
  //获取会话框内容
  selectedRow.value = row;
  dialogVisible.value = true;
};

const truncateText = (text: string, maxLength: number) => {
  //截断text以防内容过长
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const filterTag = (value: string, row: any) => {
  return row.question_status === value;
};

const mapstatus = (question_status: any) => {
  // 映射user_role到相应的文本
  return question_status === "SUBMITTED" ? "已提交" : question_status === "FINISHED" ? "已答复" : "";
};

onMounted(async () => {
  // 通过 API 请求获取数据
  try {
    const response = await getQuestion(userStore.user!.user_name);

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
