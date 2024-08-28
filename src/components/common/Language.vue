<template>
  <div :class="$style.wrapper" @click="toggleLanguage">
    <button type="button" :class="$style.world"></button>
    <button
      type="button"
      :class="$style.language"
      :style="{
        backgroundImage: language.isLanguage
          ? `url(${korean})`
          : `url(${english})`,
      }"
    ></button>
  </div>
</template>

<script setup>
import { animateLanguage } from "@/utils/anime";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useCssModule } from "vue";
import korean from "@/assets/images/korean.svg";
import english from "@/assets/images/english.svg";

const language = useLanguageStore();
const style = useCssModule();

const toggleLanguage = () => {
  animateLanguage(style.world, style.language, () => {
    language.toggleLanguage();
  });
};
</script>

<style src="@/assets/css/common/Language.css" module></style>
