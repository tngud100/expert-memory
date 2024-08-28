<template>
  <div :class="$style.preventTouch"></div>
  <div :class="$style.wrapper">
    <div :class="$style.checkModal">
      <div :class="$style.textBox">
        <span :class="$style.comment">{{ comment }}</span>
      </div>
      <div :class="$style.btnBox">
        <button :class="$style.btn" @click="cancel">취소</button>
        <button :class="$style.btn" @click="verify">확인</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineEmits, defineProps, watch } from "vue";
import { useModalStore } from "@/store/useModalStore.js";

const modalStore = useModalStore();

const emit = defineEmits(["isVerifyState"]);

const cancel = () => {
  modalStore.setOpenVerifyModal(false);
  emit("isVerifyState", false);
};
const verify = () => {
  modalStore.setOpenVerifyModal(false);
  emit("isVerifyState", true);
};

let props = defineProps({
  commentCode: Number,
});
const comment = computed(() => modalStore.getCommentByCode(props.commentCode));
</script>

<style src="@/assets/css/modal/CheckModal.css" module />