<template>
  <ul :class="$style.menuList">
    <li :class="$style.menuItem">
      <RouterLink :to="ROUTE_PATH.ORDER" :class="$style.link">
        <IconOrder />주문조회
      </RouterLink>
    </li>
    <li :class="$style.menuItem">
      <RouterLink :to="ROUTE_PATH.REVIEW" :class="$style.link">
        <IconReview />리뷰
      </RouterLink>
    </li>
    <li :class="$style.menuItem">
      <RouterLink :to="ROUTE_PATH.NOTICE" :class="$style.link">
        <IconNotice />공지사항
      </RouterLink>
    </li>
    <li :class="$style.menuItem">
      <RouterLink :to="ROUTE_PATH.FAQ" :class="$style.link">
        <IconFaq />자주묻는질문
      </RouterLink>
    </li>
    <li :class="$style.menuItem">
      <RouterLink :to="ROUTE_PATH.DOWNLOAD" :class="$style.link">
        <IconDownload />자료실
      </RouterLink>
    </li>
  </ul>

  <div :class="$style.topMenuWrapper">
    <div :class="$style.topMenu">
      <IconTop @click="scrollToTop" v-if="shouldShowTopBtn" />
    </div>
  </div>
</template>

<script setup>
import { ROUTE_PATH } from "@/routes";
import { scrollToTop } from "@/utils";
import { useTopStore } from "@/store/useMenuStore";
import { storeToRefs } from "pinia";
import IconOrder from "#/icons/IconOrder.vue";
import IconReview from "#/icons/IconReview.vue";
import IconNotice from "#/icons/IconNotice.vue";
import IconFaq from "#/icons/IconFaq.vue";
import IconDownload from "#/icons/IconDownload.vue";
import IconTop from "#/icons/IconTop.vue";

const { shouldShowTopBtn } = storeToRefs(useTopStore());
</script>

<style src="@/assets/css/layouts/Menu.css" module></style>
