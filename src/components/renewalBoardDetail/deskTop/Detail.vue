<template>
  <header :class="$style.header">
    <h3 :class="$style.title">
      {{ title }}&nbsp;<Icondownload v-if="fileName && fileLink" />
    </h3>
    <div :class="$style.createdDate">{{ createdDate }}</div>
  </header>
  <div v-html="content" :class="$style.content"></div>
  <div :class="$style.fileDownloadContainer">
    <span :class="$style.fileDownloadBox" v-for="item in file" :key="item">
      <a :href="item.filePath" :class="$style.fileDownload">{{
        item.fileName
      }}</a
      >&nbsp;<Icondownload />
    </span>
  </div>
  <footer :class="$style.footer">
    <button type="button" :class="$style.listBtn" @click="gotoList">
      목록
    </button>
  </footer>
</template>

<script setup>
import Icondownload from "#/icons/IconFileDownload.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  title: {
    type: String,
  },
  createdDate: {
    type: String,
  },
  content: {
    type: String,
  },
  file: {
    type: Object,
  },
});

const gotoList = () => {
  if (!props.file) {
    router.push("/board/notice");
    return;
  } else {
    router.push("/board/download");
    return;
  }
};
</script>

<style src="@/assets/css/renewalBoardDetail/deskTop/Detail.css" module></style>
