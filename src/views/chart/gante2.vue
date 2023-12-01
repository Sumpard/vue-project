<template>
    <div>
        <div ref="container" class="scrolling-container"></div>
    </div>
</template>
  
<script lang="ts">
import Highcharts from 'highcharts';
import HighchartsGantt from 'highcharts/modules/gantt';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsGridLight from 'highcharts/themes/grid-light';

HighchartsGantt(Highcharts);
//HighchartsExporting(Highcharts);
HighchartsGridLight(Highcharts);

export default {
    mounted() {
        var today = new Date();
        const day = 1000 * 60 * 60 * 24;
        const hour = 1000 *60 * 60;
        const minite = 1000 *60;
        const map = Highcharts.map;
        const dateFormat = Highcharts.dateFormat;
        let series;
        let meetingrooms;

        today.setUTCHours(0);
        today.setUTCMinutes(0);
        today.setUTCSeconds(0);
        today.setUTCMilliseconds(0);
        today = today.getTime();

        meetingrooms = [
            {
                model: '会议室1',
                current: 1,
                deals: [
                    {
                        rentedTo: '卢婷',
                        from: today +13*hour,
                        to: today + 14*hour
                    },
                    // more deals...
                    {
                        rentedTo: '许睿',
                        from: today + 18*hour,
                        to: today + 18.5*hour
                    },
                ]
            },
            // more cars...
            {
                model: '会议室2',
                current: 0,
                deals: [
                    {
                        rentedTo: '历婷',
                        from: today +14*hour,
                        to: today + 15*hour
                    },
                    // more deals...
                    {
                        rentedTo: '勾睿',
                        from: today + 18*hour,
                        to: today + 19.5*hour
                    },
                ]
            },
            {
                model: '会议室3',
                current: 0,
                deals: [
                    {
                        rentedTo: '历闻',
                        from: today +14*hour,
                        to: today + 16*hour
                    },
                ]
            },
        ];

        series = meetingrooms.map(function (meetingroom, i) {
            const data = meetingroom.deals.map(function (deal) {
                return {
                    id: 'deal-' + i,
                    rentedTo: deal.rentedTo,
                    start: deal.from,
                    end: deal.to,
                    y: i
                };
            });
            return {
                name: meetingroom.model,
                data: data,
                current: meetingroom.deals[meetingroom.current]
            };
        });

        Highcharts.ganttChart(this.$refs.container, {
            series: series,
            title: {
                text: '会议室预约系统'
            },
            tooltip: {
                pointFormat:
                    '<span>借用者: {point.rentedTo}</span><br/>' +
                    '<span>开始时间: {point.start:%H: %M}</span><br/>' +
                    '<span>结束时间: {point.end:%H: %M}</span>'
            },
            xAxis: {
                currentDateIndicator: true,
                min : today+12*hour,
                max : today+22*hour,
            },
            yAxis: {
                type: 'category',
                grid: {
                    columns: [
                        {
                            title: {
                                text: '会议室'
                            },
                            categories: map(series, function (s: { name: any; }) {
                                return s.name;
                            })
                        },
                        {
                            title: {
                                text: '借用者'
                            },
                            categories: map(series, function (s: { current: { rentedTo: any; }; }) {
                                return s.current.rentedTo;
                            })
                        },
                        {
                            title: {
                                text: '开始时间'
                            },
                            categories: map(series, function (s: { current: { from: any; }; }) {
                                return dateFormat('%H: %M', s.current.from);
                            })
                        },
                        {
                            title: {
                                text: '结束时间'
                            },
                            categories: map(series, function (s: { current: { to: any; }; }) {
                                return dateFormat('%H. %M', s.current.to);
                            })
                        }
                    ]
                }
            }
        });
    }
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
</style>