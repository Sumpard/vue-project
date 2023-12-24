<template>
  <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px" >
    <el-radio-button :label="false" v-if="isCollapse"><el-icon ><i-ep-Expand /></el-icon></el-radio-button>
    <el-radio-button :label="true" v-else><el-icon ><i-ep-Fold /></el-icon></el-radio-button>
  </el-radio-group> -->
  <div class="changebutton" @click="toggleCollapse" v-if="isCollapse">
    <el-icon><i-ep-Expand /></el-icon>
  </div>
  <div class="changebutton" @click="toggleCollapse" v-else>
    <el-icon><i-ep-Fold /></el-icon>
  </div>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    active-border-color="blue"
    :collapse="isCollapse"
    :collapse-transition="false"
    :router="true"
  >
    <el-menu-item index="homepage">
      <el-icon>
        <i-ep-House />
      </el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu index="reserve">
      <template #title>
        <div>
          <el-icon><i-ep-edit /></el-icon>
          <span v-if="!isCollapse">预约管理</span>
        </div>
      </template>
      <el-menu-item index="reserveroom">
        <el-icon><span class="iconfont icon-huiyishi"></span></el-icon>会议室预约
      </el-menu-item>
      <el-menu-item index="seat" @click="$router.push('/imgUpload')">
        <el-icon><span class="iconfont icon-zuowei"></span></el-icon>座位预约
      </el-menu-item>
      <el-menu-item index="equipment">
        <el-icon><i-ep-Camera /></el-icon>器材预约
      </el-menu-item>
      <el-menu-item index="reservation">
        <el-icon><i-ep-Collection /></el-icon>预约记录
      </el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="contactus">
      <template #title>
        <div>
          <el-icon><i-ep-Phone /></el-icon>
          <span v-if="!isCollapse">联系我们</span>
        </div>
      </template>
      <el-menu-item index="feedback" @click="$router.push('/contact')">
        <el-icon><i-ep-Postcard /></el-icon>填写反馈
      </el-menu-item>
      <el-menu-item index="response" @click="$router.push('/response')">
        <el-icon><i-ep-Message /></el-icon>反馈记录
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
const isCollapse = defineModel<boolean>({ default: false });

function toggleCollapse() {
  isCollapse.value = !isCollapse.value;
}
</script>

<style scoped>
.changebutton {
  border-right: solid 1px #dcdfe6;
  border-bottom: solid 1px #dcdfe6;
  background-color: #ffffff;
  /* 设置文本大小*/
  font-size: 20px;
  /* // 设置文本行高 */
  line-height: 40px;
  /* // 设置文本颜色 */

  /* // 设置文本居中 */
  text-align: center;
  /* // 设置文本间距 */
  letter-spacing: 0.2em;
  /* // 设置鼠标悬浮变小手效果 */
  cursor: pointer;
}

.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
}

.icon-users {
  width: 1.125em;
}

.iconfont icon-huiyishi {
  margin-right: 2px;
}

.el-menu-item.is-active {
  color: #327be4;
}

w .expand {
  border-right: solid 1px #dcdfe6;
}
</style>
