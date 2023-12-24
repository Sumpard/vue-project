<template>
  <div>
    <h6>上传图片</h6>
    <el-upload
      multiple
      show-file-list
      list-type="picture-card"
      accept=".jpg,.jpeg,.png"
      :limit="limit"
      :auto-upload="false"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
    >
      <el-icon><Plus /></el-icon>
      <template #tip>
        <div class="el-upload__tip">
          请上传不多于
          <b>{{ limit }}</b>
          张 大小不超过
          <b>{{ fileSize }}MB</b>
          格式为
          <b>{{ fileType.join("/") }}</b>
          的文件
        </div>
      </template>
    </el-upload>
    <el-button type="primary" size="large" @click="handleUpload"> 上传图片 </el-button>
  </div>
</template>

<script lang="ts" setup>
import { Plus } from "@element-plus/icons-vue";
import { ElMessage, UploadFile, UploadProps, UploadUserFile } from "element-plus";

import { uploadImages } from "@/api/upload";

const props = withDefaults(
  defineProps<{
    limit: number;
    fileSize: number;
    fileType: string[];
  }>(),
  {
    limit: 3,
    fileSize: 3,
    fileType: () => ["png", "jpg", "jpeg"],
  }
);

const fileList = reactive<UploadUserFile[]>([]);

const checkFile = ({ raw }: UploadFile) => {
  if (!raw) return false;
  if (!props.fileType.some((t) => `image/${t}` === raw.type)) {
    ElMessage.error("上传图片只能是 JPG/PNG/JPEG 格式!");
    return false;
  }
  if (raw.size > props.fileSize * (1 << 20)) {
    ElMessage.warning(`${raw.name}图片的大小过大`);
    return false;
  }
  return true;
};

const handleChange: UploadProps["onChange"] = (file, files) => {
  if (!checkFile(file)) {
    files.splice(files.length - 1, 1);
    return;
  }
  fileList.push(file);
};
const handleRemove: UploadProps["onRemove"] = (file) => {
  fileList.splice(fileList.indexOf(file), 1);
};
const handleExceed: UploadProps["onExceed"] = (file) => {
  ElMessage.warning(`最多只能上传${props.limit}张图片`);
};

const handleUpload = async () => {
  if (fileList.length === 0) {
    ElMessage.warning("请至少选择一张图片");
    return;
  }
  ElMessage.info("图片上传中");
  await uploadImages(fileList.map((f) => f.raw!));
  ElMessage.success("上传成功");
  fileList.length = 0;
};
</script>
