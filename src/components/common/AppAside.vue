<template>
  <div v-if="isCollapse" class="changebutton" @click="toggleCollapse">
    <el-icon><i-ep-Expand /></el-icon>
  </div>
  <div v-else class="changebutton" @click="toggleCollapse">
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
      <el-icon> <i-ep-House /> </el-icon>
      <template #title>首页</template>
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
      <el-menu-item index="seat">
        <el-icon><span class="iconfont icon-zuowei"></span></el-icon>座位预约
      </el-menu-item>
      <el-menu-item index="equipment">
        <el-icon><i-ep-Camera /></el-icon>器材预约
      </el-menu-item>
      <el-menu-item index="reservation">
        <el-icon><i-ep-Collection /></el-icon>预约记录
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="review" v-if="isAdmin">
      <template #title>
        <div>
          <el-icon><i-ep-edit /></el-icon>
          <span v-if="!isCollapse">预约审核</span>
        </div>
      </template>
      <el-menu-item index="review1">
        <el-icon><i-ep-Edit /></el-icon>待审核预约
      </el-menu-item>
      <el-menu-item index="review2">
        <el-icon><i-ep-Edit /></el-icon>已审核预约
      </el-menu-item>
      <el-menu-item index="review3">
        <el-icon><i-ep-Edit /></el-icon>已拒绝预约
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="goodlist" v-if="isAdmin">
      <el-icon> <i-ep-Box /> </el-icon>
      <span>物品列表</span>
    </el-menu-item>
    <el-menu-item index="userlist" v-if="isAdmin">
      <el-icon>
        <i-ep-User />
      </el-icon>
      <span>用户列表</span>
    </el-menu-item>
    <el-sub-menu index="notice" v-if="isAdmin">
      <template #title>
        <div>
          <el-icon><i-ep-Notebook /></el-icon>
          <span v-if="!isCollapse">通知与反馈</span>
        </div>
      </template>
      <el-menu-item index="editnotice">
        <el-icon> <i-ep-Edit /> </el-icon>
        <span>编写通知</span>
      </el-menu-item>
      <el-menu-item index="noticelist">
        <el-icon> <i-ep-ChatLineSquare /> </el-icon>
        <span>通知列表</span>
      </el-menu-item>
      <el-menu-item index="feedbackQuestion">
        <el-icon>
          <i-ep-Box />
        </el-icon>
        <span>问题反馈列表</span>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="contactus">
      <template #title>
        <div>
          <el-icon><i-ep-Phone /></el-icon>
          <span v-if="!isCollapse">联系我们</span>
        </div>
      </template>
      <el-menu-item index="questionsub">
        <el-icon><i-ep-Postcard /></el-icon>填写反馈
      </el-menu-item>
      <el-menu-item index="questionlist">
        <el-icon><i-ep-Message /></el-icon>反馈记录
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/user";

const isCollapse = defineModel<boolean>({ default: false });

function toggleCollapse() {
  isCollapse.value = !isCollapse.value;
}

const userStore = useUserStore();
const { isAdmin } = userStore;
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
