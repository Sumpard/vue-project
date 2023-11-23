<template>
    <Bar
      id="my-chart-2"
      :options="chartOptions"
      :data="chartData"
    />
  </template>
  
  <script lang="ts">
  import { Bar,Line } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'BarChart2',
    extends: Line,
    components: { Bar },

    data() {
      return {
        chartData: {
          labels: ['2020-01-01', '2020-01-02', '2020-01-03'],
          datasets: [
            {
              label: 'Hours',
              data: [
                [0, 1], 
                [3, 5],
                [12, 16]
              ]
            }
          ]
        },
        chartOptions: {
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                unit: 'day'
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Hours'
              },
              ticks: {
                min: 0,
                max: 24
              }
            }]
          }
        }
      }
    },
    
  }
  </script>