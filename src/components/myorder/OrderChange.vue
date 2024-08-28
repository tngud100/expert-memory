<template>
  <div v-for="cardData in changeData" :key="cardData" :class="$style.orderList">
    <OrderProductCard :data="cardData" />
  </div>
</template>

<script setup>
import OrderProductCard from "#/myorder/OrderProductCard.vue";
import img from "@/assets/images/keyboardBackgroundImg.jpg";
import { ref } from "vue";

const props = defineProps({
  orderData: Object,
});
const changeData = ref([
  {
    date: "2021.10.10",
    orderNum: "040610532112",
    orderState: 4,
    imgSrc: img,
    cancelDate: "2021.10.13",
    changeDate: "2021.10.14",
    refunDate: "2021.10.15",
    eventFinishDate: "2021.10.17",
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
    orderNum: "040610532112",
    orderState: 3,
    imgSrc: img,
    cancelDate: "2021.10.13",
    changeDate: "2021.10.14",
    refunDate: "2021.10.15",
    eventFinishDate: "2021.10.17",
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
    orderNum: "040610532112",
    orderState: 5,
    imgSrc: img,
    cancelDate: "2021.10.13",
    changeDate: "2021.10.14",
    refunDate: "2021.10.15",
    eventFinishDate: "2021.10.17",
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
]);
</script>

<style src="@/assets/css/myorder/Contents.css" module></style>