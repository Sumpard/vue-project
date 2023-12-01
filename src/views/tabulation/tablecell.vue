<template>
    <template v-if="data">
      <!-- <td :rowspan="rowspan ?? (data as MeetingSession).span" > -->
      <td :rowspan=" (data as MeetingSession).span">
        <div
          class="section-label"
          :style="{
            'background-color': `hsl(${hue(data)}, 80%, 90%)`,
            'border-color': `hsl(${hue(data)}, 50%, 80%)`,
          }"
        >
          <p>{{ data.start_time }}-{{ data.end_time }}</p>
          <p>{{ data.room }}</p>
          <p>{{ data.pname }} </p>
          <p>{{ data.theme }}</p>
        </div>
      </td>
    </template>
  </template>
  
  <script setup lang="ts">
  import { ClassSession } from "@/data/course-info";
  import { MeetingSession } from "@/data/meeting";
  import { isArray } from "lodash";
  
  const props = defineProps<{ data: MeetingSession| null; rowspan?: number }>();
  
  const getHashCode = (str: string) => {
    let hash = 1315423911;
    for (let i = str.length - 1; i >= 0; i--) {
      hash ^= (hash << 5) + str.charCodeAt(i) + (hash >> 2);
    }
    return hash & 0x7fffffff;
  };
  
  const hue = (cs: MeetingSession) => cs ? getHashCode(cs.pname) % 360 : 0;
  </script>
  
  <style lang="scss" scoped>
  .align-top {
    vertical-align: top;
  }
  
  .section-label {
    border: 2px solid;
    border-radius: 8px;
    font-size: 0.8em;
    padding: 2px;
    margin: 2px;
  
    p {
      margin: 0;
      text-align: center;
    }
  }
  </style>
  