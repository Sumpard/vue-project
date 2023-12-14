<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix" style="text-align: -webkit-center">
      <slot name="card-title">消息框标题</slot>
      <el-button style="float: right; padding: 3px 0" type="text">查看更多<el-icon><i-ep-DArrowRight /></el-icon></el-button>
    </div>
    <div v-for="o in 5" :key="o" class="text item">
      {{'列表内容 ' + o }}
    </div>
  </el-card>
</template>

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
    clear: both
  }

  .box-card {
    width: 30%;
    border-top: 5px solid rgb(95, 165, 222);
    margin: 15px;
  }
</style>