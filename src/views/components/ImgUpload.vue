<template>
  <el-form>
    <el-form-item label="上传图片：" label-width="100">
      <el-upload
          multiple
          action=""
          :http-request="UploadImage"
          :show-file-list="true"
          list-type="picture-card"
          :limit="limit"
          :on-exceed="handleExceed"
          :on-change="handleAvatarChangeIcon"
          :on-remove="handleRemove"
          :auto-upload="false"
          :on-success="onSuccess"
          accept=".jpg,.jpeg,.png"
          ><el-icon><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <div style="text-align: center">
        <el-button type="primary" size="large" 
                  position="relative"
                  display="flex"
                  justify-content="flex-end"
                  @click="onBtn"
                  :disabled="BtnDisabled"
        >上传图片</el-button>
      </div>
    </el-form-item>
      <!-- 超出上传限制数提示弹窗 -->
      <el-dialog
          v-model="dialogVisible"
          title="温馨提示"
          width="30%"
      >
          <template v-if="limit"><span>最多只能上传{{limit}}张图片</span></template>
          <template #footer>
              <span class="dialog-footer">
                  <el-button type="primary" @click="dialogVisible = false">
                      确认
                  </el-button>
              </span>
          </template>
      </el-dialog>
      <el-form-item>
      <div class="el-upload__tip" slot="tip" v-if="isShowTip">
          请上传不多于
          <template v-if="limit"><b>{{ limit }}</b></template>
          <template v-if="fileSize"> 张大小不超过 <b>{{ fileSize }}MB</b> </template>
          <template v-if="fileType"> 格式为 <b>{{ fileType.join("/") }}</b> </template>
          的文件
        </div>
      </el-form-item>
  </el-form>

</template>

<script lang=ts setup>
import {ref, reactive, defineProps} from "vue";
import axios from "axios";
import { Plus } from '@element-plus/icons-vue';
import { UploadProps, UploadFile, ElMessage } from 'element-plus';
import { VueCookies } from 'vue-cookies';
import { inject } from 'vue';



const props = defineProps({
  limit: {
    type: Number,
    default: 3,
  },
  fileSize: {
    type: Number,
    default: 3,
  },
  fileType: {
    type: Array,
    default: () => ["png", "jpg", "jpeg"],
  },
  isShowTip: {
    type: Boolean,
    default: true,
  },
});

const dialogVisible = ref(false);
const BtnDisabled = ref(false);

function handleExceed(files, fileList) {
  dialogVisible.value = true;
}

const fileList = ref([])

//const imageUrl = ref(''); //存储图片地址

function handleAvatarChangeIcon(file){
	const isJPEG = file.raw.type === 'image/jpeg';
	const isPNG = file.raw.type === 'image/png';
	const isJPG = file.raw.type === 'image/jpg';

	if (!isPNG && !isJPG && !isJPEG) {
		ElMessage.error('上传图片只能是 JPG/PNG/JPEG 格式!');
		return false;
	} 
  if (props.fileSize) {
    const isLt = file.size / 1024 / 1024 < props.fileSize;
    console.log("文件大小： "+file.size/1024/1024+" MB")
    if (!isLt) {
      ElMessage({
        message:`${file.name}图片的大小过大`,
        type:'warning',
      });
      fileList.value.push(file);
      return false;
    }
  }
  fileList.value.push(file); // 将文件添加到fileList数组中
  console.log("image appended to fileList.");
  console.log("fileList length: " + fileList.value.length +'\n');
}

function handleRemove(file) {
  const index = fileList.value.indexOf(file);
  console.log("image removed from fileList.");
  fileList.value.splice(index, 1);
  console.log("fileList length: " + fileList.value.length+'\n');
}















const uploadUrl = "http://120.46.203.58:8080/question/upload";
const $cookies = inject('$cookies')!;

async function onBtn() {//点击按钮开始上传

  console.log("Before upload");
  console.log("fileList length: " + fileList.value.length+'\n');

  if(!fileList.value.length){
    console.log("no image selected.");
    ElMessage.warning("请至少选择一张图片");
    return false;
  }

  const allFilesWithinSizeLimit = fileList.value.every(file => {
    const fileSizeLimit = props.fileSize * 1024 * 1024; // 将文件大小限制转换为字节
    return file.size <= fileSizeLimit;
  });

  if (!allFilesWithinSizeLimit) {
    console.log("文件大小超过限制");
    ElMessage.error("上传失败，所选图片包含不符合要求的项目");
    return false;
  }

  fileList.value.forEach(file => {
    console.log(`文件名: ${file.name}, 大小: ${file.size / 1024 / 1024} MB`);
  })

  ElMessage({
    message: '图片上传中',
    type: 'warning',
  })

  //开始上传
  console.log("开始上传图片");
  const dataForm = new FormData();//新建formdata
  console.log("创建formData");
  fileList.value.forEach(file => {
    dataForm.append("files", file.raw);
    console.log("图片信息",file);
    console.log("formdata value:",dataForm.get("files"));
  })


    const token = $cookies.get("token"); // 使用 vue-cookies 获取 token
    if (!token) {
        console.error("Token不存在,请登录获取");
        return;
    }
    console.log("token: "+ token);

    console.log('Request data:', dataForm);

    await axios({
        timeout: 10000,
        method: 'POST',
        url: uploadUrl,
        data: dataForm,
//设置请求参数的规则
        headers: {
            "Content-Type": "multipart/form-data",
            "token": `${token}`,
        }
    }).then(res => {
    console.log(res.data);
    console.log('Full response:', res);
    if (res.status === 200) {
      ElMessage({
        message: '图片上传成功',
        type: 'success',
      });
    }
  }).catch(function(error){console.log("Error:",error);});

}

function onSuccess(){
  BtnDisabled.value=true;
}

</script>
