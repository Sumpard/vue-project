<template>
    <div class="my-info">
      <!-- 封面图 头图 -->
      <!-- <BannerItem :banner="currentUser.banner" @changeBanner="changeBanner" /> -->
      <!-- 个人信息 -->
      <div class="info-deatil">
        <!-- <UserInfo :currentUser="currentUser" @changeAvatar="changeAvatar" /> -->
        <avatar/> 
        <div class="all-info">
          <message />
        </div>
      </div>
      <!-- 我的文章 -->
      
    </div>
  </template>

<script lang="ts" setup>
 import avatar from "./components/avatar.vue"
import message from "./components/message.vue"
</script>

<style lang="less" scoped>
@import url(./components/styles/Home.less);
</style>
