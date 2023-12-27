<template>
  <!-- 左边 -->
  <div class="mdui-card my-info-easy background-div">
    <!-- icon 头像 -->
    <div class="container">
      <img id="touxiang" src="https://zxz.ee/touxiang.png" />
      <el-icon class="click" size="25px" @click="showUploadDialog"><i-ep-CirclePlus /></el-icon>
    </div>
    <el-dialog v-model="dialogVisible" title="上传文件" draggable>
      <el-upload
        class="upload-dialog"
        :before-upload="beforeUpload"
        drag
        :auto-upload="false"
        :on-change="onchange"
        show-file-list
        list-type="picture"
        :limit="1"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5MB</div>
      </el-upload>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitUpload">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- <div class="avatar">
      <UploadAvatar @imglink="changeAvatar" :is-show="true" :avatar="currentUser.avatar" v-if="currentUser.avatar" />
    </div> -->
    <!-- <div class="infobox">
    
      <div class="username">
        {{ currentUser.nickname }}
        <i class="iconfont icon-nansheng" v-if="currentUser.gender === '1'"></i>
        <i class="iconfont icon-nvsheng" v-else></i>
      </div>
      
      <div class="introuce">{{ currentUser.introduce }}</div>
      
      <div class="more-info">
        <div class="email"><i class="iconfont icon-riqi"></i>创建日期:{{ currentUser.date }}</div>
        <div class="email">
          <i class="iconfont icon-youjian"></i>邮件:{{
            currentUser.email ? currentUser.email : '未设置'
          }}
        </div>
        <div class="email">
          <i class="iconfont icon-gerenzhongxin"></i>用户名:{{ currentUser.username }}
        </div>
      </div>
    </div> -->
  </div>
</template>
<script lang="ts" setup>
import dayjs from "dayjs";

import { uploadava } from "@/api/user";

const now = new Date();

const dialogVisible = ref(false);
const File = ref();
const emit = defineEmits(["changeAvatar"]);

const showUploadDialog = () => {
  dialogVisible.value = true;
};

const onchange = (file: any) => {
  File.value = file.raw;
};

const beforeUpload = (file: any) => {
  // 在上传之前的钩子，可用于文件类型和大小的校验
  const isJPG = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJPG) {
    ElMessage.error("只能上传jpg/png文件！");
    return false;
  }
  const isLt500K = file.size / 1024 / 1024 < 5;
  if (!isLt500K) {
    ElMessage.error("文件大小不能超过5MB！");
    return false;
  }
  return true;
};

const submitUpload = async () => {
  try {
    const result5 = await uploadava(File.value);
    console.log(result5);
    if (result5.code !== 200) {
      ElMessage.error("更新图片失败");
      return;
    }
    ElMessage({ message: "更新成功", type: "success" });
    dialogVisible.value = false;
  } catch (error) {
    console.error("Failed to save editing:", error);
  }
};

const changeAvatar = (url: string) => {
  emit("changeAvatar", url);
};
</script>

<style lang="scss" scoped>
@import url("https://cdn.jsdelivr.net/gh/AyagawaSeirin/homepage@latest/mdui/css/mdui.min.css");

.container {
  position: relative;
  width: 200px; /* 调整根据实际需要的尺寸 */
  height: 200px; /* 调整根据实际需要的尺寸 */
  border-radius: 50%;
}
.click {
  position: relative;
  left: 145px;
  top: -25px;
}
#touxiang {
  /* 定义头像的高和宽 */
  height: 128px;
  width: 128px;
  /* 让头像变成圆的 */
  border-radius: 50%;
  /* 将图片转换为块元素并居中 */
  display: block;
  margin: 0 0 0 50px;
  /* 定义图片默认旋转速度 */
  transition: all 0.5s;
  -ms-transition: all 0.5s;
  -moz-transition: all 1s;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  /* 头像呼吸灯 */
  animation: light 4s ease-in-out infinite;
}
@keyframes light {
  0% {
    box-shadow: 0 0 4px #f00;
  }

  25% {
    box-shadow: 0 0 16px #0f0;
  }

  50% {
    box-shadow: 0 0 4px #00f;
  }

  75% {
    box-shadow: 0 0 16px #0f0;
  }

  100% {
    box-shadow: 0 0 4px #f00;
  }
}
#touxiang:hover {
  transform: rotate(360deg);
  -ms-transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
  -o-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  transform: scale(0.9) rotate(720deg);
}

@media screen and (min-width: 320px/* 用实际的数值替换 */) {
  .background-div {
    background-color: white; /* Set the background image using the 'url()' function */
    background-image: url("/img/6.jpg");
    /* Adjust background properties as needed */
    background-size: cover;
    background-position: 40% 90%;
    /* Specify the height of the div */
    height: 305px;
    /* Add other styles as needed */
  }

  .my-info-easy {
    padding: 2rem;
    display: flex;
    width: 100%;
    flex-shrink: 0;
    align-items: center;
    flex-direction: row;
  }

  .my-info-easy .avatar {
    width: 150px;
    height: 150px;
    color: blueviolet;
  }

  .my-info-easy .infobox {
    width: 100%;
    text-align: left;
    padding-left: 20px;
    margin-top: 1rem;
    flex: 1;
  }

  .my-info-easy .infobox .username {
    font-size: 30px;

    /* 使用下划线的方式处理 .text-line-show(1) */
    text-decoration: underline;

    /* 这里省略了 .iconfont 样式的定义，需要根据实际情况填写 */
  }

  .my-info-easy .infobox .username .iconfont {
    font-size: 1.5rem;
    transform: translateY(-10px);
    margin-left: 1rem;
  }

  .my-info-easy .infobox .introuce {
    margin-top: 1rem;
    font-size: 1rem;
  }

  .my-info-easy .infobox .more-info {
    margin-top: 1rem;
    font-size: 1rem;
    line-height: 30px;
  }

  .my-info-easy .infobox .more-info i {
    margin-right: 2px;
  }
}

@media screen and (min-width: 992px) {
  .background-div {
    background-color: white; /* Set the background image using the 'url()' function */
    background-image: url("/img/6.jpg");
    /* Adjust background properties as needed */
    background-size: cover;
    background-position: 40% 50%;
    /* Specify the height of the div */
    height: 650px;
    /* Add other styles as needed */
  }

  .my-info-easy {
    flex-direction: column;
    width: 26%;
  }

  .my-info-easy .avatar {
    width: 200px;
    height: 200px;
  }
}
</style>
