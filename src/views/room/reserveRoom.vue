<template>
  <div class="chart-container">
    <h1>会议室预约</h1>
    <div class="chart">
      <Echart1 />
    </div>
    <!-- 其他表单内容... -->
  </div>
  <!-- <div>
    <timeset />
  </div> -->
  <div>
    <h1>会议室预约</h1>
    <el-form :model="bookingForm" label-width="120px">
      <el-form-item label="会议室">
        <el-select v-model="bookingForm.room" placeholder="选择会议室">
          <el-option label="会议室1" value="room1"></el-option>
          <el-option label="会议室2" value="room2"></el-option>
          <el-option label="会议室3" value="room3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker v-model="bookingForm.date" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="时间">
        <!-- <el-time-picker v-model="bookingForm.time" placeholder="选择时间段"></el-time-picker> -->
        <div>
          <timeset />
        </div>
      </el-form-item>
      <el-form-item label="预订人">
        <el-input v-model="bookingForm.booker" placeholder="请输入预订人姓名"></el-input>
      </el-form-item>
      <el-form-item label="会议主题">
        <el-input v-model="bookingForm.theme" placeholder="请输入会议主题"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="bookingForm.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  @click="submitBooking">提交预约</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script lang="ts">

import BarChart1 from '@/views/chart/chart1.vue'
import BarChart2 from '@/views/chart/chart2.vue'
import Echart1 from '@/views/chart/echart1.vue'
import timeset from '@/views/room/time.vue'

export default {
  components: { Echart1, timeset },

  data() {
    return {
      bookingForm: {
        room: '',
        date: null,
        booker: '',
        theme:'',
        remark:''
      }
    };
  },



  methods: {
    submitBooking() {
      // 在此处执行提交预约的逻辑
      console.log('预约信息:', this.bookingForm);
      // 可以发送数据到后端进行处理，或执行其他操作
    }
  }
};

</script>

<!-- <script>
import Chart from 'chart.js';

export default {
  data() {
    return {
      bookingForm: {
        // 表单数据...
      },
      chart: null
    };
  },
  mounted() {
    this.initializeChart();
  },
  methods: {
    initializeChart() {
      const ctx = this.$refs.chart.getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['会议室1', '会议室2', '会议室3'],
          datasets: [
            {
              label: '预约情况',
              data: [5, 3, 7], // 这里的数据是示例数据，你需要根据实际情况提供相应的数据
              backgroundColor: 'rgba(75, 192, 192, 0.6)'
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    },
    submitBooking() {
      // 提交预约逻辑...
    }
  }
};
</script>
 -->

<style>
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
</style>
