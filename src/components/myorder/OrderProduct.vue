<template>
  <div v-if="!showWriteForm">
    <div
      v-for="(orderCard, index) in orderData"
      :key="index"
      :class="$style.orderList"
    >
      <OrderProductCard :data="orderCard" @writeReview="writeReview(index)" />
    </div>
  </div>
  <WriteReiview
    v-if="showWriteForm"
    :data="writeData"
    @closeReview="closeReview"
  />
</template>

<script setup>
import OrderProductCard from "#/myorder/OrderProductCard.vue";
import WriteReiview from "#/myorder/WriteReview.vue";
import img from "@/assets/images/keyboardBackgroundImg.jpg";
import { ref } from "vue";

const showWriteForm = ref(false);
const writeData = ref();

const orderData = ref([
  {
    date: "2021.10.10",
    orderState: 2,
    imgSrc: img,
    deliveryPrice: 3000,
    expectDeliveryDate: "2021.10.16",
    productName: "ak47 87-ss145 키보드",
    productPrice: 8000,
    productDetail: [
      {
        detailOption: "컬러",
        detailName: "Raptor MX Extreme Gaming Switch",
        detailPrice: 4000,
        detailCount: 1,
      },
      {
        detailOption: "상태",
        detailName: " Akko Cream Yellow V3 Pro 기계식 키보드 스위치",
        detailPrice: 4000,
        detailCount: 1,
      },
    ],
  },
  {
    date: "2021.10.10",
    orderState: 1,
    imgSrc: img,
    deliveryPrice: 3000,
    expectDeliveryDate: "2021.10.16",
    productName: "SG87W",
    productPrice: 8000,
    productDetail: [
      {
        detailOption: "컬러",
        detailName: "블랙",
        detailPrice: 4000,
        detailCount: 1,
      },
      {
        detailOption: "상태",
        detailName: "아이스",
        detailPrice: 4000,
        detailCount: 1,
      },
    ],
  },
  {
    date: "2021.10.10",
    orderState: 0,
    imgSrc: img,
    deliveryPrice: 3000,
    expectDeliveryDate: "2021.10.16",
    productName: "SG87W",
    productPrice: 8000,
    productDetail: [
      {
        detailOption: "컬러",
        detailName: "블랙",
        detailPrice: 4000,
        detailCount: 1,
      },
      {
        detailOption: "상태",
        detailName: "아이스",
        detailPrice: 4000,
        detailCount: 1,
      },
    ],
  },
]);

const writeReview = (index) => {
  showWriteForm.value = true;
  writeData.value = orderData.value[index];
};
const closeReview = () => {
  showWriteForm.value = false;
  writeData.value = null;
};
</script>

<style src="@/assets/css/myorder/Contents.css" module></style>