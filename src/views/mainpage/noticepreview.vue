<template>
  <h4 class="title">{{ title }}</h4>
  <br />
  <p class="info">编写人：{{ name }} &ensp;&ensp;&ensp; 发布时间：{{ time }}&ensp;&ensp;&ensp; 通知类别：{{ type }}</p>
  <br />
  <div class="container">
    <v-md-editor v-model="content" height="auto" mode="preview" />
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const content = ref(route.query.content);
    const type = ref(route.query.type);
    const title = ref(route.query.title);
    const time = ref(route.query.time);
    const name = ref(route.query.name);

    onMounted(() => {
      // 在组件初始化时，获取路由参数
      console.log("Content:", content.value);
      console.log("Type:", type.value);
      console.log("Title:", title.value);
      console.log("Time:", time.value);
      console.log("Name:", name.value);
    });

    return {
      content,
      type,
      title,
      time,
      name,
    };
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  width: 80%;
}
.title {
  text-align: center;
}
.info {
  text-align: center;
  color: dimgrey;
}
</style>
