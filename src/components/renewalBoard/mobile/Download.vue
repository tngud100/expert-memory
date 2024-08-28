<template>
  <div :class="$style.boardWrapper">
    <CustomMobileBoardTable
      :columns="tableColumns"
      :rows="paginatedData"
      :type="'download'"
      @row-click="toggleRow"
    />
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

const { getDownloadList } = boardGetDataAPI();

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

const toggleRow = (index) => {
  tableRows.value.map((row, i) => {
    if (i !== index) {
      row.isClicked = false;
    }
  });
  tableRows.value[index].isClicked = !tableRows.value[index].isClicked;
};

const fetchData = async () => {
  tableRows.value = [];
  const data = await getDownloadList();
  console.log(data);
  data.forEach((item, index) => {
    tableRows.value.push({
      num: item.downloads_id,
      category: item.category,
      title: item.title,
      date: item.regdate.slice(0, 10),
      linkTo: `/board/download`,
      isClicked: false,
    });
  });
};

onMounted(() => {
  fetchData();
});
</script>

<style src="@/assets/css/renewalBoard/mobile/Download.css" module></style>