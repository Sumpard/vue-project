<template>
  <div class="my-info">
    <div class="rin-card"><addgoods /></div>
    <el-dialog v-model="dialogVisible" title="上传文件" draggable>
      <el-upload
        class="upload-dialog"
        :before-upload="beforeUpload"
        drag
        :auto-upload="false"
        :on-change="onchange"
        show-file-list
        list-type="picture"
        :limit="1"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5MB</div>
      </el-upload>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitUpload">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-divider class="divide" />

    <el-table
      v-loading="loading"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      :data="filterTableData"
      max-height="550"
      highlight-current-row
    >
      <el-table-column prop="available_id" label="编号"></el-table-column>
      <el-table-column prop="available_name" label="名称"></el-table-column>
      <el-table-column prop="available_type_name" label="类型"></el-table-column>
      <el-table-column prop="available_status" label="状态">
        <template v-slot="{ row }">
          <template v-if="!row.editingstatus">
            {{ mapstatus(row.available_status) }}
          </template>
          <template v-if="row.editingstatus">
            <el-select
              v-model="row.editedstatus"
              placeholder="请选择状态"
              :filters="[
                { text: '正在使用', value: 'USING' },
                { text: '可借用', value: 'FREE' },
              ]"
              :filter-method="filterTag"
              filter-placement="bottom-end"
            >
              <el-option label="正在使用" value="USING" />
              <el-option label="可借用" value="FREE" />
            </el-select>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="available_description" label="描述" width="200px">
        <template v-slot="{ row }">
          <template v-if="!row.editingdescription">
            {{ row.available_description }}
          </template>
          <template v-if="row.editingdescription">
            <el-form class="center" ref="ruleFormRef" :model="form" :rules="rules">
              <el-form-item :cell-style="{ 'text-align': 'center' }" prop="available_description">
                <div>
                  <el-input class="center" v-model="form.available_description" />
                </div>
              </el-form-item>
            </el-form>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="修改" fixed="right" width="250">
        <template v-slot="{ row }">
          <el-button type="primary" link size="small" @click="showUploadDialog(row)">更新图片</el-button>

          <el-button
            type="primary"
            link
            size="small"
            @click="starteditingdescription(row)"
            v-if="!row.editingdescription"
            >修改描述</el-button
          >
          <el-button
            type="success"
            link
            size="small"
            @click="saveeditingdescription(row, ruleFormRef, form)"
            v-if="row.editingdescription"
            >保存描述</el-button
          >
          <el-button type="primary" link size="small" @click="starteditingstatus(row)" v-if="!row.editingstatus"
            >修改状态</el-button
          >
          <el-button type="success" link size="small" @click="saveeditingstatus(row)" v-if="row.editingstatus"
            >保存状态</el-button
          >
          <el-button @click="deleteTableData(row)" link :icon="Delete" type="primary"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { Delete, Edit, Search, Share, Upload } from "@element-plus/icons-vue";
import type { FormInstance, FormRules, UploadInstance } from "element-plus";
import { computed, getCurrentInstance, onMounted, ref } from "vue";

import { deletegood, editdescription, editstatus, getAllGoods, upload } from "@/api/goods";
import addgoods from "@/views/managegoods/add.vue";

const loading = ref(true);
const ruleFormRef = ref<FormInstance>();
const tableData = ref([]);
const search = ref("");
const dialogVisible = ref(false);
const File = ref();
const id = ref<number>(0);

const beforeUpload = (file: any) => {
  // 在上传之前的钩子，可用于文件类型和大小的校验
  const isJPG = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJPG) {
    ElMessage.error("只能上传jpg/png文件！");
    return false;
  }
  const isLt500K = file.size / 1024 / 1024 < 5;
  if (!isLt500K) {
    ElMessage.error("文件大小不能超过5MB！");
    return false;
  }
  return true;
};

const onchange = (file: any) => {
  File.value = file.raw;
};

const showUploadDialog = (row: any) => {
  dialogVisible.value = true;
  id.value = row.available_id;
};

const submitUpload = async () => {
  try {
    const result4 = await upload(id.value, File.value);
    if (result4.code !== 200) {
      ElMessage.error("更新图片失败");
      return;
    }
    ElMessage({ message: "更新成功", type: "success" });
    dialogVisible.value = false;
  } catch (error) {
    console.error("Failed to save editing:", error);
  }
};

const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.user_id.toLowerCase().includes(search.value.toLowerCase()) ||
      data.user_name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const form = reactive({
  available_description: undefined,
});

const rules = reactive<any>({
  available_description: [{ required: true, message: "请输入分数", trigger: "blur" }],
});

const filterTag = (value: string, row: any) => {
  return row.a === value;
};

const starteditingdescription = (row: any) => {
  // 进入编辑模式
  form.available_description = row.available_description;
  row.editingdescription = true;
};

const starteditingstatus = (row: any) => {
  // 进入编辑模式
  row.editedstatus = row.available_status;
  row.editingstatus = true;
};

const mapstatus = (status: any) => {
  // 映射user_role到相应的文本
  return status === "USING" ? "正在使用" : status === "FREE" ? "可借用" : "";
};

const saveeditingdescription = async (row: any, formEl: FormInstance | undefined, form: any) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    // 校验成功
    if (valid) {
      try {
        const result = await editdescription(row.available_id, row.available_description);

        if (!result) {
          ElMessage.error("修改描述失败");
          return;
        }

        ElMessage({ message: "修改描述成功", type: "success" });
        row.editingdescription = false;
        row.available_description = form.available_description;
      } catch (error) {
        console.error("Failed to save editing:", error);
      }
    } else {
      // 校验失败
    }
  });
};

const deleteTableData = async (row: any) => {
  try {
    const result3 = await deletegood(row.available_id);
    if (result3.code !== 200) {
      ElMessage.error("删除失败");
      return;
    }
    ElMessage({ message: "删除成功", type: "success" });
    const index = tableData.value.indexOf(row);
    if (index !== -1) {
      tableData.value.splice(index, 1);
    }
  } catch (error) {
    console.error("Failed to save editing:", error);
  }
};

const saveeditingstatus = async (row: any) => {
  try {
    const result2 = await editstatus(row.available_id, row.editedstatus);

    if (!result2) {
      ElMessage.error("修改状态失败");
      return;
    }
    ElMessage({ message: "修改状态成功", type: "success" });
    row.editingstatus = false;
    row.available_status = row.editedstatus;
  } catch (error) {
    console.error("Failed to save editing:", error);
  }
};

onMounted(async () => {
  // 通过 API 请求获取数据
  try {
    const response = await getAllGoods();
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
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
