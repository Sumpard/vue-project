<template>
  <div>
    <div ref="containerRef" class="scrolling-container"></div>
    <el-dialog v-model="dialogVisible" title="预约信息" width="30%">
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

<script setup lang="ts">
import { ElMessageBox } from "element-plus";
import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsGantt from "highcharts/modules/gantt";
import Highchartsavocado from "highcharts/themes/avocado";
import Highchartsgray from "highcharts/themes/gray";
import HighchartsGridLight from "highcharts/themes/grid-light";
import HighchartsSand from "highcharts/themes/sand-signika";
import moment from "moment";

import { Appointment, getAppoint_by_day, get_avail_set } from "@/api/meeting_gante";
import { formatTimestamp } from "@/api/timeformat";

type Deal = {
  rentedTo: string;
  from: number;
  to: number;
};

type M_Equip = {
  model: string;
  deals: Deal[];
  current: number;
};

HighchartsGantt(Highcharts);
//HighchartsExporting(Highcharts);
HighchartsGridLight(Highcharts);
//Highcharts.AST.allowedAttributes.push("@click");
/* Highcharts.setOptions({
  bypassHTMLFiltering: true 
}) */

const containerRef = ref();

var timestamp: number;
var today = new Date();
const hour = 1000 * 60 * 60;
const map = Highcharts.map;
let numequips = 7;
let series: { name: string; data: any; current: any }[];
let equipments: M_Equip[] = [];
//console.log(meetingrooms);

const props = defineProps<{
  timett: string;
  map_: { [key: string]: [number, number] };
}>();

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
  roomid.value = data1;
  rentedToData.value = "借用者：" + data2;
  starttime.value = "开始时间：" + moment(num3).format("YYYY-MM-DD HH:mm");
  endtime.value = "结束时间：" + moment(num4).format("YYYY-MM-DD HH:mm");
  dialogVisible.value = true; //- 28800000
};

watch(
  () => props.timett,
  (newVal, oldVal) => {
    // todo
    if (newVal == null) return;
    else {
      timestamp = new Date(props.timett).getTime();
      const today = timestamp;
      //console.log("time_select changed:", newVal, today);

      const timeformat = formatTimestamp(today);
      get_today_equip(timeformat, "SUBMITTED").then(() => {
        //console.log("watch", equipments);
        series = equipments.map(function (equipment, i) {
          const data = equipment.deals.map(function (deal: { rentedTo: any; from: any; to: any }) {
            return {
              id: equipment.model,
              rentedTo: deal.rentedTo,
              start: deal.from,
              end: deal.to,
              y: i,
            };
          });
          //console.log("data:", data, meetingroom, meetingroom.model, meetingroom.deals[meetingroom.current]);
          return {
            name: equipment.model,
            data: data,
            current: equipment.deals[equipment.current],
          };
        });
        Highcharts.ganttChart(containerRef.value, {
          series: series,
          title: {
            text: "器材预约",
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
                    text: "器材",
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
                    //console.log("点击事件触发");
                    var point = event.point;
                    console.log("watch click!");
                    openDialog(point.id, point.rentedTo, point.start, point.end);
                  },
                },
              },
            },
          },
        });
      });
    }
  }
);

onMounted(async () => {
  //console.log("mounted");
  /*const instance = getCurrentInstance()!;
  const { dialogVisible, handleClose, openDialog } = instance.proxy! as unknown as {
    dialogVisible: any;
    handleClose: () => void;
    openDialog: (arg0: string, arg1: string, arg2: string, arg3: string) => void;
  };*/
  await get_equip("equipment");

  //setup instance
  today.setHours(0, 0, 0, 0);

  const today_ = today.getTime();
  //meeting get
  const timeformat = formatTimestamp(today_);

  await get_today_equip(timeformat, "SUBMITTED");

  series = equipments.map((equipment, i) => {
    const data = equipment.deals.map((deal) => {
      return {
        id: equipment.model,
        rentedTo: deal.rentedTo,
        start: deal.from,
        end: deal.to,
        y: i,
      };
    });
    //console.log("data:", data, equipments);
    return {
      name: equipment.model,
      data: data,
      current: equipment.deals[equipment.current],
    };
  });

  Highcharts.ganttChart(containerRef.value, {
    series: series,
    title: {
      text: "器材预约",
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
              text: "器材",
            },
            categories: map(series, (s: { name: any }) => {
              //https://www.baidu.com/
              const link = '<a href="javascript:console.log("1111")" ' + ">(详细信息)</a>";
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
              console.log("mounted click");
              openDialog(point.id, point.rentedTo, point.start, point.end);
            },
          },
        },
      },
    },
  });
});

async function get_today_equip(day: string, status: string) {
  try {
    const appointlist: Appointment[] = await getAppoint_by_day(day, status, "equipment");
    //console.log("appoint:", appointlist);
    if (appointlist) {
      for (const appoint of appointlist) {
        const start = new Date(appoint.appoint_start_time).getTime() + 8 * hour;
        const end = new Date(appoint.appoint_end_time).getTime() + 8 * hour;
        const newdeal: Deal = {
          rentedTo: appoint.renter_name,
          from: start,
          to: end,
        };
        //equipments[appointlist[i].available_id].deals.push(newdeal);
        //console.log(props.map_, appoint);
        equipments[props.map_[appoint.available_name][1]].deals.push(newdeal);
      }
    } else {
      const _today_ = new Date(day).getTime();
    }
    for (let i = 0; i < numequips; i++) {
      const index: Deal = { rentedTo: "test", from: 1, to: 1 };
      equipments[i].deals.push(index);
    }
  } catch (error) {
    console.error(error);
  }
}

async function get_equip(equip: string) {
  try {
    const equipdata = (await get_avail_set(equip)).data;

    const len = equipdata.length;

    numequips = len;

    equipments.splice(0, equipments.length);
    for (let i = 0; i < len; i++) {
      const name = equipdata[i].available_name;
      //console.log("name", name);
      const newequip: M_Equip = {
        model: name,
        current: 0,
        deals: [],
      };
      equipments.push(newequip);
    }
  } catch (error) {
    console.error(error);
  }
}

function handleLinkClick() {
  // 处理点击事件
  alert("你点击了链接!");
  console.log("Link clicked!");
}
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

.text:hover {
  cursor: pointer;
  color: #1890ff;
  transition: color 0.3s;
}
</style>

/* meetingrooms = [ { model: '会议室1', current: 1, deals: [ { rentedTo: '卢婷', from: today_ + 21 * hour, to: today_ +
22 * hour }, // more deals... { rentedTo: '许睿', from: today_ + 26 * hour, to: today_ + 26.5 * hour }, ] }, // more {
model: '会议室2', current: 0, deals: [ { rentedTo: '历婷', from: today_ + 22 * hour, to: today_ + 23 * hour }, // more
deals... { rentedTo: '勾睿', from: today_ + 26 * hour, to: today_ + 27.5 * hour }, ] }, { model: '会议室3', current: 0,
deals: [ { rentedTo: '历闻', from: today_ + 22 * hour, to: today_ + 24 * hour }, ] }, ]; */
