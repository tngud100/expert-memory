<template>
  <div :class="$style.boardWrapper">
    <CustomMobileBoardTable :columns="tableColumns" :rows="paginatedData" />
    <Pagination
      :totalItems="tableRows.length"
      :elementsPerPage="8"
      @page-changed="handlePageChange"
    />
  </div>
</template>

<script setup>
import Pagination from "#/common/Pagination.vue";
import CustomMobileBoardTable from "#/common/CustomMobileBoardTable.vue";
import { computed, onMounted, ref } from "vue";
import { boardGetDataAPI } from "@/api/BoardGetDataAPI.js";

const { getNoticeList } = boardGetDataAPI();

const tableRows = ref([]);

const currentPage = ref(1);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * 8;
  const end = start + 8;
  return tableRows.value.slice(start, end);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

const fetchData = async () => {
  tableRows.value = [];
  const data = await getNoticeList();
  data.forEach((item) => {
    tableRows.value.push({
      num: item.notices_id,
      title: item.title,
      author: "조선타자기",
      linkTo: "/board/notice",
      content: {
        test: item.content,
      },
      date: item.regdate.slice(0, 10),
      isClicked: false,
    });
  });
  console.log(data);
};

onMounted(() => {
  fetchData();
});
</script>

<style src="@/assets/css/renewalBoard/mobile/Notice.css" module></style>