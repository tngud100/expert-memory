<template>
  <section :class="$style.wrapper">
    <CommonNav />
    <download
      :title="downloadData.title"
      :createdDate="downloadData.date"
      :content="downloadData.content"
      :fileLink="downloadData.fileLink"
      :fileName="downloadData.fileName"
    />
  </section>
</template>

<script setup>
import CommonNav from "@/layouts/CommonNav.vue";
import download from "#/downloadDetail/download.vue";
import { ref } from "vue";

const downloadData = ref({
  title: "이거슨 제목입니다.",
  content: "이거슨 또 다른 내용입니다.",
  date: "2024.05.03",
  fileLink: "/",
  fileName: "메뉴얼(ver 4.0 build) 다운로드",
});
</script>

<style src="@/assets/css/downloadDetail/Contents.css" module></style>
