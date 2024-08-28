<template>
  <section>
    <IntroText />
    <Intro :introState="true" />
    <Value />
  </section>
</template>

<script setup>
import IntroText from "#/renewalIntro/mobile/IntroText.vue";
import Intro from "#/renewalIntro/mobile/IntroMain.vue";
import Value from "#/renewalIntro/mobile/IntroValue.vue";
</script>

