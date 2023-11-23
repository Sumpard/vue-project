<template>
    <div class="q-pa-md">
      <q-layout view="hHh Lpr lff" container style="height: 600px" class="shadow-2 rounded-borders">
        <q-header elevated class="bg-black">
          <q-toolbar>
            <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
            <q-toolbar-title>Header</q-toolbar-title>
          </q-toolbar>
        </q-header>

        <q-drawer
          v-model="drawer"
          show-if-above
          :width="200"
          :breakpoint="500"
          bordered
          class="bg-grey-4">
          <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Razvan Stoenescu</div>
            <div>@rstoenescu</div>
          </div>
          </q-img>
          <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
            <q-list>
              <template v-for="(menuItem, index) in menuList" :key="index">
                  <q-item clickable  v-ripple
                  @click="selectLabel(menuItem.label)"
                  :class="{ 'q-item-selected': menuItemlabel === menuItem.label }">
                    <q-item-section avatar>
                      <q-icon :name="menuItem.icon" />
                    </q-item-section>
                    <q-item-section>
                      {{ menuItem.label }}
                    </q-item-section>
                  </q-item>
              
                <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
              </template>
            </q-list>
          </q-scroll-area>
        </q-drawer>

        <q-page-container>
          <q-page padding>
            <p v-for="n in 15" :key="n">
              东南大学吴健雄学院（Chien-Shiung Wu College, Southeast University）成立于2004年2月，是东南大学培养拔尖创新优秀人才的荣誉学院，以世界著名物理学家、东南大学杰出校友吴健雄女士的名字命名的人才培养实验特区。学院由东南大学校长黄如教授兼任学院院长。
东南大学吴健雄学院树立起“卓越化、个性化、国际化”的育人理念，形成了具有东南大学特色的拔尖创新优秀人才培养模式，成为东南大学拔尖创新优秀人才的培养基地、教育教学改革的实践基地和管理改革的示范基地。
东南大学吴健雄学院的发展历程最早可以追溯到1985年成立的原南京工学院（东南大学前身）少年班。随着教育改革的不断深入，少年班1990年改称为强化班。在积累多年优秀人才培养经验的基础上，2004年东南大学正式成立吴健雄学院。原强化班改称为“电子信息类强化班”，并进一步开设了“机械动力类强化班”。2007年增设了本研贯通、个性化培养的“高等理工实验班”，实行导师指导、优才优育的培养方式。2016年推出开放式、个性化拔尖人才培养的“工科试验班（吴健雄班）”（简称“吴健雄班”）。从首届少年班约20人的规模，发展为现在每年招生120人左右，现有在校学生近500人。
            </p>
          </q-page>
        </q-page-container>

      </q-layout>
    </div>
  </template>

<script setup lang="ts">
//import { ref } from 'vue'

const menuItemlabel = ref<string | undefined>(undefined);

const menuList = [
  {
    icon: 'inbox',
    label: 'Inbox',
    separator: true,
    url:"/auth/login"
  },
  {
    icon: 'send',
    label: 'Outbox',
    separator: false,
    url:"/auth/login"
  },
  {
    icon: 'delete',
    label: 'Trash',
    separator: false,
    url:"/auth/login"
  },
  {
    icon: 'error',
    label: 'Spam',
    separator: true,
    url:"/auth/login"
  },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false,
    url:"/auth/login"
  },
  {
    icon: 'feedback',
    label: 'Send Feedback',
    separator: false,
    url:"/auth/login"
  },
  {
    icon: 'help',
    iconColor: 'primary',
    label: 'Help',
    separator: false,
    url:"/auth/login"
  }
]

const drawer = ref(false);

function selectLabel(mlabel: string) {
  menuItemlabel.value = mlabel;
  // $router.replace({ name: "chat" });
  // emitter.emit("session-changed", sessionId);
}

</script>

<style scoped>
.q-item-selected {
  background-color: #f0f0f0; /* 修改选中项的背景颜色 */
  font-weight: bold; /* 修改选中项的字体加粗 */
}

</style>
