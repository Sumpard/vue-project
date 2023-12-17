<!-- <template>

<div class="flex items-center">
        <el-avatar
          :size="32"
          class="mr-3"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
</div>
</template> -->
<template>
  <div class="toolbar">
    <el-dropdown>
      <!-- <el-icon style="margin-right: 8px; margin-top: 1px"
                ><setting
              /></el-icon> -->

      <span class="circle"><el-avatar :src="avatarUrl" :size="30"></el-avatar></span>

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
import { useUserStore } from '@/stores/user';
const router = useRouter();
//const {logout} = useUserStore();

function Onlogout() {
  const { logout, user } = useUserStore();
  logout();
  console.log(useUserStore().user);
  
  console.log(router)
  router.push({name:"login"});
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