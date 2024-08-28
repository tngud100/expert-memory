<template>
  <div :class="$style.IntroSection">
    <div :class="$style.textWrapper" ref="valueCon">
      <p :class="$style.title">조선타자기는</p>
      <p :class="$style.value">이런 가치를 지니고 있습니다.</p>
    </div>
    <div :class="$style.valueWrapper">
      <div :class="$style.valueBox" ref="value0">
        <img :class="$style.valueImg" :src="valueList[0].img" alt="" />
        <div :class="$style.valueText">
          <p :class="$style.valueTitle">{{ valueList[0].title }}</p>
          <p :class="$style.valueDesc">{{ valueList[0].value }}</p>
        </div>
      </div>
      <div :class="$style.valueBox" ref="value1">
        <img :class="$style.valueImg" :src="valueList[1].img" alt="" />
        <div :class="$style.valueText">
          <p :class="$style.valueTitle">{{ valueList[1].title }}</p>
          <p :class="$style.valueDesc">{{ valueList[1].value }}</p>
        </div>
      </div>
      <div :class="$style.valueBox" ref="value2">
        <img :class="$style.valueImg" :src="valueList[2].img" alt="" />
        <div :class="$style.valueText">
          <p :class="$style.valueTitle">{{ valueList[2].title }}</p>
          <p :class="$style.valueDesc">{{ valueList[2].value }}</p>
        </div>
      </div>
      <div :class="$style.valueBox" ref="value3">
        <img :class="$style.valueImg" :src="valueList[3].img" alt="" />
        <div :class="$style.valueText">
          <p :class="$style.valueTitle">{{ valueList[3].title }}</p>
          <p :class="$style.valueDesc">{{ valueList[3].value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import introValue4 from "@/assets/images/icon_custom.svg";
import introValue2 from "@/assets/images/icon_price.svg";
import introValue3 from "@/assets/images/icon_price-1.svg";
import introValue1 from "@/assets/images/icon_communication.svg";
import { nextTick, onMounted, ref } from "vue";
import { fadeInElements } from "@/utils/gsapUtils.js";

const valueCon = ref(null);
const value0 = ref(null);
const value1 = ref(null);
const value2 = ref(null);
const value3 = ref(null);

const valueList = [
  {
    idx: 0,
    img: introValue1,
    title: "소통",
    value: "소비자 의견이 담긴 개선",
  },
  {
    idx: 1,
    img: introValue2,
    title: "서비스",
    value: "이용 불편함 최소화",
  },
  {
    idx: 2,
    img: introValue3,
    title: "가격",
    value: "합리적인 가격",
  },
  {
    idx: 3,
    img: introValue4,
    title: "커스텀",
    value: "개인 선호도에 맞춰 커스텀",
  },
];

onMounted(async () => {
  await nextTick();
  await fadeInElements(
    valueCon.value,
    [valueCon.value, value0.value, value1.value, value2.value, value3.value],
    null,
    50
  );
  // fadeInElements(
  //   valueCon.value,
  //   [value0.value, value1.value, value2.value, value3.value],
  //   null,
  //   50,
  //   1,
  //   1,
  //   null,
  //   0.2
  // );
});
</script>

<style src="@/assets/css/renewalIntro/mobile/IntroValue.css" module></style>