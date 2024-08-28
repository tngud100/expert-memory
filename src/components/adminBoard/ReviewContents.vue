<template>
  <div>
    <BoardList
      :listTitle="reviewTitle"
      :listItem="reviewList"
      :boardIdx="props.boardIdx"
    />
  </div>
</template>

<script setup>
import BoardList from "#/adminBoard/BoardList.vue";
import keyboardImg from "@/assets/images/keyboardImg.jpg";

const props = defineProps({
  boardIdx: Number,
});

const reviewTitle = [
  { title: "번호", field: "id", width: "11%", align: "center" },
  { title: "상품명", field: "productName", width: "62%", align: "center" },
  { title: "제목", field: "title", width: "15%", align: "center" },
  { title: "작성일", field: "regdate", width: "11%", align: "center" },
  { title: "비고", field: "active", width: "11%", align: "center" },
];

const reviewList = [
  {
    id: "처리대기",
    productName: "SG-871233",
    title: "제목입니다.",
    regdate: "2024-03-15",
    active: "수정 / 삭제",
    img: keyboardImg,
  },
];
</script>

<style>
</style>