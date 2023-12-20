<template>
    <!-- Form -->
    <el-button  @click="look">
     查看
    </el-button>
   
    <el-button  @click="dialogFormVisible = true">
      新建物品
    </el-button>
    <el-dialog v-model="dialogFormVisible" title="新增物品" :before-close="handleClose" draggable>
      <el-form ref="ruleFormRef" :model="form" :rules="rules">
        <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"  clearable/>
        </el-form-item>
        <el-form-item label="序号" prop="id" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off"  clearable/>
        </el-form-item>
        
        <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option label="使用中" value="USING" />
          <el-option label="开放" value="FREE" />
        </el-select>
        </el-form-item>

        <el-form-item label="类型" prop="type_name" :label-width="formLabelWidth">
        <el-select v-model="form.type_name" placeholder="请选择类型">
          <el-option label="器材" value="equipment" />
          <el-option label="会议室" value="room" />
          <el-option label="座位" value="seat" />
        </el-select>
        </el-form-item>
        
        <el-form-item label="描述" prop="description" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off"  clearable/>
        </el-form-item>
        <el-form-item label="图片" prop="image" :label-width="formLabelWidth">
          <el-input v-model="form.image" autocomplete="off"  clearable/>
        </el-form-item>
        <!-- <el-form-item label="Zones" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择类型">
            <el-option label="Zone No.1" value="shanghai" />
            <el-option label="Zone No.2" value="beijing" />
          </el-select>
        </el-form-item> -->
       </el-form>
       <span class="dialog-footer">
			<el-button @click="resetForm(ruleFormRef)">重置</el-button>
			<el-button type="primary"  @click="submitForm(ruleFormRef)">
			提交
			</el-button>
	 </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { addgoods,getallgoods,getalluser} from "@/api/goods"; 
import type { FormInstance, FormRules } from 'element-plus'

const uploadedImage = ref<string | null>(null);
const uploadApi = '/api/upload';

const beforeUpload = (file: File) => {
  console.log('Before Upload:', file);
  convertFileToBase64(file);
  return false;
};

const handleSuccess = (response: any, file: File) => {
  console.log('Upload Success:', response);
};

const convertFileToBase64 = (file: File) => {
  const reader = new FileReader();
  reader.onload = () => {
    uploadedImage.value = reader.result as string;
  };
  reader.readAsDataURL(file);
};


const ruleFormRef = ref<FormInstance>()
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
  description: "",
  id: "",
  image: "",
  name: "",
  status: "",
  type_name: ""
  })

const rules = reactive<any>({
	name: [
		{ required: true, message: '请输入名称', trigger: 'blur' },
	],
    id: [
		{ required: true, message: '请输入编号', trigger: 'blur' },
	],
    type_name: [
		{ required: true, message: '请选择类型', trigger: 'blur' },
	],
    status: [
		{ required: true, message: '请选择状态', trigger: 'blur' },
	],
    image:[
		{ required: true, message: '请上传图片', trigger: 'blur' },
	],

	
})

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields(); 
  
};



const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async(valid, fields) => {
        // 校验成功
    if (valid) {
        try{    
            const result= await addgoods( form.description,form.id,form.image,form.name,form.status,form.type_name)
            console.log(result)
            if (!result) {
             ElMessage.error('增加失败')
              return
             }  
             ElMessage({ message: '增加物品成功.',type: 'success',})
             dialogFormVisible.value = false
       } catch (error) {
         console.error('Error: ', error);
       }
    }else {
        // 校验失败
        console.log('Form validation failed:', fields);
    }
  });
};



const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确定关闭?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}





const look =async()=>{
    const list= await getallgoods()
    
    console.log(list)

}





</script>
<style scoped>
  .el-button--text {
    margin-right: 15px;
  }
  .el-select {
    width: 300px;
  }
  .el-input {
    width: 300px;
  }
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
  



