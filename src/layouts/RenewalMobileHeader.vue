<template>
  <header>
    <div :class="$style.header">
      <router-link to="/">
        <img :src="logoText" alt="logo" :class="$style.logoText" />
      </router-link>
      <div :class="$style.btnBox">
        <menuIcon
          @click="clickMenu"
          v-if="!isclicked"
          :class="[$style.menu, $style.open]"
        />
        <menuCloseIcon
          @click="clickMenu"
          v-if="isclicked"
          :class="[$style.menu, $style.close]"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
import logoText from "@/assets/images/logoText.svg";
import menuIcon from "#/icons/IconMobileMenu.vue";
import menuCloseIcon from "#/icons/IconMobileCloseMenu.vue";
import { ref, watch } from "vue";

const emit = defineEmits(["isClickMenu"]);

const props = defineProps({
  isClickedMenu: Boolean,
});

const isclicked = ref(false);
const clickMenu = () => {
  isclicked.value = !isclicked.value;
  menuBtnClick();
  emit("isClickMenu", isclicked.value);
};
const menuBtnClick = () => {
  document.body.style.overflow = isclicked.value ? "hidden" : "auto";
};

watch(
  () => props.isClickedMenu,
  (value) => {
    isclicked.value = value;
    menuBtnClick();
  }
);
</script>

<style src="@/assets/css/layouts/RenewalMobileHeader.css" module></style>