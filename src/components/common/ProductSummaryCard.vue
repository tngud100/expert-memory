<template>
  <div :class="$style.cardWrapper">
    <div :class="$style.productBox">
      <div :class="$style.imgBox">
        <img :src="item.imgSrc" alt="product" :class="$style.img" />
      </div>
      <div :class="$style.infoBox">
        <span :class="$style.productName">{{ item.productName }}</span>
        <span
          :class="$style.productDetail"
          v-for="(detail, index) in item.productDetail"
          :key="index"
          >{{ detail.detailOption }} : {{ detail.detailName }} / 수량 :
          {{ detail.detailCount }}개</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  data: Object,
});

const item = ref({
  imgSrc: props.data.imgSrc,
  productName: props.data.productName,
  productDetail: [
    ...props.data.productDetail,
    //     {
    //     detailOption: props.data.productDetail.detailOption,
    //     detailName: props.data.productDetail.detailName,
    //     detailPrice: props.data.productDetail.detailPrice,
    //     detailCount: props.data.productDetail.detailCount
    // }
  ],
});
</script>

<style src="@/assets/css/common/ProductSummaryCard.css" module></style>
