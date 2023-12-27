<template>
  <h>编辑通知</h>
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
import axios from "axios";
import { ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";

import { postNotice } from "@/api/notice";
import { useUserStore } from "@/stores/user";
import Message from "@/utils/message";
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
    handleUploadImage(event, insertImage, files) {
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
      console.log(files);
      console.log("调用图片上传");
      event.preventDefault();
      let file = files[0];
      let formData = new FormData();
      formData.append("smfile", file);
      axios
        .post("/sm/api/v2/upload", formData, {
          //添加了跨域代理，这里的/proxy就是https://sm.ms/
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "YJ2Vy2lQb4pooGHKCeWbVqcgfwhnSS7u",
          },
        })
        .then((response) => {
          const imageUrl = response.data.data.url;
          console.log(imageUrl);
          // 将图片链接插入到Markdown编辑器中
          insertImage({
            url: imageUrl,
            width: "auto",
            height: "auto",
          });
        })
        .catch((error) => {
          console.error("图片上传失败", error);
        });
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
      console.log("time:", this.time);

      this.user = useUserStore().user!.user_name;
      const res = await postNotice(this.text, this.title, this.type, this.time, this.user);
      console.log(res);
      ElMessageBox.confirm("编辑成功，您可以选择查看预览或是跳转到通知列表", "提示", {
        confirmButtonText: "查看预览",
        cancelButtonText: "通知列表",
        type: "success",
      })
        .then(() => {
          this.router.push({
            path: "/noticepreview",
            query: {
              content: this.text,
              type: this.type,
              title: this.title,
              time: this.time,
              name: this.name,
            },
          });
        })
        .catch(() => {
          this.router.push({ path: "/noticelist" });
        });
    },
  },
};
</script>
