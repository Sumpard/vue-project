<template>
  <div class="all_contain">
    <div class="chart-container">
      <div class="picker">
        <el-form-item label="日期">
          <el-date-picker
            v-model="time_form.time_select"
            type="date"
            placeholder="选择日期"
            :disabled-date="disabledDate"
          ></el-date-picker>
        </el-form-item>
      </div>
      <div class="scroll">
        <el-scrollbar>
          <div class="chart">
            <Gante :timett="time_form.time_select" :map_="avail_map" />
          </div>
        </el-scrollbar>
      </div>
    </div>
    <div class="form">
      <div class="wrapp">
        <el-text tag="b" size="large" class="m-text">器材预约</el-text>
        <el-button size="small" class="text-bu" type="primary" :icon="search" @click="dialog_switch = true"
          >器材详情</el-button
        >
      </div>
      <el-form :model="bookingForm_equip" label-width="120px">
        <div class="flex">
          <el-form-item label="器材">
            <el-select v-model="bookingForm_equip.equip" placeholder="选择器材">
              <el-option v-for="equip in equips" :value="equip.available_name"> </el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="日期">
          <el-date-picker
            v-model="bookingForm_equip.date"
            type="date"
            placeholder="选择日期"
            :disabled-date="disabledDate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="时间">
          <!-- <el-time-picker v-model="bookingForm_equip.time" placeholder="选择时间段"></el-time-picker> -->
          <div>
            <time-set ref="timeset" />
          </div>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="bookingForm_equip.booker" clearable placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="用途">
          <el-input v-model="bookingForm_equip.use" clearable placeholder="请输入器材用途"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            maxlength="100"
            v-model="bookingForm_equip.remark"
            show-word-limit
            placeholder="请输入备注"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitBooking">提交预约</el-button>
          <el-button type="primary" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

  <div>
    <el-drawer v-model="dialog_switch" title="I am the title" :with-header="false" direction="ltr">
      <span>健雄书院器材</span>
      <div>
        <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane v-for="equip in equips" :key="equip.available_id" :label="equip.available_name">
            <p>{{ "器材名称：" + equip.available_name }}</p>
            <p>{{ "器材当前状态:" + equip.available_status }}</p>
            <p>{{ "器材信息:" + equip.available_description }}</p>
            <p>{{ "图片:" }}</p>
            <div class="tab-img-container">
              <el-image :src="'data:image/png;base64,' + equip.available_image" alt="picture" class="tab-img">
                <template #error>
                  <div class="image-slot">
                    <el-text>啊？图片丢失了捏</el-text>
                    <el-icon class="icon"><i-ep-picture /></el-icon>
                  </div>
                </template>
              </el-image>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { Search } from "@element-plus/icons-vue";
import type { TabsPaneContext } from "element-plus";

import { Avail, getAppoint_by_day, get_avail_set, submitAppoint } from "@/api/meeting_gante";
import { useUserStore } from "@/stores/user";
import Message from "@/utils/message";
import { combineDateTime, formatTimestamp } from "@/utils/timeformat";
import Gante from "@/views/chart/gante_equip.vue";

let equips: Avail[] = [];
const dialog_switch = ref(false);
const activeName = ref("first");
let avail_map: { [key: string]: [number, number] } = {};

export default {
  components: { Gante },

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
      const start_ = formatTimestamp(combineDateTime(this.$refs.timeset.startTime, date_));
      const end_ = formatTimestamp(combineDateTime(this.$refs.timeset.endTime, date_));
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
      /* this.time_form = {
        time_select: "",
      }; */

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

<style scoped>
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
  height: 100%;
  background-color: #ffffff;
  flex: 2.5;
}
.form {
  flex: 1;
  height: 100%;
  justify-content: center;
  margin-right: 20px;
  margin-left: 0px;
  margin-top: 0px;
  align-items: center;
  background-color: #ffffff;
}
.all_contain {
  display: flex;
  height: 90vh;
  background-color: #ffffff;
}

.scroll {
  width: 100%;
  height: 800px;
  background-color: #ffffff;
}

.wrapp {
  display: flex;
  align-items: center;
  margin-left: 80px;
  margin-bottom: 20px;
  margin-top: 80px;
}

.text-bu {
  margin-top: 3px;
  margin-left: 15px;
}

.picker {
  margin-top: 30px;
  margin-bottom: 10px;
}

.tab-img {
  width: 75%;
  height: auto;
}

.tab-img-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 200px;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
}

.icon {
  font-size: 30px;
}

.image-slot.error {
  background-color: #f00;
  color: #fff;
  height: 200px;
}
</style>
