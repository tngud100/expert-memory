<template>
  <div :class="$style.container">
    <span :class="$style.text">{{ spanText }}</span>
    <input
      :class="$style.input"
      type="text"
      v-model="text"
      :placeholder="placeholder"
      @change="emit('update:category', text)"
    />
  </div>
</template>
<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["update:category"]);

const props = defineProps({
  spanText: String,
  placeholder: String,
  selectedAsk: String,
});
const text = ref("");
watch(
  () => props.selectedAsk,
  (newVal) => {
    text.value = newVal;
  }
);
</script>

<style src="@/assets/css/editor/AskContent.css" module></style>
