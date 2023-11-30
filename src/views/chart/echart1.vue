<template>
	<div class="Echarts">
		<div id="main" style="width: 100%;height:100%;"></div>
	</div>
</template>

<script lang="ts">

import * as echarts from 'echarts'

export default {
	name: 'Echarts',
	methods: {
		myEcharts() {
			// 基于准备好的dom，初始化echarts实例
			var myChart = echarts.init(document.getElementById('main'));

			// 指定图表的配置项和数据
			var option = {
				title: {
					text: 'ECharts 入门示例'
				},
				tooltip: {},
				legend: {
					data: ['day']
				},
				xAxis: {
					data: ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri"]
				},
				yAxis: {
					type: 'category', // 将Y轴类型设置为'category'
				},
				series: [{
					name: 'day',
					type: 'bar',
					data: [
						[1, '12:00'],  // 将时间段转换为对应的类别
						[2, '13:00'],
						[3, '14:00'],
						[4, '15:00'],
						[5, '16:00'],
						[6, '20:00']
					],
					encode: {  // 指定数据项的维度关联
						y: 1,  // Y轴数据维度关联到第2个数据项（时间段）
						tooltip: 1  // tooltip提示框的数据维度关联到第2个数据项（时间段）
					}
				}]
			};

			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
		}
	},
	mounted() {
		this.myEcharts();
	}
}
</script>

<style>
.Echarts {
	width: 100%;
	height: 100%;
	/* 添加其他样式 */
	background-color: #f2f2f2;
	border: 1px solid #cccccc;
}
</style>