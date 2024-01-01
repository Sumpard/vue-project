<template>
  <el-button @click="goBack">
    <el-icon><i-ep-ArrowLeft /></el-icon>返回
  </el-button>
  <div v-if="notice">
    <div>
      <h4 class="text-center">{{ notice.notice_title }}</h4>
      <div class="info m-4 text-center q-gutter-x-lg">
        <span>编写人：{{ notice.publisher_name }}</span>
        <span>发布时间：{{ notice.publish_time }}</span>
        <span>通知类别：{{ notice.notice_type }}</span>
      </div>
    </div>
    <div class="container">
      <v-md-editor v-model="notice.notice_content" height="auto" mode="preview" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getNotice } from "@/api/notice";
import { Notice } from "@/interfaces/notice";

const props = defineProps<{ noticeId: string }>();

const router = useRouter();

const notice = ref<Notice>();

onMounted(async () => {
  notice.value = await getNotice(parseInt(props.noticeId));
});

const goBack = () => {
  router.back();
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
