<template>
  <DeskTopContents v-if="!isMobile" />
  <MobileContents v-else />
</template>

<script setup>
import DeskTopContents from "#/renewalHome/DeskTopContents.vue";
import MobileContents from "#/renewalHome/MobileContents.vue";
import { useMobileSizeStore } from "@/store/useMobileSizeStore";
import { storeToRefs } from "pinia";

const mobileSizeStore = useMobileSizeStore();
const { isMobile } = storeToRefs(mobileSizeStore);
</script>

<style></style>
