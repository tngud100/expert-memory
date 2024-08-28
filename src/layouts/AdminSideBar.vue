<template>
  <div :class="$style.container">
    <ul :class="$style.listBox">
      <router-link to="/admin/main"
        ><li
          :class="[$style.list, selectedIndex === 0 ? $style.selected : '']"
          @click="selectIndex(0)"
        >
          메인
        </li>
        <ul :class="$style.listdownBox" v-if="selectedIndex === 0">
          <li
            :class="[
              $style.listdown,
              selectedMainIndex === 0 ? $style.selectedListdown : '',
            ]"
            @click="selectMainIndex(0)"
          >
            화보 상품
          </li>
          <li
            :class="[
              $style.listdown,
              selectedMainIndex === 1 ? $style.selectedListdown : '',
            ]"
            @click="selectMainIndex(1)"
          >
            베스트 상품
          </li>
        </ul>
      </router-link>
      <router-link to="/admin/products"
        ><li
          :class="[$style.list, selectedIndex === 1 ? $style.selected : '']"
          @click="selectIndex(1)"
        >
          상품
        </li>
        <ul :class="$style.listdownBox" v-if="selectedIndex === 1">
          <li
            :class="[
              $style.listdown,
              selectedProductIndex === 0 ? $style.selectedListdown : '',
            ]"
            @click="selectProductIndex(0)"
          >
            키보드
          </li>
          <li
            :class="[
              $style.listdown,
              selectedProductIndex === 1 ? $style.selectedListdown : '',
            ]"
            @click="selectProductIndex(1)"
          >
            스위치
          </li>
          <li
            :class="[
              $style.listdown,
              selectedProductIndex === 2 ? $style.selectedListdown : '',
            ]"
            @click="selectProductIndex(2)"
          >
            PCB
          </li>
          <li
            :class="[
              $style.listdown,
              selectedProductIndex === 3 ? $style.selectedListdown : '',
            ]"
            @click="selectProductIndex(3)"
          >
            키캡
          </li>
          <li
            :class="[
              $style.listdown,
              selectedProductIndex === 4 ? $style.selectedListdown : '',
            ]"
            @click="selectProductIndex(4)"
          >
            도구
          </li>
        </ul>
      </router-link>
      <router-link to="/admin/board"
        ><li
          :class="[$style.list, selectedIndex === 2 ? $style.selected : '']"
          @click="selectIndex(2)"
        >
          고객지원
        </li>
        <ul :class="$style.listdownBox" v-if="selectedIndex === 2">
          <li
            :class="[
              $style.listdown,
              boardIndex === 0 ? $style.selectedListdown : '',
            ]"
            @click="selectBoardIndex(0)"
          >
            공지사항
          </li>
          <li
            :class="[
              $style.listdown,
              boardIndex === 1 ? $style.selectedListdown : '',
            ]"
            @click="selectBoardIndex(1)"
          >
            자주묻는 질문
          </li>
          <li
            :class="[
              $style.listdown,
              boardIndex === 2 ? $style.selectedListdown : '',
            ]"
            @click="selectBoardIndex(2)"
          >
            자료실
          </li>
        </ul>
      </router-link>
    </ul>
  </div>
</template>

<script setup>
import { useAdminStore } from "@/store/useAdminPageStore.js";
import { onMounted, ref } from "vue";

const emit = defineEmits(["sideBarIndex"]);

const adminStore = useAdminStore();

const selectedIndex = ref(0);

const selectedMainIndex = ref(0);
const selectedProductIndex = ref(0);
const boardIndex = ref(0);

const selectIndex = (index) => {
  selectedIndex.value = index;
};

const selectMainIndex = (index) => {
  selectedMainIndex.value = index;
  adminStore.setAdminMainIndex(index);
};
const selectProductIndex = (index) => {
  selectedProductIndex.value = index;
  adminStore.setAdminProductIndex(index);
};
const selectBoardIndex = (index) => {
  boardIndex.value = index;
  adminStore.setAdminBoardIndex(index);
};

onMounted(() => {
  selectedIndex.value = adminStore.adminSideBarIndex;
});
</script>

<style src="@/assets/css/layouts/AdminSideBar.css" module></style>
