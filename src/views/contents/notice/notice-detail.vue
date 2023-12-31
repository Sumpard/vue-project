<template>
  <el-button @click="goBack">
    <el-icon><i-ep-ArrowLeft /></el-icon>返回
  </el-button>
  <h4 class="text-center">{{ title }}</h4>
  <div class="info m-4 text-center q-gutter-x-lg">
    <span>编写人：{{ name }}</span>
    <span>发布时间：{{ time }}</span>
    <span>通知类别：{{ type }}</span>
  </div>
  <div class="container">
    <v-md-editor v-model="content" height="auto" mode="preview" />
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    watch(route, (to, from) => {
      router.go(0);
    });
    const content = ref(route.query.content);
    const type = ref(route.query.type);
    const title = ref(route.query.title);
    const time = ref(route.query.time);
    const name = ref(route.query.name);

    onMounted(() => {
      // 在组件初始化时，获取路由参数
    });

    return {
      content,
      type,
      title,
      time,
      name,
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  width: 80%;
}
.info {
  color: dimgrey;
}
</style>
