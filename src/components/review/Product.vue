<template>
  <section>
    <div :class="$style.imgBox">
      <img :src="props.img[0]" :class="$style.img" alt="리뷰 이미지" />
    </div>
    <h3 :class="$style.title">[{{ props.type }}] {{ props.title }}</h3>
    <p :class="$style.loginId">{{ props.loginId }}</p>
  </section>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  img: Array,
  type: String,
  title: String,
  loginId: String,
});
</script>

<style src="@/assets/css/review/Product.css" module></style>
