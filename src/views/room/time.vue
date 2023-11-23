<template>
  <el-time-select
      v-model="startTime"
      :max-time="endTime"
      class="mr-4"
      placeholder="开始时间"
      start="12:00"
      step="00:15"
      end="22:00"
    />
    <el-time-select
      v-model="endTime"
      :min-time="startTime"
      placeholder="结束时间"
      start="12:00"
      step="00:15"
      end="22:30"
    />
</template>

<script lang="ts">
  export default {
    data() {
      return {
        startTime: '',
        endTime: '',
        defalutValue: null
      };
    }
  }
</script>