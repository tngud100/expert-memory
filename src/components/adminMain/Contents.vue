<template>
  <div :class="$style.container">
    <div :class="$style.wrapper">
      <AdminNav @showEditModal="showEditModal" />
      <Pictorial
        v-if="adminMainIndex == 0"
        :title="title"
        :modalOpen="modalOpen"
        :selectedId="selectedId"
        @closeBtn="closeEditModal"
        @selectedList="selectedList"
      />
      <Best
        v-if="adminMainIndex == 1"
        :title="title"
        :modalOpen="modalOpen"
        :selectedId="selectedId"
        @closeBtn="closeEditModal"
        @selectedList="selectedList"
      />
    </div>
  </div>
</template>

<script setup>
import AdminNav from "@/layouts/AdminNav.vue";
import Pictorial from "@/components/adminMain/PictorialContents.vue";
import Best from "@/components/adminMain/BestContents.vue";
import useAdminStore from "@/store/useAdminPageStore.js";
import { computed, ref } from "vue";
const adminStore = useAdminStore();

const adminMainIndex = computed(() => adminStore.adminMainIndex);

const modalOpen = ref(false);

const selectedId = ref(null);

const title = computed(() =>
  adminMainIndex.value === 0 ? "화보 상품 등록" : "베스트 상품 등록"
);

const selectedList = (id) => {
  selectedId.value = id;
  showEditModal();
};

const showEditModal = () => {
  modalOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeEditModal = () => {
  modalOpen.value = false;
  document.body.style.overflow = "auto";
};
</script>

<style src="@/assets/css/adminMain/Contents.css" module></style>
