<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script lang="ts">
import Highcharts from "highcharts";
import HighchartsGantt from "highcharts/modules/gantt";
import HighchartsExporting from "highcharts/modules/exporting";

HighchartsGantt(Highcharts);
//HighchartsExporting(Highcharts);

export default {
  mounted() {
    Highcharts.ganttChart("container", {
      title: {
        text: "会议室预约情况",
      },
      xAxis: {
        type:'datetime',
        min: Date.UTC(2014, 10,18,12,0,0),
        max: Date.UTC(2014, 10, 18,22,0,0),
        labels: {
          format: '{value:%H %M}', // 格式化为日期和月份
        },
      },
      series: [
        {
          name: "Project 1",
          data: [
            {
              name: "会议室1",
              start: Date.UTC(2014, 10, 18,14,0,0),
              end: Date.UTC(2014, 10, 18,15,0,0),

            },
            {
              name: "会议室2",
              start: Date.UTC(2014, 10, 18,13,30,0),
              end: Date.UTC(2014, 10, 18,14,30,0),
            },
            {
              name: "会议室3",
              start: Date.UTC(2014, 10, 18,18,0,0),
              end: Date.UTC(2014, 10, 18,18,45,0),
            },
            {
              name: "会议室4",
              start: Date.UTC(2014, 10, 18,19,0,0),
              end: Date.UTC(2014, 10, 18,20,0,0),
            },
          ],
        },
      ],
    });
  },
};
</script>

<style>
#container {
  max-width: 800px;
  margin: 1em auto;
}
</style>