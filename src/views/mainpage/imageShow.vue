<template>
  <el-carousel :interval="4000" type="card" height="400px">
    <el-carousel-item v-for="item in imgList" :key="item.id">
      <img :src="item.idView" class="image" />
    </el-carousel-item>
  </el-carousel>
  <div class="trangle"><h1>abcde</h1></div>
  <!--设置样式让其自适应：-->
</template>

<script lang="ts">
export default {
  name: "index",
  data() {
    return {
      imgList: [
        { id: 0, idView: "/img/seu01.jpg" },
        { id: 1, idView: "/img/seu02.png" },
        { id: 2, idView: "/img/seu03.png" },
        { id: 3, idView: "/img/wjx.png" },
      ],
    };
  },
  methods: {},
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.block-wrap {
  display: flex;
  justify-content: space-around;
}

.trangle {
  height: 0;
  width: 100%;
  padding-top: 75%;
}
</style>
