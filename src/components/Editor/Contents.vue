<template>
  <div class="ck-content">
    <Editor
      @update:modelValue="modelValue"
      @update:images="imageUrls"
      @update:deletedImages="deletedImageUrls"
      :selectedContent="selectedContent"
      :boardIdx="boardIdx"
      :isContentUpdating="isContentUpdating"
    />
  </div>
</template>
<script setup>
import Editor from "#/Editor/Editor.vue";
import { ref, watch } from "vue";

const emit = defineEmits([
  "update:eidtorContent",
  "update:images",
  "update:deletedImages",
]);

let selectedContent = ref("");

const props = defineProps({
  selectedContent: String,
  boardIdx: Number,
  isContentUpdating: Boolean,
});
const modelValue = (value) => {
  emit("update:eidtorContent", value);
};
const imageUrls = (value) => {
  emit("update:images", value);
};
const deletedImageUrls = (value) => {
  emit("update:deletedImages", value);
};

watch(
  () => props.selectedContent,
  (newContent) => {
    selectedContent.value = newContent;
  }
);
</script>


<style scoped>
.ck-content {
  min-height: 300px;
  border-radius: 5px;
  padding: 12px;
}
</style>
