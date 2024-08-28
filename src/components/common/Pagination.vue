<template>
  <footer :class="$style.footer">
    <div :class="$style.pagination">
      <IconPaginationLeftArrow
        :class="$style.arrow"
        @click="prevPage"
        v-if="currentPage > 1"
      />
      <IconPaginationLeftArrowGray
        :class="$style.arrow"
        v-if="currentPage <= 1"
      />
      <ul :class="$style.paginationList">
        <li
          v-for="page in totalPages"
          :key="page"
          :class="[
            $style.paginationItem,
            { [$style.active]: page === currentPage },
          ]"
          @click="goToPage(page)"
        >
          {{ page }}
        </li>
      </ul>
      <IconPaginationRightArrow
        :class="$style.arrow"
        @click="nextPage"
        v-if="currentPage < totalPages"
      />
      <IconPaginationRightArrowGray
        :class="$style.arrow"
        v-if="currentPage >= totalPages"
      />
    </div>
  </footer>
</template>

<script setup>
import IconPaginationLeftArrowGray from "#/icons/IconPaginationLeftArrowGray.vue";
import IconPaginationLeftArrow from "#/icons/IconPaginationLeftArrow.vue";
import IconPaginationRightArrowGray from "#/icons/IconPaginationRightArrowGray.vue";
import IconPaginationRightArrow from "#/icons/IconPaginationRightArrow.vue";
import { ref, computed, watch } from "vue";

const props = defineProps({
  totalItems: Number,
  elementsPerPage: Number,
});

const emit = defineEmits(["page-changed"]);

const currentPage = ref(1);

const totalPages = computed(() =>
  Math.ceil(props.totalItems / props.elementsPerPage)
);

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
    emit("page-changed", currentPage.value);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    emit("page-changed", currentPage.value);
  }
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    emit("page-changed", currentPage.value);
  }
};

// 초기화 시 이벤트 발생
watch(currentPage, (newPage) => {
  emit("page-changed", newPage);
});
</script>
<style src="@/assets/css/common/Pagination.css" module></style>