<template>
  <SignForm />
  <footer :class="$style.footer">
    <button :class="$style.confirmBtn" type="button" @click="cancel">
      취소하기
    </button>
    <button :class="$style.confirmBtn" type="button" @click="modifyAccount">
      수정완료
    </button>
  </footer>
</template>

<script setup>
import SignForm from "#/myinfo/SignForm.vue";
const emit = defineEmits(["cancel", "modifyAccount"]);
const cancel = () => {
  emit("cancel");
};
</script>

<style src="@/assets/css/myinfo/ModifyAccount.css" module></style>