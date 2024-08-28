<template>
  <section :class="$style.wrapper">
    <CommonNav />
    <CustomBoardTable
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
  </section>
</template>

<script setup>
import CommonNav from "@/layouts/CommonNav.vue";
import Pagination from "#/common/Pagination.vue";
import CustomBoardTable from "#/common/CustomBoardTable.vue";
import { computed, ref } from "vue";

const tableColumns = [
  { label: "번호", field: "num", width: "9%" },
  { label: "카테고리", field: "category", width: "10%" },
  {
    label: "제목",
    field: "title",
    width: "69%",
    textAlign: "left",
    paddingLeft: "21px",
  },
  { label: "작성일", field: "date", width: "12%" },
];

const tableRows = ref([
  {
    num: 1,
    category: "메뉴얼",
    title: "이거슨 제목입니다",
    content: {
      text: "이거슨 또 다른 내용입니다.",
    },
    linkTo: `/download`,
    date: "2024.05.03",
    isClicked: false,
  },
  {
    num: 1,
    category: "소프트웨어",
    title: "이거슨 제목입니다",
    content: {
      text: "이거슨 또 다른 내용입니다.",
    },
    linkTo: `/download`,
    date: "2024.05.03",
    isClicked: false,
  },
  {
    num: 1,
    category: "문제해결",
    title: "이거슨 제목입니다",
    content: {
      text: "이거슨 또 다른 내용입니다.",
    },
    linkTo: `/download`,
    date: "2024.05.03",
    isClicked: false,
  },
]);

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
</script>

<style src="@/assets/css/download/Contents.css" module></style>
