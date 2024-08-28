<template>
  <Nav />
  <div :class="$style.boardWrapper">
    <Notice v-if="selectedBoardNum === 0" />
    <Faq v-if="selectedBoardNum === 1" />
    <Download v-if="selectedBoardNum === 2" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Nav from "@/layouts/RenewalBoardMobileNav.vue";
import Notice from "#/renewalBoard/mobile/Notice.vue";
import Faq from "#/renewalBoard/mobile/Faq.vue";
import Download from "#/renewalBoard/mobile/Download.vue";
import { useRoute } from "vue-router";

const router = useRoute();

const selectedBoardNum = computed(() => {
  const path = router.path;
  if (path.includes("/board/notice")) {
    return 0;
  } else if (path === "/board/faq") {
    return 1;
  } else if (path === "/board/download") {
    return 2;
  }
  return 0;
});
</script>

<style src="@/assets/css/renewalBoard/MobileContents.css" module></style>
