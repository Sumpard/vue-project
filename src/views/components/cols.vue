<template>
  <el-card class="box-card" shadow="hover">
    <div class="clearfix" style="text-align: -webkit-center">
      <slot name="card-title"></slot>
      <el-button style="float: right; padding: 3px 0" type="text"
        >查看更多<el-icon><i-ep-DArrowRight /></el-icon
      ></el-button>
    </div>
    <div v-for="o in 5" :key="o" class="text item">
      {{ "列表内容 " + o }}
    </div>
    <a
      href="https://mp.weixin.qq.com/s?__biz=MjM5NjQxMDE2MQ==&mid=2651003892&idx=1&sn=dc8bd3ea9634a36e61f5a8d78b6f9335&chksm=bd1e1daa8a6994bcef251d98e14051c8d7326bc59d09f7e772948f45f35c141b0dd153dd9d02&mpshare=1&scene=23&srcid=1214lYW3yrvc6fHMlfZu6uxq&sharer_shareinfo=a9e3fa85bd768c2180da4ba9adb18547&sharer_shareinfo_first=a9e3fa85bd768c2180da4ba9adb18547#rd"
      >健雄获奖</a
    >
  </el-card>
</template>

<script setup>
import { ref } from "vue";
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 30%;
  border-top: 5px solid rgb(95, 165, 222);
  margin: 15px;
}
</style>
