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
import { ElMessageBox } from "element-plus";

import { modifyNotice } from "@/api/notice";
import { uploadNoticeImages } from "@/api/upload";
import Message from "@/utils/message";
import { sf } from "@/utils/static-file";

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

    async handleUploadImage(event, insertImage, files) {
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
      event.preventDefault();
      const res = await uploadNoticeImages([files[0]]);
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
          this.router.push({ path: "/adminnoticelist" });
        });
    },
  },
};
</script>
