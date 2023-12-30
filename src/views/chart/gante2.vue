<template>
  <div>
    <div ref="container" class="scrolling-container"></div>
    <el-dialog v-model="dialogVisible" title="会议信息" width="30%">
      <span>{{ roomid }}</span>
      <p>{{ rentedToData }}</p>
      <p>{{ theme }}</p>
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
import dayjs from "dayjs";
import { ElMessageBox } from "element-plus";
import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsGantt from "highcharts/modules/gantt";
import Highchartsavocado from "highcharts/themes/avocado";
import Highchartsgray from "highcharts/themes/gray";
import HighchartsGridLight from "highcharts/themes/grid-light";
import HighchartsSand from "highcharts/themes/sand-signika";

import { Appointment, getAppoint_by_day, get_avail_set } from "@/api/meeting_gante";
import { formatTimestamp } from "@/utils/timeformat";

type Deal = {
  themes: string;
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
HighchartsGridLight(Highcharts);

var timestamp: number;
var today = new Date();
const hour = 1000 * 60 * 60;
let numRooms = 7;
let series: { name: string; data: any; current: any }[];
let meetingrooms: M_Room[] = [];
//console.log(meetingrooms);

export default {
  props: {
    timett: {
      type: String,
      required: true,
    },
  },

  setup() {
    Highcharts.AST.allowedAttributes.push("@click");
    const dialogVisible = ref(false);
    const roomid = ref("");
    const rentedToData = ref("");
    const theme = ref("");
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
    const openDialog = (data1: string, data2: string, data3: string, data4: string, data5: string) => {
      const num3 = parseInt(data3, 10) - 28800000;
      const num4 = parseInt(data4, 10) - 28800000;
      //console.log("num: ",num3,num4,num3.toString());
      roomid.value = data1;
      theme.value = "会议主题：" + data5;
      rentedToData.value = "借用者：" + data2;
      starttime.value = "开始时间：" + dayjs(num3).format("YYYY-MM-DD HH:mm");
      endtime.value = "结束时间：" + dayjs(num4).format("YYYY-MM-DD HH:mm");
      dialogVisible.value = true; //- 28800000
    };
    return {
      dialogVisible, // 添加类型注解
      roomid,
      theme,
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
        const timeformat = formatTimestamp(today);
        this.get_today_meeting(timeformat, "ACCEPTED").then(() => {
          //console.log("watch", meetingrooms);
          series = meetingrooms.map(function (meetingroom, i) {
            const data = meetingroom.deals.map(function (deal: { themes: any; rentedTo: any; from: any; to: any }) {
              return {
                id: meetingroom.model,
                m_theme: deal.themes,
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
                      text: "会议室",
                    },
                    categories: series.map((s) => s.name),
                  },
                ],
              },
            },
            plotOptions: {
              series: {
                point: {
                  events: {
                    click: (event: { point: any }) => {
                      console.log("点击事件触发");
                      var point = event.point;
                      this.openDialog(point.id, point.rentedTo, point.start, point.end, point.m_theme);
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
    const instance = getCurrentInstance()!;
    const { dialogVisible, handleClose, openDialog } = instance.proxy! as unknown as {
      dialogVisible: any;
      handleClose: () => void;
      openDialog: (arg0: string, arg1: string, arg2: string, arg3: string, arg4: string) => void;
    };
    this.get_room("会议室").then(() => {
      //setup instance

      today.setHours(0, 0, 0, 0);

      const today_ = today.getTime();
      //meeting get
      const timeformat = formatTimestamp(today_);

      this.get_today_meeting(timeformat, "ACCEPTED").then(() => {
        series = meetingrooms.map(function (meetingroom, i) {
          const data = meetingroom.deals.map(function (deal: { themes: any; rentedTo: any; from: any; to: any }) {
            return {
              id: meetingroom.model,
              m_theme: deal.themes,
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
            //这边从00：00⏲
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
                    text: "会议室",
                  },
                  categories: series.map((s) => s.name),
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
                    openDialog(point.id, point.rentedTo, point.start, point.end, point.m_theme);
                  },
                },
              },
            },
          },
        });
      });
    });
  },

  methods: {
    async get_today_meeting(day: string, status: string) {
      try {
        const data = await getAppoint_by_day(day, status, "会议室");
        const appointlist: Appointment[] = data as Appointment[];
        console.log("appoint:", appointlist);
        console.log("meetingrooms:", meetingrooms);
        for (let i = 0; i < numRooms; i++) {
          const index: Deal = { themes: "", rentedTo: "test", from: 1, to: 1 };
          meetingrooms[i].deals.splice(0, meetingrooms[i].deals.length);
          meetingrooms[i].deals.push(index);
        }
        console.log("meetingrooms:", meetingrooms);
        if (appointlist != undefined) {
          for (let i = 0; i < appointlist.length; i++) {
            const start = new Date(appointlist[i].appoint_start_time).getTime() + 8 * hour;
            const end = new Date(appointlist[i].appoint_end_time).getTime() + 8 * hour;
            const newdeal: Deal = {
              themes: appointlist[i].appointment_description,
              rentedTo: appointlist[i].renter_name,
              from: start,
              to: end,
            };
            meetingrooms[appointlist[i].available_id - 1].deals.push(newdeal);
          }
        } else {
          //console.log("not run:", meetingrooms);
          const _today_ = new Date(day).getTime();
        }
      } catch (error) {
        console.error(error);
      }
    },

    async get_room(room: string) {
      try {
        const roomdata = (await get_avail_set(room)).data;
        const len = roomdata.length;
        numRooms = len;
        meetingrooms.splice(0, meetingrooms.length);
        for (let i = 0; i < len; i++) {
          const name = roomdata[i].available_name;
          meetingrooms.push({
            model: name,
            current: 0,
            deals: [],
          });
        }
      } catch (error) {
        console.error(error);
      }
    },

    handleLinkClick() {
      // 处理点击事件
      alert("你点击了链接!");
      console.log("Link clicked!");
    },
  },
};
</script>

<style scoped>
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

.text:hover {
  cursor: pointer;
  color: #1890ff;
  transition: color 0.3s;
}
</style>
