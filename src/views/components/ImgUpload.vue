<template>
    <el-upload
        :http-request="httpRequest"
        multiple
        :show-file-list="true"
        list-type="picture-card"
        :limit="limit"
        :on-exceed="handleExceed"
        accept=".jpg,.jpeg,.png"
        ><el-icon><Plus /></el-icon>
    </el-upload>

    <!-- 超出上传限制数提示弹窗 -->
    <el-dialog
        v-model="dialogVisible"
        title="温馨提示"
         width="30%"
        :before-close="handleClose"
    >
        <span v-if="limit">最多只能上传{{limit}}张图片</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>

    <div class="el-upload__tip" slot="tip" v-if="showTip">
      请上传
      <template v-if="fileSize"> 大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b> </template>
      <template v-if="fileType"> 格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b> </template>
      的文件
    </div>
</template>

<script setup>
import {ref, reactive} from "vue";
import axios from "axios";
import { Plus } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'

export default {
  props: {
    value: [String, Object, Array],
    // 图片数量限制
    limit: {
      type: Number,
      default: 1,
    },
    // 大小限制(MB)
    fileSize: {
       type: Number,
      default: 3,
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
      type: Array,
      default: () => ["png", "jpg", "jpeg"],
    },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: true
    }
  },

    const dialogVisible = ref(false)

    function handleExceed(files, fileList) {
        dialogVisible.value = true;
    },
}
</script>
