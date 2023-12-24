<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="header-content">
          <div>
            <img
              src="http://jxsy.seu.edu.cn/wjx/images/logo-26b1900697d4ddeb7634576944ba5a87.jpg"
              style="padding: 5px; height: 65px"
            />
          </div>
          <div class="right-side">
            <app-header />
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside :width="foo ? '64px' : '200px'">
          <app-aside v-model="foo" />
        </el-aside>
        <el-main> <router-view /> </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
const foo = ref(false);
</script>

<style scoped>
.el-row {
  align-items: center;
  vertical-align: middle;
  padding-top: 10px;
}

.el-header {
  height: 75px;
  background-color: #327be4;
  overflow: hidden;
  position: relative;
}

.header-content {
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
}

.right-side {
  margin-right: 40px;
}
</style>
