<template>
  <div class="chart-container">
    <el-form-item label="日期">
      <el-date-picker v-model="time_form.time_select" type="date" placeholder="选择日期"></el-date-picker>
    </el-form-item>
    <div class="chart">
      <Gante2 :timett="time_form.time_select" />
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
          <timeset ref="timeset" />
        </div>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="bookingForm.booker" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="会议主题">
        <el-input v-model="bookingForm.theme" placeholder="请输入会议主题"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="bookingForm.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitBooking">提交预约</el-button>
        <el-button type="primary" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script lang="ts">
import timeset from '@/views/room/time.vue'
import table1 from '@/views/chart/table1.vue'
import table2 from '@/views/chart/table2.vue'
import tabletest from '@/views/tabulation/tabletest.vue'
import Gante2 from '@/views/chart/gante2.vue'
import Message from "@/utils/message";
import { getAppoint_by_day, submitAppoint } from "@/api/meeting_gante";
import { getUserMe } from "@/api/user";
import { useUserStore } from "@/stores/user";

export default {
  components: { tabletest, table2, table1, timeset, Gante2 },

  async mounted() {
    const appoint = await getAppoint_by_day("", "SUBMITTED");
    console.log(appoint);
  },

  data() {
    return {
      bookingForm: {
        room: '',
        date: '',
        booker: '',
        theme: '',
        remark: ''
      },
      time_form: {
        time_select: ''
      },

    };
  },


  methods: {




    async submitBooking() {
      /* if (
        this.bookingForm.room === '' ||
        this.bookingForm.date === '' ||
        this.bookingForm.booker === '' ||
        this.bookingForm.theme === '' ||
        this.bookingForm.remark === ''
      ) {
        alert('请填写所有必填项');
        return;
      } */

      Message.info("正在提交预约信息");
      const date_ = new Date(this.bookingForm.date);
      const start_ = this.formatTimestamp(this.getTimeFormat(this.$refs.timeset.startTime, date_));
      const end_ = this.formatTimestamp(this.getTimeFormat(this.$refs.timeset.endTime, date_));
      const temp = new Date();
      const submit =  this.formatTimestamp(temp.getTime());
      const des = this.bookingForm.theme;
      const temp_str = this.bookingForm.room;
      const avail_id = parseInt(temp_str[temp_str.length - 1], 10);
      const avail_type_name = "会议室";
      const avail_name = temp_str[temp_str.length - 1] + "号" + avail_type_name;
      const user = useUserStore().user!;
      const user_id = user.user_id;
      const user_name = user.user_name;
      const phone = this.bookingForm.booker;
      const submit_info = await submitAppoint(start_,end_,des,avail_id,avail_name,
      avail_type_name,user_id,user_name,phone,submit); 
      console.log('预约信息:',date_, start_, end_,
        submit, des, avail_id, avail_type_name, avail_name, user_id, user_name, phone, user);

    },

    resetForm() {
      this.bookingForm = {
        room: '',
        date: '',
        booker: '',
        theme: '',
        remark: ''
      };
      this.time_form = {
        time_select: ''
      };

      this.$refs.timeset.reset();

    },

    getdate() {
      return this.time_form.time_select;
    },

    getTimeFormat(time: string, date: Date) {
      const [hours, minutes] = time.split(":");
      date.setHours(parseInt(hours, 10));
      date.setMinutes(parseInt(minutes, 10));
      return date.getTime();
    },

    formatTimestamp(timestamp: number) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
      return formattedDateTime;
    },
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
