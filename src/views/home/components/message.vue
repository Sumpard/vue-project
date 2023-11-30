<template>
    <div>
      <div class="tw-flex tw-justify-between tw-items-center">
        <p style="font-size: 32px">详细信息</p>
        <div class="buttongroup">
          <ElButton type="primary" @click="changeIsEdit(true)" v-if="!isEdit">编辑资料</ElButton>
          <ElButton type="primary" @click="changeIsEdit(false)" v-else>取消</ElButton>
          <ElButton type="success" @click="changeIsEdit(false)" v-if="isEdit">完成</ElButton>
          
        </div>
      </div>
      <ElDivider />
      <!-- 表单部分 -->
      <div class="form">
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
          <ElFormItem label="角色">
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
  