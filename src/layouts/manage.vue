
<template>
  <div class="common-layout">
  <el-container>
    <el-header>
      <!-- <el-row :gutter="20">
              <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
              <el-col :span="16"><div class="grid-content ep-bg-purple" /></el-col>
              <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
              </el-row> -->
        <!-- <tophead></tophead> -->
        <div class="header-content">
          <div>
            <img src="http://jxsy.seu.edu.cn/wjx/images/logo-26b1900697d4ddeb7634576944ba5a87.jpg"
              style="padding: 5px;height: 65px;">
          </div>
          <div class="right-side">
            <tophead />
          </div>
        </div>

      </el-header>
      <el-container>
        <el-aside :width="foo ? '64px' : '200px'">
          <sss v-model="foo" />
        </el-aside>
        <el-main> <router-view /> </el-main>
      </el-container>
    </el-container>
  </div>
</template>
 
<script setup >
import sss from '@/components/common/aside.vue'

import tophead from '@/components/common/header.vue'
//  import room from '@/components/room.vue'

const foo = ref("");

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
}</style>