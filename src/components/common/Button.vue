<template>
  <button
    :type="btnType"
    v-if="type === 'primary'"
    :class="[$style.commonBtn, $style.primaryBtn]"
    @click="handleBtnClick"
  >
    {{ text }}
  </button>
  <button
    :type="btnType"
    v-else
    :class="[$style.commonBtn, $style.secondaryBtn]"
    @click="handleBtnClick"
  >
    {{ text }}
  </button>
</template>

<script setup>
const { type, btnType, text, eventName } = defineProps({
  type: {
    type: String,
    requried: true,
  },
  btnType: {
    type: String,
    default: "button",
  },
  text: {
    type: String,
    requried: true,
  },
  eventName: {
    type: String,
    requried: true,
  },
});

const emit = defineEmits();

const handleBtnClick = (event) => {
  emit(eventName, { event });
};
</script>

<style src="@/assets/css/common/Button.css" module></style>
