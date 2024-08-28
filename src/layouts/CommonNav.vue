<template>
  <!-- <header>
    <h3 :class="$style.title">{{ title }}</h3>
    <p :class="$style.desc">(유저들의 문구)</p>
  </header> -->
  <nav :class="$style.nav">
    <ul :class="$style.navList">
      <li
        :class="[$style.navItem, activeTab(ROUTE_PATH.REVIEW)]"
        @click="onTabClick(ROUTE_PATH.REVIEW)"
      >
        리뷰
      </li>
      <li
        :class="[$style.navItem, activeTab(ROUTE_PATH.NOTICE)]"
        @click="onTabClick(ROUTE_PATH.NOTICE)"
      >
        공지사항
      </li>
      <li
        :class="[$style.navItem, activeTab(ROUTE_PATH.FAQ)]"
        @click="onTabClick(ROUTE_PATH.FAQ)"
      >
        FAQ
      </li>
      <li
        :class="[
          $style.navItem,
          activeTab(ROUTE_PATH.DOWNLOAD),
          downloadDetailActive(ROUTE_PATH.DOWNLOAD),
        ]"
        @click="onTabClick(ROUTE_PATH.DOWNLOAD)"
      >
        자료실
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ROUTE_PATH } from "@/routes";
import { useCssModule } from "vue";

const route = useRoute();
const router = useRouter();
const style = useCssModule();

// const title = computed(() => {
//   switch (route.path) {
//     case "/review":
//       return "리뷰";
//     case "/notice":
//       return "공지사항";
//     case "/faq":
//       return "FAQ";
//     case "/download":
//       return "자료실";
//     default:
//       return "";
//   }
// });

const onTabClick = (path) => router.push(path);

const activeTab = (path) => {
  if (path === route.path) {
    return style.active;
  }
};
const downloadDetailActive = (path) => {
  if (route.path === `/download/${route.params.id}`) {
    return style.active;
  }
};
</script>

<style src="@/assets/css/layouts/CommonNav.css" module></style>
