<template>
  <el-button @click="goBack"
    ><el-icon><i-ep-ArrowLeft /></el-icon>返回</el-button
  ><br />
  <h>编辑通知</h><br />
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

import { modifyNotice } from "@/api/notice";
import Message from "@/utils/message";

export default {
  setup() {
    const route = useRoute();
    const modi_content = ref(route.query.content);
    const modi_type = ref(route.query.type);
    const modi_title = ref(route.query.title);
    const modi_time = ref(route.query.time);
    const modi_id = ref(route.query.id);
    const modi_name = ref(route.query.name);
    const userouter = useRouter(); // 获取路由对象

    onMounted(() => {});

    return {
      text: modi_content,
      type: modi_type,
      title: modi_title,
      time: modi_time,
      id: modi_id,
      name: modi_name,
      router: userouter, //路由跳转
    };
  },

  data() {
    return {
      types: ["管理安排", "活动通知", "书院介绍"],
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },

    handleUploadImage(event, insertImage, files) {
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
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
      // console.log("id:", this.id);
      if (!this.title || !this.text || !this.type) {
        Message.warning("请填写所有内容后再提交通知");
        return;
      }

      const res = await modifyNotice(this.id, this.text, this.title, this.type);
      ElMessageBox.confirm("修改成功，您可以选择查看预览或是跳转到通知列表", "提示", {
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
