<template>
  <section :class="$style.wrapper">
    <Product
      v-for="(list, index) in reviewList"
      :key="index"
      :img="list.imgList"
      :type="list.type"
      :title="list.title"
      :loginId="list.loginId"
      :class="$style.reviewCard"
      @click="openModal(index)"
    />
    <ReviewModal
      v-if="selectedReview"
      :cardData="cardData"
      @closeBtn="closeBtn"
    />
  </section>
</template>

<script setup>
import Product from "#/review/Product.vue";
import ReviewModal from "#/review/ReviewModal.vue";
import reviewImg from "@/assets/images/reviewImg.png";
import { ref } from "vue";

const selectedReview = ref(false);
const cardData = ref(null);
const reviewList = ref([
  {
    imgList: [reviewImg, reviewImg, reviewImg, reviewImg],
    type: "keyboard",
    title: "GMK NTD.",
    loginId: "tngud100",
    date: "2021.09.01",
    content: "키보드가 너무 예쁘네요!",
    commentDate: "2021.09.02",
    comment: "네, 정말 예쁘죠!",
  },
  {
    imgList: [reviewImg],
    type: "keyboard",
    title: "GMK NTD.",
    loginId: "asdbv",
    date: "2021.09.01",
    content: "이상해요",
    commentDate: "2021.09.02",
    comment: "당신이 더 이상해요",
  },
  {
    imgList: [reviewImg, reviewImg, reviewImg],
    type: "keyboard",
    title: "GMK NTD.",
    loginId: "tngud100",
    date: "2021.09.01",
    content:
      "간만에 찾은 좋은 키보드입니다. 키캡도 깔끔하고, 이런 저런 좋네요.",
    commentDate: "2021.09.02",
    comment: "감사합니다. 고객님 앞으로 더 발전하는 조선타자기 되겠습니다.",
  },
  {
    imgList: [reviewImg, reviewImg, reviewImg],
    type: "keyboard",
    title: "GMK NTD.",
    loginId: "tngud100",
    date: "2021.09.01",
    content:
      "간만에 찾은 좋은 키보드입니다. 키캡도 깔끔하고, 이런 저런 좋네요.",
    commentDate: "2021.09.02",
    comment: "감사합니다. 고객님 앞으로 더 발전하는 조선타자기 되겠습니다.",
  },
  {
    imgList: [reviewImg, reviewImg, reviewImg],
    type: "keyboard",
    title: "GMK NTD.",
    loginId: "tngud100",
    date: "2021.09.01",
    content:
      "간만에 찾은 좋은 키보드입니다. 키캡도 깔끔하고, 이런 저런 좋네요.",
    commentDate: "2021.09.02",
    comment: "감사합니다. 고객님 앞으로 더 발전하는 조선타자기 되겠습니다.",
  },
  {
    imgList: [reviewImg, reviewImg, reviewImg],
    type: "keyboard",
    title: "GMK NTD.",
    loginId: "tngud100",
    date: "2021.09.01",
    content:
      "간만에 찾은 좋은 키보드입니다. 키캡도 깔끔하고, 이런 저런 좋네요.",
    commentDate: "2021.09.02",
    comment: "감사합니다. 고객님 앞으로 더 발전하는 조선타자기 되겠습니다.",
  },
]);
const openModal = (index) => {
  selectedReview.value = true;
  cardData.value = {
    imgList: reviewList.value[index].imgList,
    type: reviewList.value[index].type,
    title: reviewList.value[index].title,
    loginId: reviewList.value[index].loginId,
    date: reviewList.value[index].date,
    content: reviewList.value[index].content,
    commentDate: reviewList.value[index].commentDate,
    comment: reviewList.value[index].comment,
  };
  document.body.style.overflow = "hidden";
};
const closeBtn = () => {
  selectedReview.value = false;
  cardData.value = null;
  document.body.style.overflow = "";
};
</script>

<style src="@/assets/css/review/Products.css" module></style>
