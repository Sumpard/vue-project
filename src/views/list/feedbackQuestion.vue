<template>
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
      <el-table-column prop="proposer_name" label="反馈人" sortable>
        <template v-slot="{ row }">
          {{ row.proposer_name }}
        </template>
      </el-table-column>

      <el-table-column label="搜索" fixed="right" width="200">
        <template #header>
          <el-input v-model="search" size="small" placeholder="请输入用户名搜索" clearable />
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
          { text: '待处理', value: 'SUBMITTED' },
          { text: '已答复', value: 'FINISHED' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template #default="scope">
          <el-tag :type="scope.row.question_status === 'FINISHED' ? '' : 'danger'" disable-transitions>{{
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
        <el-form :row-style="{ height: '200px' }" :cell-style="{ padding: '0px' }">
          <el-divider content-position="left">用户反馈</el-divider>
          <el-form-item class="form-item-with-margin">
            <div class="details-container">
              <!-- 用户侧 -->
              <el-row>
                <el-form-item label="反馈时间：">
                  <p>{{ formatTimestamp(selectedRow.propose_time) }}</p>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="反馈人：">
                  <p>{{ selectedRow.proposer_name }}</p>
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
              <el-row v-if="selectedRow.question_images[0] != ''">
                <el-form-item label="反馈图片：">
                  <div class="img-container">
                    <div v-for="(image, index) in selectedRow.question_images" :key="index">
                      <el-image :src="sf(image)" alt="Image" class="img" :preview-src-list="[sf(image)]" />
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
                <el-form-item label="院长回复内容：" v-if="replyed">
                  <el-input
                    v-model="selectedRow.reply_texts"
                    :placeholder="selectedRow.reply_texts"
                    :disabled="replyed"
                    >{{ selectedRow.reply_texts }}</el-input
                  >
                </el-form-item>
                <el-form-item label="院长回复内容：" v-else>
                  <el-input
                    v-model="selectedRow.reply_texts"
                    placeholder="尚未回复"
                    :disabled="replyed"
                    rows="3"
                    type="textarea"
                    style="width: 25vw"
                  ></el-input>
                </el-form-item>
              </el-row>
              <el-form-item label="反馈回复图片：" v-if="replyed && selectedRow.reply_images[0] != ''">
                <div class="img-container">
                  <div v-for="(image, index) in selectedRow.reply_images" :key="index">
                    <el-image :src="sf(image)" alt="Image" class="img" :preview-src-list="[sf(image)]" />
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="反馈回复图片：" v-else-if="replyed && selectedRow.reply_images[0] == ''">
                <p>院长未上传图片</p>
              </el-form-item>
              <el-form-item label="反馈回复图片：" v-else>
                <ImgUpload
                  @update:toBeUp="ImgSelected"
                  @uploadSuccess="ImgUpSuccess"
                  @forbid="NoUpload"
                  ref="childRef"
                />
              </el-form-item>
            </div>
          </el-form-item>
        </el-form>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="callChildMethod" size="large" type="primary" :disabled="replyed || BtnDis"
            >提交回复</el-button
          >
          <el-button type="primary" size="large" @click="dialogVisible = false"> 关闭 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { getQuestion, putQuestion } from "@/api/question";
import Message from "@/utils/message";
import { sf } from "@/utils/static-file";
import { formatTimestamp } from "@/utils/timeformat";
import ImgUpload from "@/views/components/ImgUpNoBtn.vue";

const loading = ref(true);
const dialogVisible = ref(false); //会话框显示
const selectedRow = ref<any>(); //会话框内容
const tableData = ref<any[]>([]);
const search = ref("");
const replyed = ref(false); //boolen,用于判断是否已经reply过

/*调用图片上传组件的函数*/
const childRef = ref();
const repImg = ref("");
const imgselect = ref(false);
const BtnDis = ref(false); //图片参数错误时禁用上传

const ImgSelected = (toBeUp) => {
  imgselect.value = toBeUp;
};

const ImgUpSuccess = (data) => {
  repImg.value = data.join(";");
};

const NoUpload = (forbidden) => {
  BtnDis.value = forbidden;
};

const filterTableData = computed(() =>
  tableData.value.filter(
    (data) => !search.value || data.proposer_name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const openDialog = (row) => {
  //获取会话框内容
  selectedRow.value = row;
  dialogVisible.value = true;
  console.log("selected row img url:", selectedRow.value.question_images[0]);
  replyed.value = selectedRow.value.reply_texts != "" && selectedRow.value.reply_texts != null;
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
  return question_status === "SUBMITTED" ? "待处理" : question_status === "FINISHED" ? "已答复" : "";
};

const callChildMethod = async () => {
  //上传回复
  if (
    selectedRow.value.reply_texts === "" ||
    selectedRow.value.reply_texts === null ////////////////////////////
  ) {
    Message.warning("请至少填写回复内容后再提交");
    return;
  }
  Message.info("正在提交回复内容");

  if (imgselect.value) {
    await childRef.value!.beginUploadImg();
  } else {
    console.error("子组件实例不存在");
  }
  const id_ = selectedRow.value.question_id;
  const repimg_ = repImg.value;
  const reptex_ = selectedRow.value.reply_texts;

  const submit_reply = await putQuestion(id_, repimg_, reptex_);
  if (submit_reply.code === 200) {
    Message.success("回复成功");
  }

  replyed.value = true;
  dialogVisible.value = false;
  window.location.reload();
};

onMounted(async () => {
  // 通过 API 请求获取数据
  try {
    //console.log("user_name:", userStore.user!.user_name);
    const response = await getQuestion("");

    if (response.code === 200) {
      tableData.value = response.data;
      loading.value = false;
      if (selectedRow.value.reply_texts != null && selectedRow.value.reply_texts != "") {
        //若有reply_texts,则说明是回复过的
        replyed.value = true;
      }
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
  border-width: 1px;
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
  padding: 30px 0;
  text-align: center;
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
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
.dialog-footer {
  text-align: center;
}
.el-divider {
  width: 80%;
  margin-left: 2000px auto;
}
</style>
