<template>
  <div style="margin: auto">
    <div class="title-block">
      <div class="center-block">
        <div>课程表</div>
      </div>
      <div class="side-switch">
        <el-switch inline-prompt active-text="周课表" inactive-text="学期课表" width="6em" />
      </div>
    </div>
    <table class="pure-table pure-table-bordered timetable centered-table">
      <tr>
        <th>节次/星期</th>
        <th>星期一</th>
        <th>星期二</th>
        <th>星期三</th>
        <th>星期四</th>
        <th>星期五</th>
        <th>星期六</th>
        <th>星期日</th>
      </tr>
      <tr v-for="i in _.range(13)">
        <td>{{ i + 1 }}</td>
        <template v-for="j in _.range(7)">
          <template v-if="showType == 'semester'">
            <my-schedule-cell v-if="i == 3 && j == 4" :data="getShow(i, j) ?? null" :rowspan="i < 10 ? 2 : 1" />
            <td v-else></td>
          </template>
          <template v-else>
            <td></td>
          </template>
        </template>
      </tr>
    </table>
  </div>
</template>
  
<script setup lang="ts">
import _ from "lodash";
import MyScheduleCell from "./tablecell.vue";
import { MeetingSession } from "@/data/meeting";

const showTypeWeek = ref(false);
const showType = computed(() => (showTypeWeek ? "semester" : "week"));
const meetings:MeetingSession[] =[
  new MeetingSession(
  /* start_time */ 1638357600, 
  /* end_time */ 1643857600,   
  /* pname */ "JZX",     
  /* room */ 101,              
  /* theme */ "AgendaTopic"   
)
 ]
const getShow = (row: number, col: number) => {
    return  meetings;
};
</script>
  
<style lang="scss">
.title-block {
  background-color: #edf0e5;
  padding-top: 10px;
  user-select: none;

  --blue: #2196f3;
  --blue-dark: #1486e4;
  --blue-light: #409eff;

  .center-block {
    margin: 0px auto;
    padding-bottom: 10px;
    text-align: center;
    height: 3.5em;

    div:nth-child(1) {
      margin-bottom: 0.5em;
      color: var(--blue-dark);
      font-size: large;
    }

    div:nth-child(2) {
      color: var(--blue);

      .el-button {
        border-color: var(--blue);
        --color: var(--blue);
      }
    }
  }

  .side-switch {
    position: absolute;
    left: 2em;
    top: 2em;
    display: block;

    .el-switch {
      --el-switch-on-color: var(--blue-light);
      --el-switch-off-color: var(--blue-light);
    }
  }
}

.pure-table-bordered {
  border-collapse: collapse;

  td,
  th {
    border: 1px solid #4a90d6;
  }
}

.pure-table {

  td,
  th {
    font-size: inherit;
    margin: 0;
    overflow: visible;
  }
}

.timetable {
  background: #f3f7ec77;
  text-align: center;

  th {
    width: 3em;
  }

  tr {
    height: 3.5em;
  }

  td:not(:nth-child(1)) {
    width: 8em;
  }
}

.centered-table {
  margin: auto;
  /* 将表格本身居中 */
}</style>