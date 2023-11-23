<template>
    <Bar
      id="my-chart-1"
      :options="chartOptions"
      :data="chartData"
    />
  </template>
  
  <script>
  import { Bar,Line } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'BarChart',
    components: { Bar },
    data() {
      return {
        chartData: {
          labels: [ '会议室1', '会议室2', '会议室3', '会议室4', '会议室5' ],
          datasets: [ { data: [40, 20, 12,1,1] } ]
        },
        chartOptions: {
          responsive: true
          
        }
      }
    },

    /* computed: {
      chartData() { return  },
      chartOptions() { return  }
    } */
  }
  </script>