<template>
  <div :class="$style.contentTitle">
    {{ props.title }}
    <button
      v-if="props.title == '1:1문의'"
      :class="$style.reviewBtn"
      @click="$emit('writeAskForm')"
    >
      문의하기
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
});
</script>

<style src="@/assets/css/mypage/Title.css" module>
</style>