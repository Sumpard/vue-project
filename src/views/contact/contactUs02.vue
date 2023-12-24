<template>
  <div class="chart-container">
    <p>填写反馈</p>
    <br />
    <el-form :model="formData">
      <el-form-item label="反馈说明：" label-width="100">
        <el-input
          v-model="formData.bookDescribe"
          type="textarea"
          placeholder="请留下您的宝贵建议"
          style="width: 70vw"
          rows="8"
        ></el-input>
      </el-form-item>
      <el-form-item label="上传图片：" label-width="100">
        <el-upload :http-request="httpRequest" multiple :show-file-list="true" list-type="picture-card"
          ><el-icon><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <div style="text-align: center">
        <el-button type="primary" size="large" position="relative" @click="onBtn">确认提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue";
import axios from "axios";
import { reactive, ref } from "vue";

const formData = reactive({
  bookName: "",
  bookAuthor: "",
  bookType: "",
  bookDescribe: "",
  bookAmount: "",
});

//定义一个响应式数组用来接收图片
const fileList = ref([]);

//自定义函数用来覆盖原有的XHR行为（默认提交行为）
function httpRequest(option) {
  //将图片存到数组中
  fileList.value.push(option);
}

async function onBtn() {
  let dataForm = new FormData();
  dataForm.append("bookName", formData.bookName);
  dataForm.append("bookAuthor", formData.bookAuthor);
  dataForm.append("bookType", formData.bookType);
  dataForm.append("bookDescribe", formData.bookDescribe);
  dataForm.append("bookAmount", formData.bookAmount);

  //将图片的二进制通过表单的形式发送到后台
  fileList.value.forEach((it, index) => {
    dataForm.append("filename", it.file);
  });
  await axios({
    method: "POST",
    url: "http://localhost:9002/book/save",
    data: dataForm,
    //设置请求参数的规则
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((response) => {
    console.log(response.data);
  });
}
</script>

<style>
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /*height: calc(100% - 30px);*/
  height: 66vh;
  background-color: #ffffff;
  font-size: 25px;
}
</style>
