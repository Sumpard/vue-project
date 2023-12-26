<template>
  <div class="chart-container">
    <p>填写反馈</p>
    <br />
    <el-form :model="questionForm">
      <el-row>
        <el-form-item label="您的姓名：" label-width="100">
          <el-input
            v-model="questionForm.proposer_name"
            placeholder="请输入您的姓名"
            style="width: 27.3vw"
            :disabled="inputDisable"
          ></el-input>
        </el-form-item>
        <div margin-left="auto">
          <el-form-item label="电话号码：" label-width="100">
            <el-input
              v-model="questionForm.proposer_phone_number"
              placeholder="请输入您的电话号码"
              style="width: 27.3vw"
              :disabled="inputDisable"
            ></el-input>
          </el-form-item>
        </div>
      </el-row>
      <el-form-item label="反馈说明：" label-width="100">
        <el-input
          v-model="questionForm.question_texts"
          type="textarea"
          placeholder="请留下您的宝贵建议"
          style="width: 60vw"
          rows="8"
          :disabled="inputDisable"
        ></el-input>
      </el-form-item>
      <el-form-item label="上传图片：（可选）" label-width="100">
        <!-- 图片上传组件 -->

        <ImgUpload @update:toBeUp="ImgSelected" @uploadSuccess="ImgUpSuccess" @forbid="NoUpload" ref="childRef" />
      </el-form-item>

      <el-button @click="callChildMethod" size="large" type="primary" :disabled="BtnDisabled">提交反馈</el-button>
    </el-form>
  </div>
  <el-dialog v-model="dialogVisible" title="温馨提示" width="30%">
    <span>上传成功，您可以前往“反馈记录”查看反馈详情</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Plus } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import { defineProps, reactive, ref } from "vue";

import { submitQuestion } from "@/api/question";
import { useUserStore } from "@/stores/user";
import Message from "@/utils/message";
import ImgUpload from "@/views/components/ImgUpNoBtn.vue";

export default {
  components: { ImgUpload },

  setup() {
    const UploadImg = ref(null);

    function submitImg() {
      //上传函数，用于调用图片上传组件的上传函数
      if (UploadImg.value) {
        UploadImg.value.beginUploadImg(); // 调用子组件的函数
      }
    }
    return {
      submitImg,
    };
  },
  data() {
    return {
      questionForm: {
        // propose_time: '',
        proposer_name: "",
        proposer_phone_number: "",
        question_images: "",
        question_texts: "",
      },
      imgselect: "",
      BtnDisabled: false,
      dialogVisible: false,
      inputDisable: false,
    };
  },
  methods: {
    NoUpload(forbidden) {
      this.BtnDisabled = forbidden;
    },

    ImgUpSuccess(data) {
      //接收图片上传的地址数组
      console.log("图片已上传成功,返回值data将进行赋值,data:", data.data);
      this.questionForm.question_images = data.data.join(";");
      console.log("questionForm.question_images: " + this.questionForm.question_images);
    },

    async callChildMethod() {
      // 通过 ref 访问子组件并调用方法
      await this.$refs.childRef.beginUploadImg();
      if (
        this.questionForm.proposer_name === "" ||
        this.questionForm.proposer_phone_number === "" ||
        this.questionForm.question_texts === ""
      ) {
        Message.warning("请填写所有项目后再提交");
        return;
      }
      Message.info("正在提交反馈内容");

      const time_ = new Date().toISOString();
      const name_ = this.questionForm.proposer_name;
      const phone_ = this.questionForm.proposer_phone_number;
      const imgUrl_ = this.questionForm.question_images;
      const text_ = this.questionForm.question_texts;

      if (this.imgselect) {
        console.log("Image Selected with Question Module");
      } else {
        console.log("No Image Selected");
      }

      const submit_question = await submitQuestion(time_, name_, phone_, imgUrl_, text_);

      console.log("反馈信息： ", time_, name_, phone_, imgUrl_, text_);
      console.log(submit_question);
      if (submit_question.code === 200) {
        Message.success("反馈上传成功");
      }
      this.BtnDisabled = true;
      this.dialogVisible = true;
      this.inputDisable = true;
    },

    ImgSelected(toBeUp) {
      //检查是否有已选的待上传图片\
      this.imgselect = toBeUp;
    },
  },
};

// const questionForm = reactive({
//   propose_time: '',
//   proposer_name: '',
//   proposer_phone_number: '',
//   question_images: '',
//   question_status: '',
//   question_texts: '',
//   reply_images: '',
//   reply_texts:'' ,
// });

// async function onBtn() {
//     let dataForm = new questionForm();
//     dataForm.append('bookName', questionForm.bookName)
//     dataForm.append('bookAuthor', questionForm.bookAuthor)
//     dataForm.append('bookType', questionForm.bookType)
//     dataForm.append('bookDescribe', questionForm.bookDescribe)
//     dataForm.append('bookAmount', questionForm.bookAmount)

// //将图片的二进制通过表单的形式发送到后台
//     fileList.value.forEach((it,index)=>{
//         dataForm.append('filename',it.file)
//     })
//     await axios({
//         method: 'POST',
//         url: 'http://localhost:9002/book/save',
//         data: dataForm,
// //设置请求参数的规则
//         headers: {
//             "Content-Type": "multipart/form-data"
//         }
//     }).then(response => {
//         console.log(response.data)
//     })
// }
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
  text-align: center;
  margin-left: 15% auto;
}

.el-button {
  margin-top: 20px;
}
</style>
