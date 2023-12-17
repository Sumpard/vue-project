<template>
    <div>

        <div ref="container" class="scrolling-container"></div>

        <!--  <el-button plain @click="dialogVisible = true">
            click to open the Dialog
        </el-button> -->
        <!-- <el-dialog v-model="dialogVisible" title="会议信息" width="30%" :before-close="handleClose"> -->
        <el-dialog v-model="dialogVisible" title="会议信息" width="30%">
            <span>{{ roomid }}</span>
            <p>{{ rentedToData }}</p>
            <p>{{ starttime }}</p>
            <p>{{ endtime }}</p>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">
                        关闭
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
  
<script lang="ts">
import Highcharts from 'highcharts';
import HighchartsGantt from 'highcharts/modules/gantt';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsGridLight from 'highcharts/themes/grid-light';
import Message from "@/utils/message";
import submitdate from '@/views/room/reserveRoom.vue'
import { ref, getCurrentInstance } from 'vue'
import { ElMessageBox } from 'element-plus'
import moment from 'moment';

type Deal = {
    id: string;
    rentedTo: string;
    start: string;
    end: string;
    y: number;
};

type M_Room = {
    name: string;
    data: Deal[];
    current: Deal | undefined;
};

HighchartsGantt(Highcharts);
//HighchartsExporting(Highcharts);
HighchartsGridLight(Highcharts);

var timestamp: number;
var today = new Date();
const hour = 1000 * 60 * 60;
const map = Highcharts.map;
let series: M_Room[];
let meetingrooms;



export default {

    props: {
        timett: {
            type: String,
            required: true
        }
    },

    setup() {
        const dialogVisible = ref(false);
        const roomid = ref('');
        const rentedToData = ref('');
        const starttime = ref('');
        const endtime = ref('');
        const handleClose = (done: () => void) => {
            ElMessageBox.confirm('Are you sure to close this dialog?')
                .then(() => {
                    done()
                })
                .catch(() => {
                    // catch error
                })
        }
        const openDialog = (data1: string, data2: string, data3: string, data4: string) => {
            const num3 = parseInt(data3, 10) - 28800000;
            const num4 = parseInt(data4, 10) - 28800000;
            //console.log("num: ",num3,num4,num3.toString());
            roomid.value = data1;
            rentedToData.value = "借用者：" + data2;
            starttime.value = "开始时间：" + moment(num3).format('YYYY-MM-DD HH:mm');
            endtime.value = "结束时间：" + moment(num4).format('YYYY-MM-DD HH:mm');
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
        'timett'(newVal, oldVal) {

            // todo
            if (newVal == null)
                return;
            else {
                timestamp = new Date(this.timett).getTime();
                const today = timestamp;
                console.log('time_select changed:', newVal, today);
                Highcharts.ganttChart(this.$refs.container, {
                    series: series,
                    title: {
                        text: '会议室预约'
                    },
                    //credits
                    credits: {
                        //enabled: false
                        text: '吴健雄学院',
                        href: ''
                    },
                    tooltip: {

                        followPointer: true,
                        //这边从00：00⏲
                        pointFormat:
                            '<span>借用者: {point.rentedTo}</span><br/>' +
                            '<span>开始时间: {point.start:%H: %M}</span><br/>' +
                            '<span>结束时间: {point.end:%H: %M}</span>'
                    },
                    xAxis: {
                        currentDateIndicator: false,
                        min: today + 20 * hour,
                        max: today + 30 * hour,
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
                            ]
                        }
                    },
                    plotOptions: {
                        series: {
                            point: {
                                events: {
                                    click: (event: { point: any; }) => {
                                        console.log('点击事件触发');
                                        var point = event.point;
                                        //console.log(dialogVisible.value);
                                        console.log(point.rentedTo, point.start, today, this.timett, timestamp);
                                        //openDialog(point.id, point.rentedTo, point.start, point.end);
                                    }
                                }
                            }
                        }
                    }
                });
            }
        },
    },

    mounted() {

        //console.log('timett:', this.timett);

        //var today = new Date();
        //var a = new getdate();
        const instance = getCurrentInstance()!;
        const { dialogVisible, handleClose, openDialog } = instance.proxy! as unknown as {
            dialogVisible: any;
            handleClose: () => void;
            openDialog: (arg0: string, arg1: string, arg2: string, arg3: string) => void;
        };


        console.log(":", today);
        today.setHours(0, 0, 0, 0);
        /* today.setUTCMinutes(0);
        today.setUTCSeconds(0);
        today.setUTCMilliseconds(0); */
        console.log(":", today);
        const today_ = today.getTime();
        console.log(":", today_);
        //这边从08：00⏲
        meetingrooms = [
            {
                model: '会议室1',
                current: 1,
                deals: [
                    {
                        rentedTo: '卢婷',
                        from: today_ + 21 * hour,
                        to: today_ + 22 * hour
                    },
                    // more deals...
                    {
                        rentedTo: '许睿',
                        from: today_ + 26 * hour,
                        to: today_ + 26.5 * hour
                    },
                ]
            },
            // more 
            {
                model: '会议室2',
                current: 0,
                deals: [
                    {
                        rentedTo: '历婷',
                        from: today_ + 22 * hour,
                        to: today_ + 23 * hour
                    },
                    // more deals...
                    {
                        rentedTo: '勾睿',
                        from: today_ + 26 * hour,
                        to: today_ + 27.5 * hour
                    },
                ]
            },
            {
                model: '会议室3',
                current: 0,
                deals: [
                    {
                        rentedTo: '历闻',
                        from: today_ + 22 * hour,
                        to: today_ + 24 * hour
                    },
                ]
            },
        ];

        series = meetingrooms.map(function (meetingroom, i) {
            const data = meetingroom.deals.map(function (deal) {
                return {
                    id: '会议室-' + (i + 1),
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
                text: '会议室预约'
            },
            //credits
            credits: {
                //enabled: false
                text: '吴健雄学院',
                href: ''
            },
            tooltip: {

                followPointer: true,
                //这边从00：00⏲
                pointFormat:
                    '<span>借用者: {point.rentedTo}</span><br/>' +
                    '<span>开始时间: {point.start:%H: %M}</span><br/>' +
                    '<span>结束时间: {point.end:%H: %M}</span>'
            },
            xAxis: {
                currentDateIndicator: false,
                min: today_ + 20 * hour,
                max: today_ + 30 * hour,
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
                        /* {
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
                        } */
                    ]
                }
            },
            plotOptions: {
                series: {
                    point: {
                        events: {
                            click: (event: { point: any; }) => {
                                console.log('点击事件触发');
                                var point = event.point;
                                //console.log(dialogVisible.value);
                                console.log(point.rentedTo, point.start, today_, "x", this.timett, "xx", timestamp);
                                openDialog(point.id, point.rentedTo, point.start, point.end);
                            }
                        }
                    }
                }
            }
        });


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