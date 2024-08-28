<template>
  <div :class="$style.titleBox">
    <p :class="$style.title">고객지원</p>
  </div>
  <nav :class="$style.nav">
    <ul :class="$style.navList">
      <li>
        <router-link
          :class="$style.navItem"
          to="/board/notice"
          :style="{
            color: selectedBoardNum === 0 ? 'black' : '#AFAFAF',
            fontWeight: selectedBoardNum === 0 ? '800' : ' 500',
          }"
          >공지사항</router-link
        >
      </li>
      <li>
        <router-link
          :class="$style.navItem"
          to="/board/faq"
          :style="{
            color: selectedBoardNum === 1 ? 'black' : '#AFAFAF',
            fontWeight: selectedBoardNum === 1 ? '800' : ' 500',
          }"
          >자주묻는 질문</router-link
        >
      </li>
      <li>
        <router-link
          :class="$style.navItem"
          to="/board/download"
          :style="{
            color: selectedBoardNum === 2 ? 'black' : '#AFAFAF',
            fontWeight: selectedBoardNum === 2 ? '800' : ' 500',
          }"
          >자료실</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const selectedBoardNum = computed(() => {
  const path = router.currentRoute.value.path;
  if (path.includes("/board/notice")) {
    return 0;
  } else if (path === "/board/faq") {
    return 1;
  } else if (path.includes("/board/download")) {
    return 2;
  }
  return 0;
});
</script>

<style src="@/assets/css/layouts/RenewalBoardMobileNav.css" module></style>
