<template>
  <div :class="$style.bannerBox" ref="banner">
    <img :src="homeBanner" alt="네이버 스마트 스토어" :class="$style.banner" />
    <!-- <div :class="$style.textBox"> -->
    <!-- <p :class="$style.BannerName">네이버 스마트 스토어</p>
        <p :class="$style.text">리뷰 작성하고 다양한 해택 받아보세요 ~</p>
        <button :class="$style.btn">바로보러 가기 <IconRightClearArrow /></button> -->
    <!-- </div> -->
  </div>
</template>

<script setup>
import homeBanner from "@/assets/images/homeMobileBanner.svg";
// import IconRightClearArrow from "#/icons/IconRightWhiteArrow.vue";
import { fadeInElements } from "@/utils/gsapUtils.js";
import { onMounted, ref } from "vue";

const banner = ref(null);

onMounted(() => {
  fadeInElements(banner.value, [banner.value], null, 50);
});
</script>

<style src="@/assets/css/renewalHome/mobile/BannerMobile.css" module></style>
