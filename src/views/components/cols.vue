<template>
  <el-card class="box-card" shadow="hover">
    <div class="clearfix" style="text-align: -webkit-center">
      <p>{{ noticetype }}</p>
      <el-button style="float: right; padding: 3px 0" type="text" @click="knowmore()"
        >查看更多<el-icon><i-ep-DArrowRight /></el-icon
      ></el-button>
    </div>
    <div
      v-if="notices.length > 0"
      v-for="index in displaynumber < notices.length ? displaynumber : notices.length"
      class="text item"
    >
      <el-link @click="openPreview(index)" class="compact-text">
        {{ notices[0] === "" ? index : truncateText(notices[notices.length - index].notice_title, 20) }}
      </el-link>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { defineProps, ref } from "vue";
import { useRouter } from "vue-router";

import { getNotice } from "@/api/notice";

const props = defineProps({
  noticetype: {
    type: String,
    default: "卡片标题",
  },
  displaynumber: {
    type: Number,
    default: 8,
  },
});

const notices = ref([]);
const truncateText = (text: string, maxLength: number) => {
  //截断text以防内容过长
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const router = useRouter(); // 传递路由对象
const knowmore = () => {
  console.log("type:", props.noticetype);
  router.push({
    path: "/noticelist",
    query: {
      type: props.noticetype,
    },
  });
};

const openPreview = (index: number) => {
  console.log("notices:", notices.value.length);
  router.push({
    path: "/noticepreview",
    query: {
      content: notices.value[notices.value.length - index - 1].notice_content,
      type: props.noticetype,
      title: notices.value[notices.value.length - index - 1].notice_title,
      time: notices.value[notices.value.length - index - 1].publish_time,
      name: notices.value[notices.value.length - index - 1].publisher_name,
      date: new Date().getTime(),
    },
  });
};

onMounted(async () => {
  // 通过 API 请求获取数据
  try {
    const response = await getNotice(props.noticetype);
    console.log("col response:", response);

    if (response.code === 200) {
      notices.value = response.data;
      console.log(notices.value);
    } else {
      console.error("Failed to fetch data:", response.msg);
    }
  } catch (error) {
    console.error("API request failed:", error);
  }
});
</script>

<style>
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
