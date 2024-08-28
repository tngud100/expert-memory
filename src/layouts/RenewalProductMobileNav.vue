<template>
  <nav :class="$style.nav">
    <ul :class="$style.navList">
      <li :class="$style.navItem">
        <router-link
          to="/product/keyboard"
          v-show="!isShowingKeyboardImg"
          :class="$style.item"
          >키보드</router-link
        >
        <IconKeyboard v-show="isShowingKeyboardImg" :class="$style.iconImg" />
      </li>
      <li :class="$style.navItem">
        <router-link
          to="/product/switch"
          v-show="!isShowingSwitchImg"
          :class="$style.item"
          >스위치</router-link
        >
        <IconSwitch v-show="isShowingSwitchImg" :class="$style.iconImg" />
      </li>
      <li :class="$style.navItem">
        <router-link
          to="/product/pcb"
          v-show="!isShowingPcbImg"
          :class="$style.item"
          >PCB</router-link
        >
        <IconPcb v-show="isShowingPcbImg" :class="$style.iconImg" />
      </li>
      <li :class="$style.navItem">
        <router-link
          to="/product/keycap"
          v-show="!isShowinKeycapImg"
          :class="$style.item"
          >키캡</router-link
        >
        <IconKeycap v-show="isShowinKeycapImg" :class="$style.iconImg" />
      </li>
      <li :class="$style.navItem">
        <router-link
          to="/product/tool"
          v-show="!isShowinToolImg"
          :class="$style.item"
          >도구</router-link
        >
        <IconTool v-show="isShowinToolImg" :class="$style.iconImg" />
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import IconKeyboard from "#/icons/IconKeyboard.vue";
import IconSwitch from "#/icons/IconSwitch.vue";
import IconPcb from "#/icons/IconPcb.vue";
import IconKeycap from "#/icons/IconKeycap.vue";
import IconTool from "#/icons/IconTool.vue";

const route = useRoute();

const isShowingKeyboardImg = computed(() => route.path === "/product/keyboard");
const isShowingSwitchImg = computed(() => route.path === "/product/switch");
const isShowingPcbImg = computed(() => route.path === "/product/pcb");
const isShowinKeycapImg = computed(() => route.path === "/product/keycap");
const isShowinToolImg = computed(() => route.path === "/product/tool");
</script>

<style src="@/assets/css/layouts/RenewalProductMobileNav.css" module></style>
