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
import { getNotice } from "@/api/notice";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    watch(route, (to, from) => {
      router.go(0);
    });
    const content = ref("");
    const type = ref("");
    const title = ref("");
    const time = ref("");
    const name = ref("");

    onMounted(() => {
      async () => {
        try {
          const id = route.params.id;
          console.log("get notice by id:", id);
          const response = await getNotice(id);

          if (response.code === 200) {
            console.log("response:", response);
            content.value = response.notice_content;
          } else {
            console.error("Failed to fetch data:", response.msg);
          }
        } catch (error) {
          console.error("API request failed:", error);
        }
      };
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
