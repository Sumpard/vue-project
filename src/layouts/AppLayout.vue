<template>
  <div class="common-layout">
    <el-container>
      <el-header> <app-header /> </el-header>
      <el-container>
        <app-aside />
        <el-main> <router-view /> </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.el-header {
  height: 75px;
  background-color: #327be4;
  overflow: hidden;
  position: relative;
}
</style>
