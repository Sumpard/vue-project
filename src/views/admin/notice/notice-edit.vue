<template>
  <el-button @click="goBack">
    <el-icon><i-ep-ArrowLeft /> </el-icon>返回
  </el-button>
  <h6>编辑通知</h6>
  <div v-if="notice">
    <el-form>
      <el-form-item label="选择通知类型">
        <el-select v-model="notice.notice_type" placeholder="通知类型">
          <el-option v-for="option in types" :value="option" />
        </el-select>
      </el-form-item>

      <el-form-item label="通知标题">
        <el-input v-model="notice.notice_title" clearable placeholder="请输标题" />
      </el-form-item>
    </el-form>

    <v-md-editor
      v-model="notice.notice_content"
      height="600px"
      :disabled-menus="[]"
      @upload-image="handleUploadImage"
      @save="saveNotice"
    />
  </div>
</template>

<script setup lang="ts">
import { ElMessageBox } from "element-plus";

import { getNotice, modifyNotice } from "@/api/notice";
import { uploadNoticeImages } from "@/api/upload";
import { Notice } from "@/interfaces/notice";
import Message from "@/utils/message";
import { sf } from "@/utils/static-file";

const props = defineProps<{ noticeId: string }>();

const router = useRouter();

const types = ["管理安排", "活动通知", "书院介绍"];

const notice = ref<Notice>();

onMounted(async () => {
  console.log(props);
  notice.value = await getNotice(parseInt(props.noticeId));
});

async function handleUploadImage(event: Event, insertImage: any, files: File[]) {
  // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
  event.preventDefault();
  const res = await uploadNoticeImages(files);
  if (res.code === 200) {
    insertImage({
      url: sf(res.data),
      width: "auto",
      height: "auto",
    });
  } else {
    Message.warning(`图片上传失败 错误代码${res.code}，请联系管理人员`);
  }
}

async function saveNotice() {
  if (!(notice.value?.notice_title && notice.value?.notice_content && notice.value?.notice_type)) {
    Message.warning("请填写所有内容后再提交通知");
    return;
  }

  const res = await modifyNotice(notice.value);
  ElMessageBox.confirm("修改成功，您可以选择查看预览或是跳转到通知列表", "提示", {
    confirmButtonText: "查看预览",
    cancelButtonText: "通知列表",
    type: "success",
  })
    .then(() => {
      router.push({ name: "notice-detail", params: { noticeId: notice.value!.notice_id } });
    })
    .catch(() => {
      router.push({ name: "admin-notice-list" });
    });
}

const goBack = () => {
  router.back();
};
</script>
