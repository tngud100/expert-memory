<template>
  <div :class="$style.textWrapper">
    <div :class="$style.textBox">
      <p :class="$style.title" ref="text">회사 소개</p>
    </div>
  </div>
  <div :class="$style.sloganWrapper">
    <div :class="$style.sloganBox">
      <span :class="[$style.slogan, 'slogan']" ref="slogan">
        타건의 즐거움을 더하다,
      </span>
    </div>
  </div>
</template>

<script setup>
import { mobileLetterSpaceScaleFadeIn } from "@/utils/gsapUtils.js";
import { onMounted, ref } from "vue";

const text = ref(null);
const slogan = ref(null);

onMounted(async () => {
  await mobileLetterSpaceScaleFadeIn(slogan.value, 1.2);
});
</script>

<style src="@/assets/css/renewalIntro/mobile/IntroText.css" module></style>
