<template>
  <li
    :class="$style.productItem"
    @click="clickProduct"
    :style="{
      width: props.isMobile ? 'calc(100%/2 - 5px)' : 'calc(1400px/4 - 48px)',
    }"
  >
    <div v-if="isNormalType" :class="$style.imgWrapper">
      <img
        :src="props.backgroundImg"
        alt="배경 이미지"
        :class="$style.normalImg"
      />
    </div>
    <div v-else :class="$style.imgWrapper" ref="imgWrapperRef">
      <img
        :src="props.backgroundImg"
        alt="배경 이미지"
        :class="$style.backgroundImg"
        ref="backgroundRef"
      />
      <!-- <img
        :src="props.productImg"
        alt="상품 이미지"
        :class="$style.productImg"
        ref="productRef"
      /> -->
    </div>
    <div :class="$style.infoWrapper">
      <p
        :class="$style.name"
        :style="{ fontSize: props.isMobile ? '14px' : '16px' }"
      >
        {{ props.name }}
      </p>

      <p
        :class="$style.price"
        :style="{ fontSize: props.isMobile ? '16px' : '18px' }"
      >
        <!-- <IconCurrency :style="[{ width: '17.33px', height: '13px' }]" /> -->
        {{ formattedPrice(props.price) }}원
      </p>
    </div>
  </li>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { formattedPrice } from "@/utils/index.js";
import IconCurrency from "#/icons/IconCurrency.vue";

const TYPE = {
  NORMAL: "normal",
};

const props = defineProps({
  type: {
    type: String,
  },
  id: {
    type: Number,
    required: true,
  },
  // productImg: {
  //   type: String,
  // },
  backgroundImg: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isMobile: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const imgWrapperRef = ref(null);
const backgroundRef = ref(null);
// const productRef = ref(null);

const isNormalType = computed(() => props.type === TYPE.NORMAL);

const clickProduct = () => emit("click", props.id);

const mouseenterImgCallback = () => {
  // backgroundRef.value.style.filter = "blur(1px)";
  // productRef.value.style.width = "85%";
  // backgroundRef.value.style.borderRadius = "13px";
  backgroundRef.value.style.transform = "scale(1.1)";
};

const mouseleaveImgCallback = () => {
  // backgroundRef.value.style.filter = "blur(0px)";
  // productRef.value.style.width = "75%";
  // backgroundRef.value.style.borderRadius = "0px";
  backgroundRef.value.style.transform = "scale(1)";
};

onMounted(() => {
  if (!imgWrapperRef.value) {
    return;
  }

  imgWrapperRef.value.addEventListener("mouseenter", mouseenterImgCallback);
  imgWrapperRef.value.addEventListener("mouseleave", mouseleaveImgCallback);
});

onBeforeUnmount(() => {
  if (!imgWrapperRef.value) {
    return;
  }

  imgWrapperRef.value.removeEventListener("mouseenter", mouseenterImgCallback);
  imgWrapperRef.value.removeEventListener("mouseleave", mouseleaveImgCallback);
});
</script>

<style src="@/assets/css/common/Product.css" module></style>
