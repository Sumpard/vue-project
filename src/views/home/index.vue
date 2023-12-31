<template>
  <el-row>
    <el-col :span="24">
      <el-carousel :interval="4000" type="card" height="350px">
        <el-carousel-item v-for="item in imageUrl" :key="item">
          <img :src="item" alt="" />
        </el-carousel-item>
      </el-carousel>
    </el-col>
  </el-row>
  <el-row>
    <notice-column noticetype="活动通知" />
    <notice-column noticetype="管理安排" />
    <notice-column noticetype="书院介绍" />
  </el-row>
</template>

<script setup lang="ts">
import NoticeColumn from "./components/NoticeColumn.vue";

const imageUrl = ["1.jpg", "2.jpg", "3.jpg", "4.png"].map((t) => `/img/carousel/${t}`);
</script>

<style scoped lang="scss">
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
img {
  width: auto;
  height: 100%;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
