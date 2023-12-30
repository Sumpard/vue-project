<template>
  <div class="block-container">
    <div class="head">
      <h1>联系我们</h1>
    </div>
    <el-form-item label="反馈与建议"> </el-form-item>
    <el-form-item>
      <el-input type="textarea" rows="20" v-model="bookingForm.remark" placeholder="请留下您的宝贵意见"></el-input>
    </el-form-item>
    <div class="button-css">
      <el-form-item>
        <el-button @click="submitBooking"><p>提交反馈</p></el-button>
      </el-form-item>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      bookingForm: {
        room: "",
        date: null,
        booker: "",
        theme: "",
        remark: "",
      },
    };
  },

  methods: {
    submitBooking() {
      // 在此处执行提交预约的逻辑
      console.log("预约信息:", this.bookingForm);
      // 可以发送数据到后端进行处理，或执行其他操作
    },
  },
};
</script>

<style scoped>
.chart {
  width: 100vh;
  /* 设置图表容器的宽度 */
  height: 30vh;
  /* 设置图表容器的高度 */
}

.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 30px);
}

.head {
  text-align: center;
  font-size: 30px;
}

.button-css {
  position: relative;
  left: 45%;
}

.block-container {
  width: 80%;
  margin: auto;
  text-align: center;
}
</style>
