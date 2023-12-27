<template>
  <el-aside :width="isCollapse ? '64px' : '200px'">
    <div class="changebutton" @click="isCollapse = !isCollapse">
      <el-icon>
        <i-ep-Expand v-if="isCollapse" />
        <i-ep-Fold v-else />
      </el-icon>
    </div>
    <el-menu active-border-color="blue" :collapse="isCollapse" :collapse-transition="false" :router="true">
      <template v-for="item in menus" :key="item.index">
        <template v-if="!item.admin || isAdmin">
          <el-sub-menu v-if="item.children" :index="item.index">
            <template #title>
              <el-icon> <component :is="item.icon" /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item v-for="subItem in item.children" :index="subItem.index">
              <el-icon> <component :is="subItem.icon" /></el-icon>
              <template #title>{{ subItem.name }}</template>
            </el-menu-item>
          </el-sub-menu>
          <template v-else>
            <el-menu-item :index="item.index">
              <el-icon> <component :is="item.icon" /></el-icon>
              <template #title>{{ item.name }}</template>
            </el-menu-item>
          </template>
        </template>
      </template>
    </el-menu>
  </el-aside>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/user";

const isCollapse = ref(false);

const menus = [
  { index: "homepage", name: "首页", icon: IconEpHouse },
  {
    index: "reserve",
    name: "预约管理",
    icon: IconEpEdit,
    children: [
      { index: "reserveroom", name: "会议室预约", icon: IconEpEdit },
      { index: "seat", name: "座位预约", icon: IconEpEdit },
      { index: "equipment", name: "器材预约", icon: IconEpCamera },
      { index: "reservation", name: "预约记录", icon: IconEpCollection },
    ],
  },
  {
    index: "review",
    name: "预约审核",
    icon: IconEpEdit,
    children: [
      { index: "review1", name: "待审核预约", icon: IconEpEdit },
      { index: "review2", name: "已审核预约", icon: IconEpEdit },
      { index: "review3", name: "已拒绝预约", icon: IconEpEdit },
    ],
    admin: true,
  },
  {
    index: "goodlist",
    name: "物品列表",
    icon: IconEpBox,
    admin: true,
  },
  {
    index: "userlist",
    name: "用户列表",
    icon: IconEpUser,
    admin: true,
  },
  {
    index: "notice",
    name: "通知与反馈",
    icon: IconEpEdit,
    children: [
      { index: "editnotice", name: "编写通知", icon: IconEpEdit },
      { index: "noticelist", name: "通知列表", icon: IconEpChatLineSquare },
      { index: "feedbackQuestion", name: "问题反馈列表", icon: IconEpBox },
    ],
    admin: true,
  },
  {
    index: "contact",
    name: "联系我们",
    icon: IconEpPhone,
    children: [
      { index: "questionsub", name: "填写反馈", icon: IconEpPostcard },
      { index: "questionlist", name: "反馈记录", icon: IconEpMessage },
    ],
  },
];

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
</style>
