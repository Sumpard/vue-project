<template>
    <div id="chart"></div>
</template>
  
<script lang="ts">
import * as echarts from 'echarts'

export default {
    mounted() {
        this.renderChart();
    },
    methods: {
        renderChart() {
            const chart = echarts.init(document.getElementById('chart'));

            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line'
                    },
                    formatter: function (params: {
                        [x: string]: any; value: any[];
                    }[]) {
                        const seriesName = params[0].seriesName;
                        const rangeStart = params[0].value[0];
                        const rangeEnd = params[0].value[1];
                        return seriesName + ': ' + rangeStart + ' - ' + rangeEnd;
                    }
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
                    type: 'value',
                    name: 'Time'
                },
                series: [
                    {
                        name: 'English',
                        type: 'line',
                        stack: 'courses',
                        areaStyle: {},
                        data: [[8, 9], [0, 0], [0, 0], [0, 0], [0, 0]]
                    },
                    {
                        name: 'Math',
                        type: 'line',
                        stack: 'courses',
                        areaStyle: {},
                        data: [[1, 2], [9, 10], [0, 0], [0, 0], [0, 0]]
                    },
                    {
                        name: 'Science',
                        type: 'line',
                        stack: 'courses',
                        areaStyle: {},
                        data: [[3, 5], [0, 0], [10, 11], [0, 0], [0, 1]]
                    },
                    // Add more series for other courses
                ]
            };

            chart.setOption(option);
        }
    }
};
</script>
  
<style>
#chart {
    width: 100%;
    height: 400px;
}
</style>