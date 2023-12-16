<template>
  <el-row >
    <el-col :span="24">
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="item in imageUrl" :key="item">
        <img  :src="item.url" alt=""/>
      </el-carousel-item>
    </el-carousel>
    </el-col>
  </el-row>
    <el-row>
    <cols />
    <cols />
    <cols />
  </el-row>
  </template>
  
  
  <script setup lang="ts">
  import image1 from "@/assets/1.jpg"
  import image2 from "@/assets/2.jpg"
  import image3 from "@/assets/3.jpg"
  import image4 from "@/assets/4.png"
  import cols from "@/views/components/cols.vue"
  import cols2 from "@/views/components/cols2.vue"
  
  const imageUrl = [
    { url: image1 },
    { url: image2 },
    { url: image3 },
    { url: image4 },
  ];
  </script>
  
  <style lang="scss" scoped>
  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }
   img{
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
