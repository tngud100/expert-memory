<template>
  <section :class="$style.wrapper">
    <CommonNav />
    <CustomBoardTable
      :columns="tableColumns"
      :rows="paginatedData"
      @row-click="toggleRow"
    />
    <Pagination
      :totalItems="tableRows.length"
      :elementsPerPage="8"
      @page-changed="handlePageChange"
    />
    <!-- <Faqs /> -->
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import CommonNav from "@/layouts/CommonNav.vue";
import CustomBoardTable from "#/common/CustomBoardTable.vue";
// import Faqs from "#/faq/Faqs.vue";
import Pagination from "#/common/Pagination.vue";

const currentPage = ref(1);
const tableColumns = [
  { label: "번호", field: "num", width: "9%" },
  { label: "카테고리", field: "category", width: "11%" },
  {
    label: "제목",
    field: "title",
    width: "71%",
    textAlign: "left",
    paddingLeft: "21px",
  },
  { label: "작성일", field: "date", width: "12%" },
  { label: "", field: "", width: "4%" },
];

const tableRows = ref([
  {
    num: 1,
    category: "keycap",
    title: "이거슨 제목입니다.",
    date: "2024.05.03",
    content: {
      text: "이거슨 내용입니다.",
      comment: "이거슨 댓글입니다.",
    },
    isClicked: false,
  },
  {
    num: 2,
    category: "keycap",
    title: "이거슨 또 다른 제목입니다.",
    date: "2024.05.04",
    content: {
      text: "이거슨 또 다른 내용입니다.",
      comment: "이거슨 또 다른 댓글입니다.",
    },
    isClicked: false,
  },
  {
    num: 3,
    category: "keycap",
    title: "이거슨 제목입니다.",
    date: "2024.05.03",
    content: {
      text: "이거슨 내용입니다.",
      comment: "이거슨 댓글입니다.",
    },
    isClicked: false,
  },
  {
    num: 4,
    category: "keycap",
    title: "이거슨 또 다른 제목입니다.",
    date: "2024.05.04",
    content: {
      text: "이거슨 또 다른 내용입니다.",
      comment: "이거슨 또 다른 댓글입니다.",
    },
    isClicked: false,
  },
]);

const toggleRow = (index) => {
  tableRows.value.map((row, i) => {
    if (i !== index) {
      row.isClicked = false;
    }
  });
  tableRows.value[index].isClicked = !tableRows.value[index].isClicked;
};

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * 8;
  const end = start + 8;
  return tableRows.value.slice(start, end);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};
</script>

<style src="@/assets/css/faq/Contents.css" module></style>
