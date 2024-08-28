<template>
  <div :class="$style.myPageHeader">
    <div :class="$style.boxContainer">
      <div :class="$style.nameBox">
        <div :class="$style.nameBox">
          <span :class="$style.name">{{ data.userName }}님</span> 반갑습니다.
        </div>
      </div>
      <div :class="$style.dataBox">
        <span :class="$style.dataName">주문/배송</span>
        <span :class="$style.dataValue">{{ data.orderCount }}건</span>
      </div>
      <div :class="$style.dataBox">
        <span :class="$style.dataName">리뷰</span>
        <span :class="$style.dataValue">{{ data.reviewCount }}건</span>
      </div>
      <div :class="$style.dataBox">
        <span :class="$style.dataName">1:1문의</span>
        <span :class="$style.dataValue">{{ data.askCount }}건</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import getTokenData from "@/utils/getTokenData.js";

const { getUserIdFromToken } = getTokenData();

const userId = getUserIdFromToken();

const data = {
  userName: userId,
  orderCount: 3,
  reviewCount: 5,
  askCount: 2,
};
</script>

<style src="@/assets/css/layouts/MyPageNav.css" module >
</style>