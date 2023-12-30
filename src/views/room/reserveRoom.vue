<template>
  <div class="el">
    <div class="all_contain">
      <div class="chart-container">
        <div class="picker">
          <el-form-item label="日期" size="small">
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
              <Gante2 :timett="time_form.time_select" />
            </div>
          </el-scrollbar>
        </div>
      </div>
      <div class="form">
        <div class="wrapp">
          <el-text tag="b" size="large" class="m-text">会议室预约</el-text>
          <el-button size="small" class="text-bu" type="primary" :icon="search" @click="dialog_switch = true"
            >会议室详细信息</el-button
          >
        </div>
        <el-form :model="bookingForm" label-width="120px" class="elform">
          <div class="flex">
            <el-form-item label="会议室">
              <el-select v-model="bookingForm.room" placeholder="选择会议室">
                <el-option v-for="room in rooms" :value="room.available_name"> </el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="日期">
            <el-date-picker
              v-model="bookingForm.date"
              type="date"
              placeholder="选择日期"
              :disabled-date="disabledDate"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="时间">
            <!-- <el-time-picker v-model="bookingForm.time" placeholder="选择时间段"></el-time-picker> -->
            <div>
              <time-set ref="timeset" />
            </div>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="bookingForm.booker" clearable placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="会议主题">
            <el-input v-model="bookingForm.theme" clearable placeholder="请输入会议主题"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="bookingForm.remark" maxlength="100" placeholder="请输入备注" show-word-limit></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitBooking">提交预约</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div>
      <el-drawer v-model="dialog_switch" title="I am the title" :with-header="false" direction="ltr">
        <span>健雄书院会议室</span>
        <div>
          <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane v-for="room in rooms" :key="room.available_id" :label="room.available_name">
              <p>{{ "会议室名称：" + room.available_name }}</p>
              <p>{{ "会议室当前状态:" + room.available_status }}</p>
              <p>{{ "会议室信息:" + room.available_description }}</p>
              <p>{{ "图片:" }}</p>
              <div class="tab-img-container">
                <el-image :src="'data:image/png;base64,' + room.available_image" alt="picture" class="tab-img">
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
  </div>
</template>

<script lang="ts">
import { Search } from "@element-plus/icons-vue";
import type { TabsPaneContext } from "element-plus";

import { Avail, get_all, get_avail_set, submitAppoint } from "@/api/meeting_gante";
import { useUserStore } from "@/stores/user";
import Message from "@/utils/message";
import { combineDateTime, formatTimestamp } from "@/utils/timeformat";
import Gante2 from "@/views/chart/gante2.vue";

/* interface room {
  available_description: string;
  available_id: number;
  available_image: string;
  available_name: string;
  available_status: string;
  available_type_name: string;
} */

const activeName = ref("first");
const dialog_switch = ref(false);

export default {
  components: { Gante2 },

  async mounted() {
    const all = await get_all();
    this.room_template();
  },

  data() {
    let rooms: Avail[] = [];
    return {
      bookingForm: {
        room: "",
        date: "",
        booker: "",
        theme: "",
        remark: "",
      },
      time_form: {
        time_select: "",
      },
      search: Search,
      rooms,
      dialog_switch,
      activeName: "First",
      pos: "top",
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
        this.bookingForm.room === "" ||
        this.bookingForm.date === "" ||
        this.bookingForm.booker === "" ||
        this.bookingForm.theme === "" ||
        this.$refs.timeset.startTime === "" ||
        this.$refs.timeset.endTime === ""
      ) {
        alert("请填写所有必填项");
        return;
      }

      Message.info("正在提交预约信息");
      const date_ = new Date(this.bookingForm.date);
      const start_ = formatTimestamp(combineDateTime(this.$refs.timeset.startTime, date_));
      const end_ = formatTimestamp(combineDateTime(this.$refs.timeset.endTime, date_));
      const temp = new Date();
      const submit = formatTimestamp(temp.getTime());
      const des = this.bookingForm.theme;
      const temp_str = this.bookingForm.room;
      const avail_id = parseInt(temp_str[0], 10);
      const avail_type_name = "会议室";
      const avail_name = temp_str;
      const user = useUserStore().user!;
      const user_id = user.user_id;
      const user_name = user.user_name;
      const phone = this.bookingForm.booker;
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
      if (submit_info.code == 200) {
        Message.success("提交成功！");
      } else {
        Message.error("提交失败");
      }
      /* console.log(
        "预约信息:",
        date_,
        start_,
        end_,
        submit,
        des,
        avail_id,
        avail_type_name,
        avail_name,
        user_id,
        user_name,
        phone,
        user
      ); */
    },

    async room_template() {
      try {
        const roomdata = (await get_avail_set("会议室")).data;
        this.rooms = roomdata;
        //console.log("room:",roomdata);
      } catch (error) {
        console.error(error);
      }
    },

    resetForm() {
      this.bookingForm = {
        room: "",
        date: "",
        booker: "",
        theme: "",
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
  /* height: 66vh; */
  background-color: #ffffff;
  margin-bottom: 40px;
  margin-top: 0px;
  margin-right: 20px;
}

.text-bu {
  margin-top: 3px;
  margin-left: 10px;
}

.demo-tabs > .el-tabs__content {
  padding: 10px;
  /* color: #6b778c; */
  font-size: 24px;
  font-weight: 600;
}

.scroll {
  width: 100%;
  height: 800px;
  background-color: #ffffff;
}

.chart-container {
  flex: 2.5;
  height: 100%;
}
.form {
  flex: 1.2;
  height: 100%;
  justify-content: center;
  margin-right: 20px;
  margin-left: 0px;
  margin-top: 0px;
  /* align-items: center; */
  background-color: #ffffff;

  /*   font-family: "maoken", "urafont", "微软雅黑";
  font-weight: 520;
  border: 0.1rem solid #75a8c2;
  border-radius: 0.8rem;  */
}

.all_contain {
  display: flex;
  height: 90vh;
  background-color: #ffffff;
}

.m-text {
  text-align: left;
}

.wrapp {
  display: flex;
  align-items: left;
  margin-left: 25%;
  margin-bottom: 20px;
  margin-top: 80px;
}

.el {
  background-color: #ffffff;
}

.el-form {
  margin-left: -40px;
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
