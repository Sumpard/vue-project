<template>
  <div class="my-info mdui-card">
    <!-- 封面图 头图 -->
    <!-- <BannerItem :banner="currentUser.banner" @changeBanner="changeBanner" /> -->
    <!-- 个人信息 -->
    <div class="info-deatil">
      <user-avatar-card />
      <div class="all-info">
        <user-info-card />
      </div>
    </div>
    <!-- 我的文章 -->
  </div>
</template>

<script setup lang="ts">
import UserAvatarCard from "./components/UserAvatarCard.vue";
import UserInfoCard from "./components/UserInfoCard.vue";
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/gh/AyagawaSeirin/homepage@latest/mdui/css/mdui.min.css");

@media screen and (min-width: 320px) {
  .my-info {
    width: 100%;
    overflow: hidden;
    min-height: 570px;
    transition: all 0.8s ease;
    background-color: rgb(255, 255, 255);

    font-family: "maoken", "urafont", "微软雅黑";
    font-weight: 500;
    border: 0.1rem solid #dcdfe6;
    border-radius: 1rem;
  }

  .my-info .info-deatil {
    display: flex;
    flex-direction: column;
  }

  .my-info .info-deatil .all-info {
    padding: 1.5rem 40px;
    width: 100%;
    display: flex;
    flex-direction: column;
    color: rgb(0, 0, 0);
  }
}

@media screen and (min-width: 992px) {
  .my-info {
  }

  .my-info .info-deatil {
    flex-direction: row;
  }
}
</style>
