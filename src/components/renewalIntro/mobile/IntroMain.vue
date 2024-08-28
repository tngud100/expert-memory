<template>
  <div
    :class="$style.introWrapper"
    :style="{ paddingTop: props.introState ? 0 + 'px' : 80 + 'px' }"
  >
    <div :class="$style.introContents">
      <div :class="$style.logoContainer">
        <img
          src="@/assets/images/logoRed.svg"
          alt="introLogo"
          :class="$style.introLogo"
          ref="introLogo"
        />
        <p ref="introText">조선타자기는</p>
      </div>
      <div :class="$style.textContainer" ref="introDesc">
        <p>높은 접근성을 추구하는 키보드회사입니다.</p>
        <p>소비자분들과의 양방향 소통으로 여러분의</p>
        <p>의견을 담은 제품과 개선되는 서비스를 제공합니다.</p>
      </div>
      <button
        :class="$style.introBtn"
        v-if="!props.introState"
        @click="gotoIntro"
        ref="introBtn"
      >
        회사소개
      </button>
    </div>
    <div :class="$style.infiniteImgWrapper">
      <div :class="$style.imgContainer">
        <div
          v-for="(item, index) in imgList"
          :key="index"
          :class="$style.imgBox"
        >
          <img :src="item.imgSrc" alt="introImg" :class="$style.infiniteImg" />
        </div>
        <!-- 클론 -->
        <div
          v-for="(item, index) in imgList"
          :key="index"
          :class="$style.imgBox"
        >
          <img :src="item.imgSrc" alt="introImg" :class="$style.infiniteImg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import introImg1 from "@/assets/images/introImg1.svg";
import introImg2 from "@/assets/images/introImg2.svg";
import introImg3 from "@/assets/images/introImg3.svg";
import introImg4 from "@/assets/images/introImg4.svg";
import introImg5 from "@/assets/images/introImg5.svg";
import { useRouter } from "vue-router";
import { YdirectfadeIn } from "@/utils/gsapUtils.js";
import { onMounted, ref } from "vue";

const props = defineProps({
  introState: Boolean,
  default: false,
});
const router = useRouter();

const imgList = [
  { imgSrc: introImg1 },
  { imgSrc: introImg2 },
  { imgSrc: introImg3 },
  { imgSrc: introImg4 },
  { imgSrc: introImg5 },
];

const introLogo = ref(null);
const introText = ref(null);
const introDesc = ref(null);
const introBtn = ref(null);

const gotoIntro = () => {
  router.push("/intro");
};

onMounted(() => {
  YdirectfadeIn(introLogo.value, null, 1);
  YdirectfadeIn(introText.value, null, 1.1);
  YdirectfadeIn(introDesc.value, null, 1.2);
});
</script>
<style src="@/assets/css/renewalHome/mobile/IntroMobile.css" module></style>
