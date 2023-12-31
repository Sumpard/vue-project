<template>
  <el-card class="box-card" shadow="hover">
    <div class="clearfix text-center">
      <p>{{ noticeType }}</p>
      <el-button style="float: right; padding: 3px 0" link type="primary" @click="viewMore()">
        查看更多 <el-icon><i-ep-DArrowRight /></el-icon>
      </el-button>
    </div>
    <div v-for="notice in notices" class="text item">
      <el-link @click="openDetail(notice)" class="compact-text">
        {{ truncText(notice.notice_title, 20) }}
      </el-link>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { getNoticeByType } from "@/api/notice";
import { Notice } from "@/interfaces/notice";
import { truncText } from "@/utils/text-utils";

const props = withDefaults(
  defineProps<{
    noticeType: string;
    displayCount?: int;
  }>(),
  { displayCount: 8 }
);

const notices = ref<Notice[]>([]);

const router = useRouter();

const viewMore = () => {
  router.push({ path: "/notice/list", query: { type: props.noticeType } });
};

const openDetail = (notice: Notice) => {
  router.push({ name: "notice-detail", params: { noticeId: notice.notice_id } });
};

onMounted(async () => {
  // 这里应当后端根据时间排好序，但后端没做，就让前端来按时间降序
  // 后端也应当返回总数
  notices.value = (await getNoticeByType(props.noticeType)).toReversed().slice(0, props.displayCount);
});
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  margin-left: 10%;
  margin-right: 10%;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 30%;
  border-top: 5px solid rgb(95, 165, 222);
  margin: 15px;
  height: 420px;
}

.btn {
  color: black;
}

.compact-text {
  line-height: 1; /* 调整行高 */
  margin-bottom: 0; /* 调整底部外边距 */
}
</style>
