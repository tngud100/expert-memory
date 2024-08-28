<template>
  <nav :class="$style.nav">
    <ul :class="$style.navList">
      <li>
        <router-link
          :class="$style.navItem"
          to="/keyboard"
          v-show="!isShowingKeyboardImg"
          >Keyboard</router-link
        >
        <IconKeyboard v-show="isShowingKeyboardImg" />
      </li>
      <li>
        <router-link
          :class="$style.navItem"
          to="/switch"
          v-show="!isShowingSwitchImg"
          >Switch</router-link
        >
        <IconSwitch v-show="isShowingSwitchImg" />
      </li>
      <li>
        <router-link :class="$style.navItem" to="/pcb" v-show="!isShowingPcbImg"
          >PCBs</router-link
        >
        <IconPcb v-show="isShowingPcbImg" />
      </li>
      <li>
        <router-link
          :class="$style.navItem"
          to="/keycap"
          v-show="!isShowinKeycapImg"
          >Keycaps</router-link
        >
        <IconKeycap v-show="isShowinKeycapImg" />
      </li>
      <li>
        <router-link
          :class="$style.navItem"
          to="/tool"
          v-show="!isShowinToolImg"
          >Tool</router-link
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

const isShowingKeyboardImg = computed(() => route.path === "/keyboard");
const isShowingSwitchImg = computed(() => route.path === "/switch");
const isShowingPcbImg = computed(() => route.path === "/pcb");
const isShowinKeycapImg = computed(() => route.path === "/keycap");
const isShowinToolImg = computed(() => route.path === "/tool");
</script>

<style src="@/assets/css/layouts/Nav.css" module></style>
