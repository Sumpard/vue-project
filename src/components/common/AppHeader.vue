<template>
  <div class="toolbar">
    <el-dropdown v-if="user">
      <span class="circle"><el-avatar :src="user.avatarUrl" :size="30"></el-avatar></span>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <a href="/homeindex">个人中心</a>
          </el-dropdown-item>
          <el-dropdown-item>
            <a @click="Onlogout">退出登录</a>
          </el-dropdown-item>
          <el-dropdown-item>Delete</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import Message from "@/utils/message";

const router = useRouter();

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

function Onlogout() {
  userStore.logout();
  Message.info("退出登录");
  router.push({ name: "login" });
}
</script>

<style scoped>
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 60px;
}

.circle {
  position: relative;
  width: 38px;
  height: 38px;
  border: 2px solid #ffffff;

  border-radius: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
