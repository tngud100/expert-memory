<template>
  <div :class="$style.countdown" v-if="verifyComment != '인증완료'">
    {{ formattedCount }} 남음
  </div>
  <div :class="$style.comment">
    {{ props.verifyComment }}
  </div>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from "vue";

const emit = defineEmits(["timeOut"]);

const props = defineProps({
  time: {
    type: Number,
  },
  isSendCode: {
    type: Boolean,
  },
  verifyComment: {
    type: String,
  },
});

const countdown = ref(props.time);
let timer = null;

const formattedCount = computed(() => {
  const minutes = Math.floor(countdown.value / 60);
  const seconds = countdown.value % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
});

watch(
  () => props.verifyComment === "인증완료",
  (newVal) => {
    if (newVal) {
      clearInterval(timer);
    }
  }
);

watch(
  () => props.isSendCode,
  (newVal) => {
    if (newVal) {
      countdown.value = props.time;
      if (timer) {
        clearInterval(timer);
      }
      timer = setInterval(() => {
        countdown.value--;
        if (countdown.value === 0) {
          clearInterval(timer);
          emit("timeOut");
        }
      }, 1000);
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style src="@/assets/css/common/CountDown.css" module></style>
