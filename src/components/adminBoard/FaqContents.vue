<template>
  <div>
    <BoardList
      :listTitle="faqTitle"
      :listItem="faqList"
      :boardIdx="props.boardIdx"
      @itemSelected="itemSelected"
      @deleteItem="deleteItem"
    />
  </div>
</template>

<script setup>
import BoardList from "#/adminBoard/BoardList.vue";
import { boardGetDataAPI } from "@/api/BoardGetDataAPI.js";
import { boardDeleteDataAPI } from "@/api/BoardDeleteDataAPI.js";
import { onMounted, ref } from "vue";

const { getFAQList } = boardGetDataAPI();
const { deleteFAQBoard } = boardDeleteDataAPI();

const emit = defineEmits(["itemSelected", "deleteItem"]);

const props = defineProps({
  boardIdx: Number,
});

const faqTitle = [
  { title: "번호", field: "id", width: "12%", align: "center" },
  // { title: "카테고리", field: "category", width: "9%", align: "center" },
  {
    title: "제목",
    field: "title",
    width: "52%",
    align: "center",
    childAlign: "left",
  },
  { title: "작성일", field: "modified_date", width: "12%", align: "center" },
  { title: "수정일", field: "regdate", width: "12%", align: "center" },
  { title: "비고", field: "active", width: "12%", align: "center" },
];

const faqList = ref([]);

const itemSelected = (value) => {
  emit("itemSelected", value.id);
};

const deleteItem = async (value) => {
  if (confirm("정말 삭제하시겠습니까?")) {
    await deleteFAQBoard(value);
    await fetchData();
  }
};

const fetchData = async () => {
  faqList.value = [];
  const data = await getFAQList();
  data.forEach((item) => {
    faqList.value.push({
      id: item.faqs_id,
      category: item.category,
      title: item.title,
      regdate: item.regdate.slice(0, 10),
      modified_date: item.modified_date.slice(0, 10),
      active: "삭제",
    });
  });
};

onMounted(() => {
  fetchData();
});

defineExpose({ fetchData });
</script>

<style>
</style>