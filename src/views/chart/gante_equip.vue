<template>
  <div>
    <div ref="container" class="scrolling-container"></div>
    <el-dialog v-model="dialogVisible" title="会议信息" width="30%">
      <span>{{ roomid }}</span>
      <p>{{ rentedToData }}</p>
      <p>{{ starttime }}</p>
      <p>{{ endtime }}</p>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false"> 关闭 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ElMessageBox } from "element-plus";
import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsGantt from "highcharts/modules/gantt";
import HighchartsGridLight from "highcharts/themes/grid-light";
import HighchartsSand from "highcharts/themes/sand-signika";
import moment from "moment";
import { List } from "typescript-collections";
import { getCurrentInstance, ref } from "vue";

import { Appointment, getAppoint_by_day } from "@/api/meeting_gante";

type Deal = {
  rentedTo: string;
  from: number;
  to: number;
};

type M_Room = {
  model: string;
  deals: Deal[];
  current: number;
};

HighchartsGantt(Highcharts);
//HighchartsExporting(Highcharts);
HighchartsSand(Highcharts);

var timestamp: number;
var today = new Date();
const hour = 1000 * 60 * 60;
const map = Highcharts.map;
const numRooms = 4;
let series: { name: string; data: any; current: any }[];
let meetingrooms: M_Room[] = new Array(numRooms).fill(0).map((_, i) => ({
  model: `会议室${i + 1}`,
  current: 0,
  deals: [],
}));
//console.log(meetingrooms);

export default {
  props: {
    timett: {
      type: String,
      required: true,
    },
  },

  setup() {
    const dialogVisible = ref(false);
    const roomid = ref("");
    const rentedToData = ref("");
    const starttime = ref("");
    const endtime = ref("");
    const handleClose = (done: () => void) => {
      ElMessageBox.confirm("Are you sure to close this dialog?")
        .then(() => {
          done();
        })
        .catch(() => {
          // catch error
        });
    };
    const openDialog = (data1: string, data2: string, data3: string, data4: string) => {
      const num3 = parseInt(data3, 10) - 28800000;
      const num4 = parseInt(data4, 10) - 28800000;
      //console.log("num: ",num3,num4,num3.toString());
      roomid.value = data1;
      rentedToData.value = "借用者：" + data2;
      starttime.value = "开始时间：" + moment(num3).format("YYYY-MM-DD HH:mm");
      endtime.value = "结束时间：" + moment(num4).format("YYYY-MM-DD HH:mm");
      dialogVisible.value = true; //- 28800000
    };
    return {
      dialogVisible, // 添加类型注解
      roomid,
      rentedToData,
      starttime,
      endtime,
      handleClose,
      openDialog,
    };
  },
  watch: {
    timett(newVal, oldVal) {
      // todo
      if (newVal == null) return;
      else {
        timestamp = new Date(this.timett).getTime();
        const today = timestamp;
        console.log("time_select changed:", newVal, today);

        const timeformat = this.formatTimestamp(today);
        this.get_today_meeting(timeformat, "SUBMITTED").then(() => {
          console.log("watch", meetingrooms);
          series = meetingrooms.map(function (meetingroom, i) {
            const data = meetingroom.deals.map(function (deal: { rentedTo: any; from: any; to: any }) {
              return {
                id: "会议室-" + (i + 1),
                rentedTo: deal.rentedTo,
                start: deal.from,
                end: deal.to,
                y: i,
              };
            });
            //console.log("data:", data, meetingroom, meetingroom.model, meetingroom.deals[meetingroom.current]);
            return {
              name: meetingroom.model,
              data: data,
              current: meetingroom.deals[meetingroom.current],
            };
          });
          Highcharts.ganttChart(this.$refs.container, {
            series: series,
            title: {
              text: "会议室预约",
            },
            //credits
            credits: {
              //enabled: false
              text: "吴健雄学院",
              href: "",
            },
            tooltip: {
              followPointer: true,
              //这边从00：00⏲
              pointFormat:
                "<span>借用者: {point.rentedTo}</span><br/>" +
                "<span>开始时间: {point.start:%H: %M}</span><br/>" +
                "<span>结束时间: {point.end:%H: %M}</span>",
            },
            xAxis: {
              currentDateIndicator: false,
              min: today + 20 * hour,
              max: today + 30 * hour,
            },
            yAxis: {
              type: "category",
              grid: {
                columns: [
                  {
                    title: {
                      text: "物品",
                    },
                    categories: map(series, function (s: { name: any }) {
                      return s.name;
                    }),
                  },
                  {
                    title: {
                      text: "详细信息",
                    },
                    categories: map(series, function (s: { name: any }) {
                      return s.name;
                    }),
                  },
                ],
              },
              events: {
                // 给y轴添加点击事件
                click: function () {
                  console.log("Y Axis clicked");
                },
              },
            },
            plotOptions: {
              series: {
                point: {
                  events: {
                    click: (event: { point: any }) => {
                      console.log("点击事件触发");
                      var point = event.point;
                      //console.log(dialogVisible.value);
                      console.log(point.rentedTo, point.start, today, this.timett, timestamp);
                      this.openDialog(point.id, point.rentedTo, point.start, point.end);
                    },
                  },
                },
              },
            },
          });
        });
      }
    },
  },

  mounted() {
    //setup instance
    const instance = getCurrentInstance()!;
    const { dialogVisible, handleClose, openDialog } = instance.proxy! as unknown as {
      dialogVisible: any;
      handleClose: () => void;
      openDialog: (arg0: string, arg1: string, arg2: string, arg3: string) => void;
    };

    today.setHours(0, 0, 0, 0);

    const today_ = today.getTime();
    //meeting get
    const timeformat = this.formatTimestamp(today_);

    this.get_today_meeting(timeformat, "SUBMITTED").then(() => {
      series = meetingrooms.map(function (meetingroom, i) {
        const data = meetingroom.deals.map(function (deal: { rentedTo: any; from: any; to: any }) {
          return {
            id: "会议室" + (i + 1),
            rentedTo: deal.rentedTo,
            start: deal.from,
            end: deal.to,
            y: i,
          };
        });
        return {
          name: meetingroom.model,
          data: data,
          current: meetingroom.deals[meetingroom.current],
        };
      });

      Highcharts.ganttChart(this.$refs.container, {
        series: series,
        title: {
          text: "会议室预约",
        },
        //credits
        credits: {
          //enabled: false
          text: "吴健雄学院",
          href: "",
        },
        tooltip: {
          followPointer: true,
          pointFormat:
            "<span>借用者: {point.rentedTo}</span><br/>" +
            "<span>开始时间: {point.start:%H: %M}</span><br/>" +
            "<span>结束时间: {point.end:%H: %M}</span>",
        },
        xAxis: {
          currentDateIndicator: false,
          min: today_ + 20 * hour,
          max: today_ + 30 * hour,
        },
        yAxis: {
          type: "category",
          grid: {
            columns: [
              {
                title: {
                  text: "物品",
                },
                categories: map(series, function (s: { name: any }) {
                  return s.name;
                }),
              },
              {
                title: {
                  text: "详细信息",
                },
                categories: map(series, function (s: { name: any }) {
                  return s.name;
                }),
              },
            ],
          },
        },
        plotOptions: {
          series: {
            point: {
              events: {
                click: (event: { point: any }) => {
                  var point = event.point;
                  openDialog(point.id, point.rentedTo, point.start, point.end);
                },
              },
            },
          },
        },
      });
    });
  },

  methods: {
    async get_today_meeting(day: string, status: string) {
      try {
        const data = await getAppoint_by_day(day, status);
        const appointlist: List<Appointment> = data as List<Appointment>;
        if (appointlist != undefined) {
          for (let i = 0; i < appointlist.length; i++) {
            const start = new Date(appointlist[i].appoint_start_time).getTime() + 8 * hour;
            const end = new Date(appointlist[i].appoint_end_time).getTime() + 8 * hour;
            const newdeal = {
              rentedTo: appointlist[i].renter_name,
              from: start,
              to: end,
            };
            meetingrooms[appointlist[i].available_id - 1].deals.push(newdeal);
          }
        } else {
          console.log("not run:", meetingrooms);
          const _today_ = new Date(day).getTime();
        }
        meetingrooms[2].deals.push({ rentedTo: "test", from: 1, to: 1 });
        meetingrooms[2].deals.push({ rentedTo: "test", from: 1, to: 1 });
        meetingrooms[2].deals.push({ rentedTo: "test", from: 1, to: 1 });
      } catch (error) {
        console.error(error);
      }
    },

    formatTimestamp(timestamp: number) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDateTime = `${year}-${month}-${day}`;
      return formattedDateTime.toString();
    },
  },
};
</script>

<style>
#container {
  max-width: 1200px;
  min-width: 800px;
  height: 400px;
  margin: 1em auto;
}

.scrolling-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

/* meetingrooms = [ { model: '会议室1', current: 1, deals: [ { rentedTo: '卢婷', from: today_ + 21 * hour, to: today_ +
22 * hour }, // more deals... { rentedTo: '许睿', from: today_ + 26 * hour, to: today_ + 26.5 * hour }, ] }, // more {
model: '会议室2', current: 0, deals: [ { rentedTo: '历婷', from: today_ + 22 * hour, to: today_ + 23 * hour }, // more
deals... { rentedTo: '勾睿', from: today_ + 26 * hour, to: today_ + 27.5 * hour }, ] }, { model: '会议室3', current: 0,
deals: [ { rentedTo: '历闻', from: today_ + 22 * hour, to: today_ + 24 * hour }, ] }, ]; */
