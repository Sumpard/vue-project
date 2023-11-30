<template>
    <div id="timetable-chart"></div>
  </template>
  
  <script lang="ts">
import * as echarts from 'echarts'
  
  export default {
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        const chart = echarts.init(document.getElementById('timetable-chart'));
  
        const option = {
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
          },
          yAxis: {
            type: 'category',
            data: ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']
          },
          series: [{
            type: 'bar',
            data: [
              [0, 2, 'English'],
              [1, 1, 'Math'],
              [2, 2, 'Science'],
              [3, 3, 'History'],
              [4, 4, 'Art'],
              [1, 5, 'Physics'],
              [2, 6, 'Chemistry'],
              [3, 7, 'Biology'],
              [4, 8, 'Geography'],
              [0, 7, 'Music']
            ],
            label: {
              show: true,
              position: 'inside',
              formatter: function (params: { data: any[]; }) {
                return params.data[2];
              }
            },
            itemStyle: {
                color: function () {
                return '#' + Math.floor(Math.random() * 16777215).toString(16);
              }
            }
          }]
        };
  
        chart.setOption(option);
      }
    }
  };
  </script>
  
  <style>
  #timetable-chart {
    width: 100%;
    height: 400px;
  }
  </style>