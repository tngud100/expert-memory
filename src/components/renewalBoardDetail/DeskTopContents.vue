<template>
  <div :class="$style.wrapper">
    <Nav />
    <div :class="$style.contentsBox">
      <Detail
        :title="content?.title"
        :createdDate="content?.date"
        :content="content?.content"
        :file="content?.file"
      />
    </div>
  </div>
</template>

<script setup>
import Nav from "@/layouts/RenewalBoardNav.vue";
import Detail from "#/renewalBoardDetail/deskTop/Detail.vue";
import { onMounted, ref } from "vue";
import { boardGetDataAPI } from "@/api/BoardGetDataAPI.js";
import { useRouter } from "vue-router";

const { getNoticeByNoticeId, getDownloadByDownloadId } = boardGetDataAPI();

const router = useRouter();

const content = ref();

const fetchData = async () => {
  const path = router.currentRoute.value.path;
  const boardType = path.split("/")[2];
  const idx = path.split("/").pop();

  content.value = null;

  if (boardType == "notice") {
    const data = await getNoticeByNoticeId(idx);

    if (data.notices_id !== Number(idx)) return;
    content.value = {
      title: data.title,
      content: data.content,
      date: data.regdate.slice(0, 10),
    };
  } else if (boardType == "download") {
    const data = await getDownloadByDownloadId(idx);
    console.log(data);
    if (data.boardList.downloads_id !== Number(idx)) return;
    content.value = {
      title: data.boardList.title,
      content: data.boardList.content,
      date: data.boardList.regdate.slice(0, 10),
      file: data.files.map((item) => {
        return {
          filePath: item.filePath,
          fileName: item.fileName,
        };
      }),
    };
  }
};

onMounted(async () => {
  fetchData();
  console.log(content.value);
});
</script>

<style src="@/assets/css/renewalBoardDetail/DeskTopContents.css" module></style>