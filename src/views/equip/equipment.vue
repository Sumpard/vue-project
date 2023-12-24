<template>
  <div class="chart-container">
    <el-form-item label="日期">
      <el-date-picker
        v-model="time_form.time_select"
        type="date"
        placeholder="选择日期"
        :disabled-date="disabledDate"
      ></el-date-picker>
    </el-form-item>
    <div class="chart">
      <Gante :timett="time_form.time_select" :map_="avail_map" />
    </div>
  </div>

  <!-- <div>
      <timeset />
    </div> -->
  <div>
    <h5>器材预约</h5>
    <el-form :model="bookingForm_equip" label-width="120px">
      <div class="flex">
        <el-form-item label="器材">
          <el-select v-model="bookingForm_equip.equip" placeholder="选择器材">
            <el-option v-for="equip in equips" :value="equip.available_name"> </el-option>
          </el-select>
        </el-form-item>
        <el-button size="small" class="text-bu" type="primary" :icon="search" @click="dialog_switch = true"
          >详细信息</el-button
        >
      </div>
      <el-form-item label="日期">
        <el-date-picker v-model="bookingForm_equip.date" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="时间">
        <!-- <el-time-picker v-model="bookingForm_equip.time" placeholder="选择时间段"></el-time-picker> -->
        <div>
          <timeset ref="timeset" />
        </div>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="bookingForm_equip.booker" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="用途">
        <el-input v-model="bookingForm_equip.use" placeholder="请输入会议主题"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="bookingForm_equip.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitBooking">提交预约</el-button>
        <el-button type="primary" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

  <div>
    <el-drawer v-model="dialog_switch" title="I am the title" :with-header="false">
      <span>健雄书院器材</span>
      <div>
        <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane v-for="equip in equips" :key="equip.available_id" :label="equip.available_name">
            <p>{{ "器材名称：" + equip.available_name }}</p>
            <p>{{ "器材当前状态:" + equip.available_status }}</p>
            <p>{{ "器材信息:" + equip.available_description }}</p>
            <p>{{ "图片:" + equip.available_image }}</p>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { Search } from "@element-plus/icons-vue";
import type { TabsPaneContext } from "element-plus";

import { avail, getAppoint_by_day, get_avail_set, submitAppoint } from "@/api/meeting_gante";
import { formatTimestamp, getTimeFormat } from "@/api/timeformat";
import { getUserMe } from "@/api/user";
import { useUserStore } from "@/stores/user";
import Message from "@/utils/message";
import Gante from "@/views/chart/gante_equip.vue";
import timeset from "@/views/room/time.vue";

let equips: avail[] = [];
const dialog_switch = ref(false);
const activeName = ref("first");
let avail_map: { [key: string]: [number, number] } = {};

export default {
  components: { timeset, Gante },

  async mounted() {
    this.equip_template();
  },

  data() {
    return {
      bookingForm_equip: {
        equip: "",
        date: "",
        booker: "",
        use: "",
        remark: "",
      },
      time_form: {
        time_select: "",
      },
      equips,
      search: Search,
      dialog_switch,
      activeName,
      avail_map,
      disabledDate(time: { getTime: () => number }) {
        //return time.getTime() > Date.now();
        const currentDate = new Date();
        const upperBound = new Date().setDate(currentDate.getDate() + 6);
        //禁止选择今天以前的时间和7天后的时间
        return time.getTime() < Date.now() - 8.64e7 || time.getTime() > upperBound;
      },
    };
  },

  methods: {
    async submitBooking() {
      if (
        this.bookingForm_equip.equip === "" ||
        this.bookingForm_equip.date === "" ||
        this.bookingForm_equip.booker === "" ||
        this.bookingForm_equip.use === "" ||
        this.$refs.timeset.startTime === "" ||
        this.$refs.timeset.endTime === ""
      ) {
        alert("请填写所有必填项");
        return;
      }

      Message.info("正在提交预约信息");
      const date_ = new Date(this.bookingForm_equip.date);
      const start_ = formatTimestamp(getTimeFormat(this.$refs.timeset.startTime, date_));
      const end_ = formatTimestamp(getTimeFormat(this.$refs.timeset.endTime, date_));
      const des = this.bookingForm_equip.use;
      const temp_str = this.bookingForm_equip.equip;
      const avail_id = avail_map[temp_str][0];
      const avail_type_name = "equipment";
      const avail_name = temp_str;
      const user = useUserStore().user!;
      const user_id = user.user_id;
      const user_name = user.user_name;
      const phone = this.bookingForm_equip.booker;
      const submit_info = await submitAppoint(
        start_,
        end_,
        des,
        avail_id,
        avail_name,
        avail_type_name,
        user_id,
        user_name,
        phone
      );
      console.log(
        "预约信息:",
        date_,
        start_,
        end_,
        des,
        avail_id,
        avail_type_name,
        avail_name,
        user_id,
        user_name,
        phone,
        user
      );
    },

    async equip_template() {
      try {
        const roomdata = (await get_avail_set("equipment")).data;
        this.equips = roomdata;
        for (let i = 0; i < roomdata.length; i++) {
          avail_map[roomdata[i].available_name] = [roomdata[i].available_id, i];
        }
        //console.log("maps:", avail_map);
      } catch (error) {
        console.error(error);
      }
    },

    resetForm() {
      this.bookingForm_equip = {
        equip: "",
        date: "",
        booker: "",
        use: "",
        remark: "",
      };
      this.time_form = {
        time_select: "",
      };

      this.$refs.timeset.reset();
    },

    getdate() {
      return this.time_form.time_select;
    },
    handleClick(tab: TabsPaneContext, event: Event) {
      //console.log(tab, event);
    },
  },
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
