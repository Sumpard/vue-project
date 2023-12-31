<template>
  <div class="header-content">
    <div>
      <router-link to="/">
        <img src="/img/logo.jpg" class="logo-image" />
      </router-link>
    </div>
    <div class="right-side">
      <div class="toolbar">
        <el-dropdown v-if="user">
          <span class="circle"><el-avatar :src="sf(user.avatar)" :size="30"></el-avatar></span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <a @click="homepage">个人中心</a>
              </el-dropdown-item>
              <el-dropdown-item>
                <a @click="handleLogout">退出登录</a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import Message from "@/utils/message";
import { sf } from "@/utils/static-file";

const router = useRouter();

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
function homepage() {
  router.push({ name: "user-home" });
}

function handleLogout() {
  userStore.logout();
  Message.info("退出登录");
  router.push({ name: "login" });
}
</script>

<style scoped>
.header-content {
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
}

.logo-image {
  padding: 5px;
  height: 65px;
  user-select: none;
  -webkit-user-drag: none;
}

.right-side {
  margin-right: 40px;
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
