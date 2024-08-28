<template>
  <section>
    <AskMain
      v-if="menuNum == 2 && !showWriteAskForm"
      @showWriteForm="showWriteForm"
    />
    <ReviewMain v-if="menuNum == 3 && !showWriteAskForm" />
    <WriteAsk
      v-if="showWriteAskForm"
      @goBackAskList="goBackAskList"
      :inquireNum="inquireNum"
    />
  </section>
</template>

<script setup>
import AskMain from "#/myaskReview/AskMain.vue";
import ReviewMain from "#/myaskReview/ReviewMain.vue";
import WriteAsk from "#/myaskReview/WriteAsk.vue";
import { ref, watchEffect } from "vue";

const showWriteAskForm = ref(false);

const inquireNum = ref(null);

const emit = defineEmits(["goBackAskList"]);

const props = defineProps({
  menuNum: Number,
  writeAsk: Boolean,
});

watchEffect(
  () => {
    if (props.writeAsk) {
      showWriteAskForm.value = true;
    }
  },
  { immediate: true }
);
const showWriteForm = (inquire_id) => {
  showWriteAskForm.value = true;
  inquireNum.value = inquire_id;
};
const goBackAskList = () => {
  showWriteAskForm.value = false;
  inquireNum.value = null;
  emit("goBackAskList");
};
</script>

<style>
</style>