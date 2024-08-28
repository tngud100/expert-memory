<template>
  <section>
    <Swiper :class="$style.SwiperSection" />
    <Intro :class="$style.IntroSection" />
    <Product :class="$style.ProductSection" />
    <Banner :class="$style.BannerSection" />
    <News :class="$style.NewsSection" />
  </section>
</template>

<script setup>
import Swiper from "#/swiper/HomeSwiperContents.vue";
import Intro from "#/renewalHome/deskTop/IntroDeskTop.vue";
import Product from "#/renewalHome/deskTop/ProductDeskTop.vue";
import Banner from "#/renewalHome/deskTop/BannerDeskTop.vue";
import News from "#/renewalHome/deskTop/NewsDeskTop.vue";
</script>
<style src="@/assets/css/renewalHome/DeskTopContents.css" module></style>
