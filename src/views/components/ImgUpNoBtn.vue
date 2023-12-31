<template>
  <el-upload
    multiple
    :class="{ hide: hideUpload }"
    action=""
    :http-request="UploadImage"
    :show-file-list="true"
    list-type="picture-card"
    :limit="limit"
    :on-exceed="handleExceed"
    :on-change="handleAvatarChangeIcon"
    :on-remove="handleRemove"
    :auto-upload="false"
    :on-success="onSuccess"
    accept=".jpg,.jpeg,.png"
    :file-list="fileList"
    ><el-icon><Plus /></el-icon>
  </el-upload>

  <!-- 超出上传限制数提示弹窗 -->
  <el-dialog v-model="dialogVisible" title="温馨提示" width="30%">
    <template v-if="limit"
      ><span>最多只能上传{{ limit }}张图片</span></template
    >
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
  <div class="el-upload__tip" slot="tip" v-if="isShowTip">
    你可以上传不多于
    <template v-if="limit"
      ><b>{{ limit }}</b></template
    >
    <template v-if="fileSize">
      张大小不超过 <b>{{ fileSize }}MB</b>
    </template>
    <template v-if="fileType">
      格式为 <b>{{ fileType.join("/") }}</b>
    </template>
    的文件
  </div>
</template>

<script lang="ts" setup>
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

import { uploadQuestionImages } from "@/api/upload";

const props = defineProps({
  limit: {
    //最多允许传几张图
    type: Number,
    default: 3,
  },
  fileSize: {
    //允许的单张图片最大大小
    type: Number,
    default: 3,
  },
  fileType: {
    //允许的文件类型
    type: Array,
    default: () => ["png", "jpg", "jpeg"],
  },
  isShowTip: {
    //是否显示提示
    type: Boolean,
    default: true,
  },
  router: {
    //你图片要上传的路由
    type: String,
    default: "/question/upload",
  },
});

const emits = defineEmits(["uploadSuccess", "update:toBeUp", "forbid", "uploadFailefailed"]); //成功上传图片传给父组件data[]

const dialogVisible = ref(false);
const BtnDisabled = ref(false);
const hideUpload = ref(false);
const toBeUp = ref(false); //是否已有图片被选择上传
const forbidden = ref(false);

function handleExceed(files, fileList) {
  dialogVisible.value = true;
}

const fileList = ref([]);

//const imageUrl = ref(''); //存储图片地址

function handleAvatarChangeIcon(file) {
  const isJPEG = file.raw.type === "image/jpeg";
  const isPNG = file.raw.type === "image/png";
  const isJPG = file.raw.type === "image/jpg";

  if (!isPNG && !isJPG && !isJPEG) {
    ElMessage.error("上传图片只能是 JPG/PNG/JPEG 格式!");
    forbidden.value = true; //图片参数错误，禁止继续上传
    emits("forbid", forbidden);
    return false;
  }
  if (props.fileSize) {
    const isLt = file.size / 1024 / 1024 < props.fileSize;
    console.log("文件大小： " + file.size / 1024 / 1024 + " MB");
    if (!isLt) {
      ElMessage({
        message: `${file.name}图片的大小过大`,
        type: "warning",
      });
      forbidden.value = true; //图片参数错误，禁止继续上传
      emits("forbid", forbidden);
      fileList.value.push(file);
      return false;
    }
  }
  fileList.value.push(file); // 将文件添加到fileList数组中
  console.log("image appended to fileList.");
  console.log("fileList length: " + fileList.value.length + "\n");
  hideUpload.value = fileList.value.length >= props.limit; //隐藏上传按钮

  toBeUp.value = fileList.value.length > 0; //检测是否有待传递的图片
  emits("update:toBeUp", toBeUp);
}

function handleRemove(file) {
  const index = fileList.value.indexOf(file);
  console.log("image removed from fileList.");
  fileList.value.splice(index, 1);
  console.log("fileList length: " + fileList.value.length + "\n");
  hideUpload.value = fileList.value.length >= props.limit;

  toBeUp.value = fileList.value.length > 0; //检测是否有待传递的图片
  emits("update:toBeUp", toBeUp);
}

const beginUploadImg = ref(async () => {
  //点击按钮开始上传

  console.log("Before upload");
  console.log("fileList length: " + fileList.value.length + "\n");

  // if(!fileList.value.length){
  //   console.log("no image selected.");
  //   ElMessage.warning("请至少选择一张图片");
  //   return false;
  // }

  const allFilesWithinSizeLimit = fileList.value.every((file) => {
    const fileSizeLimit = props.fileSize * 1024 * 1024; // 将文件大小限制转换为字节
    return file.size <= fileSizeLimit;
  });

  if (!allFilesWithinSizeLimit) {
    console.log("文件大小超过限制");
    ElMessage.error("上传失败，所选图片包含不符合要求的项目");
    return false;
  }

  fileList.value.forEach((file) => {
    console.log(`文件名: ${file.name}, 大小: ${file.size / 1024 / 1024} MB`);
  });

  //开始上传
  const res = await uploadQuestionImages(fileList.value.map((t) => t.raw!));
  if (res.code === 200) {
    onSuccess();
    emits("uploadSuccess", res.data);
  } else {
    emits("uploadFailefailed");
  }
});

function onSuccess() {
  BtnDisabled.value = true;
  hideUpload.value = true; //隐藏上传按钮
}

defineExpose({
  beginUploadImg,
});
</script>

<style scoped>
.hide .el-upload--picture-card {
  display: none;
}
</style>
