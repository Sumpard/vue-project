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
    end="22:00"
  />
</template>

<script setup lang="ts">
const startTime = ref("");
const endTime = ref("");

const reset = () => {
  startTime.value = "";
  endTime.value = "";
};

defineExpose({ startTime, endTime, reset });
</script>
