<template>
  <div :class="$style.titleText">
    <select
      v-if="boardIdx === 2"
      :class="$style.categorySelect"
      v-model="selectCategory"
    >
      <option v-for="(item, index) in category" :key="index" :value="item">
        {{ item }}
      </option>
    </select>
    <input
      type="text"
      v-model="title"
      :class="$style.titleInput"
      placeholder="제목을 입력해주세요"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";

const props = defineProps({
  boardIdx: Number,
  selectedTitle: String,
  selectedCategory: String,
});
const emit = defineEmits(["update:title"]);

const category = computed(() => {
  switch (props.boardIdx) {
    // case 1:
    //   return ["keycap", "keyboard", "PCB"];
    case 2:
      return ["메뉴얼", "소프트웨어", "문제해결"];
  }
});

const title = ref("");
const selectCategory = ref("");

watch(title, (newVal) => {
  emit("update:title", newVal);
});
watch(selectCategory, (newVal) => {
  emit("update:category", newVal);
});

watch(
  () => [props.selectedTitle, props.selectedCategory],
  ([newTitle, newCategory]) => {
    title.value = newTitle;
    selectCategory.value = newCategory;
  }
);
</script>

<style src="@/assets/css/editor/Title.css" module></style>