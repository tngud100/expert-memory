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
import Swiper from "#/swiper/HomeSwiperMobileContents.vue";
import Intro from "#/renewalHome/mobile/IntroMobile.vue";
import Product from "#/renewalHome/mobile/ProductMobile.vue";
import Banner from "#/renewalHome/mobile/BannerMobile.vue";
import News from "#/renewalHome/mobile/NewsMobile.vue";
</script>
<style src="@/assets/css/renewalHome/DeskTopContents.css" module>
</style>
