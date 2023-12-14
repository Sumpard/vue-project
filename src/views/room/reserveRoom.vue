<template>
  <div class="chart-container">
    <el-form-item label="日期">
      <el-date-picker v-model="time_form.time_select" type="date" placeholder="选择日期"></el-date-picker>
    </el-form-item>
    <div class="chart">
      <Gante2 />
    </div>
  </div>

  <!-- <div>
    <timeset />
  </div> -->
  <div>
    <h5>会议室预约</h5>
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
        <el-button @click="submitBooking">提交预约</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script lang="ts">
import axios from 'axios'
import BarChart1 from '@/views/chart/chart1.vue'
import BarChart2 from '@/views/chart/chart2.vue'
import Echart1 from '@/views/chart/echart1.vue'
import timeset from '@/views/room/time.vue'
import table1 from '@/views/chart/table1.vue'
import table2 from '@/views/chart/table2.vue'
import tabletest from '@/views/tabulation/tabletest.vue'
import Gante2 from '@/views/chart/gante2.vue'
import Message from "@/utils/message";


export default {
  components: { tabletest, table2, table1, timeset, Gante2 },

  data() {
    return {
      bookingForm: {
        room: '',
        date: '',
        booker: '',
        theme: '',
        remark: ''
      },
      time_form:{
        time_select:''
      }
    };
  },



  methods: {
    submitBooking() {
      Message.info("正在提交预约信息");
      // 在此处执行提交预约的逻辑

      console.log('预约信息:', this.time_form);
      
    }
  }
};


</script>


<style>
.chart {
  width: 100%;
  flex: 1;
  background-color: #ffffff;
}

.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /*height: calc(100% - 30px);*/
  height: 66vh;
  background-color: #ffffff;
}
</style>
