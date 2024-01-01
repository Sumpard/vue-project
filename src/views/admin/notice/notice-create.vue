<template>
  <h6>编辑通知</h6>
  <el-form>
    <el-form-item label="选择通知类型:">
      <el-select v-model="type" placeholder="通知类型">
        <el-option v-for="option in types" :value="option" />
      </el-select>
    </el-form-item>

    <el-form-item label="通知标题:">
      <el-input v-model="title" clearable placeholder="请输标题"></el-input>
    </el-form-item>
  </el-form>

  <v-md-editor
    v-model="text"
    height="600px"
    :disabled-menus="[]"
    @upload-image="handleUploadImage"
    @save="submitnotice"
  />
</template>

<script lang="ts">
import { ElMessageBox } from "element-plus";

import { postNotice } from "@/api/notice";
import { uploadNoticeImages } from "@/api/upload";
import { useUserStore } from "@/stores/user";
import Message from "@/utils/message";
import { sf } from "@/utils/static-file";
import { formatTimestamp } from "@/utils/timeformat";

export default {
  setup() {
    const userouter = useRouter(); // 获取路由对象
    onMounted(() => {});

    return {
      router: userouter, //路由跳转
    };
  },

  data() {
    return {
      text: "",
      type: "",
      title: "",
      types: ["管理安排", "活动通知", "书院介绍"],
      time: "",
      user: "",
    };
  },
  methods: {
    async handleUploadImage(event, insertImage, files) {
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
      event.preventDefault();
      const res = await uploadNoticeImages(files);
      console.log("upload response:", res);
      if (res.code === 200) {
        insertImage({
          url: sf(res.data),
          width: "auto",
          height: "auto",
        });
      } else {
        Message.warning("图片上传失败 错误代码" + res.code + "，请联系管理人员");
      }
    },

    async submitnotice() {
      // console.log("text:",this.text);
      // console.log("type:", this.type);
      // console.log("title:", this.title);
      if (!this.title || !this.text || !this.type) {
        Message.warning("请填写所有内容后再提交通知");
        return;
      }

      const currentTimestamp = Date.now();
      this.time = formatTimestamp(currentTimestamp);

      this.user = useUserStore().user!.user_name;
      const res = await postNotice(this.text, this.title, this.type, this.time, this.user);
      if (res.code === 200) {
        ElMessageBox.confirm("编辑成功，您可以选择查看预览或是跳转到通知列表", "提示", {
          confirmButtonText: "查看预览",
          cancelButtonText: "通知列表",
          type: "success",
        })
          .then(() => {
            this.router.push({ name: "notice-detail", params: { noticeId: res.data } });
          })
          .catch(() => {
            this.router.push({ path: "list" });
          });
      }
    },
  },
};
</script>
