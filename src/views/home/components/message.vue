<template>
  <div>
    <div class="tw-flex ">
      <p style="font-size: 24px">个人信息</p>
    </div>
    <ElDivider />
    <div class="rin-tr"></div>
    <!-- 表单部分 -->
    <div class=" rin-card mdui-card">
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
        
        <ElFormItem label="邮件地址" prop="email">
          <el-input :disabled="!isEdit" v-model="currentUser.email"></el-input>
        </ElFormItem>
    
      </ElForm>
      <div class="right-button">
        <ElButton type="primary" @click="changeIsEdit(true)" v-if="!isEdit">编辑资料</ElButton>
        <ElButton type="primary" @click="changeIsEdit(false)" v-else>取消</ElButton>
        <ElButton type="success" @click="updateAndFinishEditing" v-if="isEdit">完成</ElButton>
        
      </div>
      </div>
      
      <div class="form rin-card mdui-card">
        <el-form ref="ruleFormRef" :model="editPosswordForm" :rules="rules"  label-position="left"
        label-width="100px">
				<el-form-item label="旧密码" prop="password">
					<el-input v-model="editPosswordForm.password" show-password/>
				</el-form-item>
				<el-form-item label="新密码" prop="newPassword">
					<el-input v-model="editPosswordForm.newPassword" show-password/>
				</el-form-item>
				<el-form-item label="确认密码" prop="confirm">
					<el-input v-model="editPosswordForm.confirm" show-password/>
				</el-form-item>
			</el-form>
			
				<span class="dialog-footer">
					<el-button @click="resetForm(ruleFormRef)">重置</el-button>
					<el-button type="primary" @click="submitForm(ruleFormRef)">
						提交
					</el-button>
				</span>
			
    </div>
  </div>
</template>

<script  lang="ts" setup>
import { ref } from 'vue'
import { PropType } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from "@/stores/user";
import { getUserMe,updatepassword ,updateemail} from "@/api/user";
import { ElMessage } from 'element-plus';


const userStore = useUserStore();

const user = ref();



onMounted(async () => {
  user.value = await userStore.fetch();
  currentUser.email=user.value.email;
  currentUser.role=user.value.user_role;
  currentUser.id=user.value.user_id;
  currentUser. username=user.value.user_name;
  console.log(user.value)
});

const updateAndFinishEditing = async () => {
      // 调用更新 email 的 API
      try {
        const response = await updateemail(currentUser.email);
        console.log('Email updated successfully:', response.data);
        // 更新成功后，将编辑模式设置为 false


        
        ElMessage({
      message: '个人信息更新成功',
       type: 'success',
      })
        changeIsEdit(false);
      } catch (error) {
        console.error('Error updating email:', error);
        // 处理错误，例如显示错误提示
      }
    };


const ruleFormRef = ref<FormInstance>()
const editPosswordForm=reactive({
  newPassword:"",
  password:"",
  confirm:""
})

const equalToPassword = (rule: any, value: any, callback: any) => {
	if (editPosswordForm.newPassword !== value) {
		callback(new Error("两次输入的密码不一致"));
	} else {
		callback();
	}
};
 
//验证规则
 
const rules = reactive<any>({
	password: [
		{ required: true, message: '请输入旧密码', trigger: 'blur' },
	],
	newPassword: [
		{ required: true, message: '请输入新密码', trigger: 'blur' },
	],
	confirm: [
		{ required: true, trigger: "blur", message: "请再次输入您的密码" },
		{ required: true, validator: equalToPassword, trigger: "blur" }
	],
})






const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async(valid, fields) => {
        // 校验成功
        if (valid) {
          try{
            const result= await updatepassword(editPosswordForm.password,editPosswordForm.newPassword)
            console.log(result)
          if (result === 'OK') {
          console.log('密码更改成功');
          } else {
          console.log('Error: ');
          // Handle backend validation errors
          editPosswordForm.password="";
          ElMessage.error('原始密码错误，请重新输入');
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    } 
     else {
        // 校验失败
        console.log('Form validation failed:', fields);
    }
  });
};

//清除校验效果并且清空表单参数的函数
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  
  
};



const formAllinfo =reactive( {
  nickname: 'Tom',
  email: '',
  gender: '',
  introduce: 'No. 189, Grove St, Los Angeles',
  
})


const isEdit = ref(false)

const changeIsEdit = (val: boolean) => {
  isEdit.value = val
}


let currentUser=reactive({
  username:"",
  id:"",
  role:"",
  email:""
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
.form{
  margin:20px 0 0 0 
}
.rin-card {
  /*margin: 20px 0;*/
  padding: 20px 40px;
  /*padding-bottom:0;*/
  
  
}
.tw-flex{
display: flex;
justify-content: space-between;
}
.right-button {
  
 /* Adjust as needed for vertical positioning */
 margin-right: 10px; 
 margin-top: 1px; /* Align the button to the right side */
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