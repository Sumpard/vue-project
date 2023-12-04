<template>
  <div>
    <div class="tw-flex ">
      <p style="font-size: 32px">个人信息</p>
      <div class="right-button">
        <ElButton type="primary" @click="changeIsEdit(true)" v-if="!isEdit">编辑资料</ElButton>
        <ElButton type="primary" @click="changeIsEdit(false)" v-else>取消</ElButton>
        <ElButton type="success" @click="changeIsEdit(false)" v-if="isEdit">完成</ElButton>
        
      </div>
    </div>
    <ElDivider />
    <div class="rin-tr"></div>
    <!-- 表单部分 -->
    <div class="form rin-card mdui-card">
      <ElForm
        ref="formInstance"
        label-position="left"
        label-width="100px"
       
        :model="formAllinfo"
        style="max-width: 600px"
      >
        <ElFormItem label="用户名">
          <p>{{ currentUser.username }}</p>
        </ElFormItem>
        <ElFormItem label="uid">
          <p>{{ currentUser.id }}</p>
        </ElFormItem>
        <ElFormItem label="角色" class="formLabwel">
          <p>{{ currentUser.role }}</p>
        </ElFormItem>
        <ElFormItem label="昵称" prop="nickname">
          <el-input :disabled="!isEdit" v-model="formAllinfo.nickname"></el-input>
        </ElFormItem>
        <ElFormItem label="邮件地址" prop="email">
          <el-input :disabled="!isEdit" v-model="formAllinfo.email"></el-input>
        </ElFormItem>
        <ElFormItem label="性别">
          <ElRadioGroup :disabled="!isEdit" v-model="formAllinfo.gender">
            <ElRadio label="1">男</ElRadio>
            <ElRadio label="2">女</ElRadio>
          </ElRadioGroup>
        </ElFormItem>
        
        <ElFormItem label="简介" prop="introduce">
          <ElInput
            :disabled="!isEdit"
            v-model="formAllinfo.introduce"
            type="textarea"
            show-word-limit
            maxlength="32"
          ></ElInput>
        </ElFormItem>
      </ElForm>
    </div>
  </div>
</template>

<script  lang="ts" setup>
import { ref } from 'vue'
import { PropType } from 'vue'
const formAllinfo =reactive( {
  nickname: 'Tom',
  email: 'California',
  gender: '',
  introduce: 'No. 189, Grove St, Los Angeles',
  
})


const isEdit = ref(false)

const changeIsEdit = (val: boolean) => {
  isEdit.value = val
}


let currentUser=reactive({
  
  username:"哈哈哈",
  id:"12343245",
  role:"guest"
})







//    import { useFormGroup } from '@/hooks/Home'

//   defineProps({
//     formAllinfo: {
//     //   type: Object as PropType<UpdateUserInfoParams>,
//       default: () => {
//         return {}
//       }
//     },
//     currentUser: {
//     //   type: Object as PropType<UserAll>,
//       default: () => {
//         return {}
//       }
//     }
//   })
//   const emit = defineEmits(['changeInfo'])

//    const { formSubmit, changeIsEdit, formInstance, rules, isEdit } = useFormGroup(emit)


</script>


<style style="less" scoped>
@import url('https://cdn.jsdelivr.net/gh/AyagawaSeirin/homepage@latest/mdui/css/mdui.min.css');

.rin-card {
  /*margin: 20px 0;*/
  padding: 20px 25px;
  /*padding-bottom:0;*/
  
  
}
.tw-flex{
display: flex;
justify-content: space-between;
}
.right-button {

 /* Adjust as needed for vertical positioning */
 margin-right: 10px; 
 margin-top: 20px; /* Align the button to the right side */
/* Add other styles for your button as needed */
}
</style>

<style lang="scss" scoped>
.formStar {
font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC",
sans-serif;
font-weight: 200;
font-style: normal;
font-size: 12px;
color: #fb0404;
padding: 5px;
}
.formLabel {
font-size: 20px;
color: #333333;
font-family: "MicrosoftYaHeiLight", "微软雅黑 Light", "微软雅黑", sans-serif;
font-weight: 200;
line-height: 30px;
}
</style>