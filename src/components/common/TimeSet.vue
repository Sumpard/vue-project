<template>
  <el-time-select
    v-model="startTime"
    :max-time="endTime"
    placeholder="开始时间"
    start="12:00"
    step="00:15"
    end="22:00"
    class="time"
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

<style scoped>
.time {
  margin-bottom: 10px;
}
</style>
