<template>
  <div :class="$style.boardWrapper">
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
  </div>
</template>

<script setup>
import Pagination from "#/common/Pagination.vue";
import CustomBoardTable from "#/common/CustomBoardTable.vue";
import { computed, onMounted, ref } from "vue";
import { boardGetDataAPI } from "@/api/BoardGetDataAPI.js";

const { getNoticeList } = boardGetDataAPI();

const tableColumns = [
  { label: "번호", field: "num", width: "9%" },
  {
    label: "제목",
    field: "title",
    width: "67%",
    textAlign: "left",
    paddingLeft: "21px",
  },
  { label: "작성자", field: "author", width: "12%" },
  { label: "작성일", field: "date", width: "12%" },
];

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

const toggleRow = (index) => {
  tableRows.value.map((row, i) => {
    if (i !== index) {
      row.isClicked = false;
    }
  });
  tableRows.value[index].isClicked = !tableRows.value[index].isClicked;
};
</script>

<style src="@/assets/css/renewalBoard/deskTop/Board.css" module></style>