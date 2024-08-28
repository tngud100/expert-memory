<template>
  <nav :class="$style.nav">
    <ul :class="$style.navList">
      <li :class="$style.itemBox">
        <router-link
          :class="$style.navItem"
          to="/product/keyboard"
          v-show="!isShowingKeyboardImg"
          >키보드</router-link
        >
        <IconKeyboard v-show="isShowingKeyboardImg" />
      </li>
      <li :class="$style.itemBox">
        <router-link
          :class="$style.navItem"
          to="/product/switch"
          v-show="!isShowingSwitchImg"
          >스위치</router-link
        >
        <IconSwitch v-show="isShowingSwitchImg" />
      </li>
      <li :class="$style.itemBox">
        <router-link
          :class="$style.navItem"
          to="/product/pcb"
          v-show="!isShowingPcbImg"
          >PCB</router-link
        >
        <IconPcb v-show="isShowingPcbImg" />
      </li>
      <li :class="$style.itemBox">
        <router-link
          :class="$style.navItem"
          to="/product/keycap"
          v-show="!isShowinKeycapImg"
          >키캡</router-link
        >
        <IconKeycap v-show="isShowinKeycapImg" />
      </li>
      <li :class="$style.itemBox">
        <router-link
          :class="$style.navItem"
          to="/product/tool"
          v-show="!isShowinToolImg"
          >도구</router-link
        >
        <IconTool v-show="isShowinToolImg" />
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

<style src="@/assets/css/layouts/RenewalProductNav.css" module></style>
