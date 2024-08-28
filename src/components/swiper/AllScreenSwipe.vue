<template>
  <div
    :class="['swiper-container', $style.slide]"
    :style="{
      minWidth: props.imgSize.minWidth + 'px',
      maxWidth: props.imgSize.maxWidth + 'px',
      height: props.imgSize.height + 'px',
    }"
  >
    <div class="swiper-wrapper">
      {{ console.log(item) }}
      <div
        :class="['swiper-slide', $style.swiperSlide]"
        :style="{ maxWidth: props.imgSize.maxWidth + 'px' }"
        v-for="slide in item"
        :key="slide.idx"
      >
        <a :href="slide.link" target="_blank" :class="$style.linkBox">
          <img :src="slide.img" :alt="slide.productName" :class="$style.img" />
          <div :class="$style.textCon">
            <h3 :class="$style.title">{{ slide.productTitle }}</h3>
            <p :class="$style.text">{{ slide.productName }}</p>
          </div>
        </a>
        <!-- 네비게이션 버튼 요소 추가 -->
      </div>
      <div v-if="props.pagination" class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";

const props = defineProps({
  slidesPerView: {
    type: Number,
    default: 1,
  },
  spaceBetween: {
    type: Number,
    default: 50,
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  loop: {
    type: Boolean,
    default: true,
  },
  pagination: {
    type: Boolean,
    default: true,
  },
  item: {
    type: Array,
    required: true,
  },
  imgSize: {
    type: Array,
  },
  autoSwipe: {
    type: Boolean,
  },
});

const emit = defineEmits(["currentPage"]);

const swiperInstance = ref(null);
const currentPage = ref(1);

const initSwiper = () => {
  swiperInstance.value = new Swiper(".swiper-container", {
    slidesPerView: props.slidesPerView,
    spaceBetween: props.spaceBetween,
    loop: props.loop,
    autoplay: props.autoplay
      ? {
          delay: 3200,
          disableOnInteraction: false,
        }
      : false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    effect: "fade", // 페이드 효과 추가
    fadeEffect: {
      crossFade: true,
    },
    speed: 700,
    navigation: {
      nextEl: ".nextBtn",
      prevEl: ".prevBtn",
    },
    on: {
      slideChange: () => {
        if (
          swiperInstance.value &&
          swiperInstance.value.realIndex !== undefined
        ) {
          currentPage.value = swiperInstance.value.realIndex + 1;
          emit("currentPage", currentPage.value);
        }
      },
    },
  });
};

const toggleAutoplay = () => {
  if (swiperInstance.value && swiperInstance.value.autoplay.running) {
    swiperInstance.value.autoplay.stop();
  } else if (swiperInstance.value) {
    swiperInstance.value.autoplay.start();
  }
};

watch(
  () => props.autoSwipe,
  (value) => {
    toggleAutoplay();
  }
);

onMounted(async () => {
  await nextTick();
  initSwiper();
});

onBeforeUnmount(() => {
  if (swiperInstance.value) {
    swiperInstance.value.destroy(true, true);
  }
});
</script>

<style src="@/assets/css/swiper/AllScreenSwipe.css" module></style>
<style>
.swiper-pagination-bullet {
  background-color: white;
  opacity: 1;
}
.swiper-pagination-bullet-active {
  background-color: #494949;
  opacity: 1;
}
</style>