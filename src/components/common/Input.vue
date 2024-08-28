<template>
  <input
    :type="props.type"
    :style="{ width: props.size }"
    :class="[$style.input, props.isReadOnly && $style.readonly]"
    :placeholder="props.placeholder"
    :value="props.value"
    @input="handleInput"
    :readonly="props.isReadOnly"
    :autocomplete="props.autocomplete"
    :maxlength="props.maxLength"
  />
  <div v-if="isValidate">유효성검증 실패</div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  placeholder: {
    type: String,
    // required: true,
  },
  type: {
    type: String,
    // required: true,
  },
  isReadOnly: {
    type: Boolean,
    // default: false,
  },
  autocomplete: {
    type: String,
    default: "on",
  },
  size: {
    type: String,
    // required: true,
  },
  value: {
    type: String,
    // required: true,
  },
  maxLength: {
    type: Number,
  },
});

const emit = defineEmits(["input"]);
const isValidate = ref(false);

const handleInput = (event) => {
  emit("input", event);
};
</script>

<style src="@/assets/css/common/Input.css" module></style>
