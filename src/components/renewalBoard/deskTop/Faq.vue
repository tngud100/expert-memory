<template>
  <div :class="$style.boardWrapper">
    <CustomBoardTable
      :columns="tableColumns"
      :rows="paginatedData"
      :type="'faq'"
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

const { getFAQList } = boardGetDataAPI();

const tableColumns = [
  { label: "question", field: "", width: "5%", textAlign: "center" },
  {
    label: "제목",
    field: "title",
    width: "90%",
    textAlign: "left",
    paddingLeft: "21px",
  },
  { label: "icon", field: "", width: "5%" },
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
  const data = await getFAQList();
  console.log(data);
  data.forEach((item, index) => {
    tableRows.value.push({
      num: index,
      title: item.title,
      content: {
        comment: item.comment,
      },
      regdate: item.regdate.slice(0, 10),
      isClicked: false,
    });
  });
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