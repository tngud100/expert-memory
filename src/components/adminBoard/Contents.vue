<template>
  <section :class="$style.wrapper">
    <div :class="$style.adminContainer">
      <!-- <div :class="$style.pageLabel">
        <span>{{ label[boardIdx] }}</span>
        <div :class="$style.header">
          <button
            :class="$style.writeBtn"
            v-if="boardIdx != 0"
            @click="showEditModal"
          >
            등록
          </button>
          <div :class="$style.searchBox">
            <input type="text" :class="$style.search" ref="searchRef" />
            <button
              type="button"
              :class="$style.searchBtn"
              @click="toggleIsSearch"
            >
              <IconSearch />
            </button>
          </div>
        </div>
      </div> -->
      <AdminNav @showEditModal="showEditModal" />
      <EditModal
        v-if="isEditModal"
        :boardIdx="boardIdx"
        :selectedId="selectedId"
        @closeModal="closeEditModal"
      />
      <!-- <ReviewContents :boardIdx="boardIdx" v-if="boardIdx == 0" /> -->
      <NoticeContents
        :boardIdx="boardIdx"
        v-if="boardIdx == 0"
        @itemSelected="itemSelected"
        ref="noticeContentsRef"
      />
      <FaqContents
        :boardIdx="boardIdx"
        v-if="boardIdx == 1"
        @itemSelected="itemSelected"
        ref="faqContentsRef"
      />
      <DownLoadContents
        :boardIdx="boardIdx"
        v-if="boardIdx == 2"
        @itemSelected="itemSelected"
        ref="downloadContentsRef"
      />
    </div>
  </section>
</template>

<script setup>
import useAdminStore from "@/store/useAdminPageStore.js";
// import ReviewContents from "#/adminBoard/ReviewContents.vue";
import IconSearch from "#/icons/IconSearch.vue";
import NoticeContents from "#/adminBoard/NoticeContents.vue";
import FaqContents from "#/adminBoard/FaqContents.vue";
import DownLoadContents from "#/adminBoard/DownLoadContents.vue";
import EditModal from "#/modal/EditModal.vue";
import AdminNav from "@/layouts/AdminNav.vue";
import { computed, ref } from "vue";

const adminStore = useAdminStore();
const label = ["리뷰", "공지사항", "자주묻는 질문", "자료실"];
const boardIdx = computed(() => adminStore.adminBoardIndex);

const isEditModal = ref(false);
const selectedId = ref(null);

const searchRef = ref(null);
const noticeContentsRef = ref(null); // NoticeContents 컴포넌트의 ref
const faqContentsRef = ref(null); // NoticeContents 컴포넌트의 ref
const downloadContentsRef = ref(null); // NoticeContents 컴포넌트의 ref

const showEditModal = () => {
  isEditModal.value = true;
  document.body.style.overflow = "hidden";
};
const closeEditModal = () => {
  isEditModal.value = false;
  selectedId.value = null;
  document.body.style.overflow = "auto";
  if (boardIdx.value == 0) noticeContentsRef.value.fetchData();
  if (boardIdx.value == 1) faqContentsRef.value.fetchData();
  if (boardIdx.value == 2) downloadContentsRef.value.fetchData();
};

const itemSelected = (value) => {
  isEditModal.value = true;
  selectedId.value = value;
};
</script>

<style src="@/assets/css/adminBoard/Contents.css" module></style>
