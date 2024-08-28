<template>
  <div :class="$style.pageLabel">
    <span>{{ label }}</span>
    <div :class="$style.header">
      <button :class="$style.writeBtn" @click="$emit('showEditModal')">
        등록
      </button>
      <div :class="$style.searchBox" v-if="adminSideBarIndex == 2">
        <input type="text" :class="$style.search" ref="searchRef" />
        <button type="button" :class="$style.searchBtn">
          <IconSearch />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import useAdminStore from "@/store/useAdminPageStore.js";
import IconSearch from "#/icons/IconSearch.vue";
import { computed } from "vue";

const adminStore = useAdminStore();
const main = ["화보 상품 등록", "베스트 상품"];
const products = ["키보드", "스위치", "PCB", "키캡", "도구"];
const board = ["공지사항", "자주묻는 질문", "자료실"];

const adminSideBarIndex = computed(() => adminStore.adminSideBarIndex);
const mainIdx = computed(() => adminStore.adminMainIndex);
const productIdx = computed(() => adminStore.adminProductIndex);
const boardIdx = computed(() => adminStore.adminBoardIndex);

const label = computed(() => {
  switch (adminSideBarIndex.value) {
    case 0:
      return "메인 > " + main[mainIdx.value];
    case 1:
      return "상품 > " + products[productIdx.value];
    case 2:
      return "고객지원 > " + board[boardIdx.value];
  }
});
</script>

<style src="@/assets/css/layouts/AdminNav.css" module></style>