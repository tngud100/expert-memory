<template>
  <section :class="$style.wrapper">
    <div :class="$style.filter" @click="$emit('closeBtn')"></div>
    <div :class="$style.reviewModal">
      <div :class="$style.leftArea">
        <div :class="$style.imgContainer">
          <img
            :src="props.cardData.imgList[selectedIndex]"
            :class="$style.img"
            alt="리뷰 이미지"
          />
          <div :class="$style.imgFilter" />
        </div>
        <div :class="$style.textBox">
          <h3 :class="$style.title">
            [{{ props.cardData.type }}] {{ props.cardData.title }}
          </h3>
          <p :class="$style.loginId">{{ props.cardData.loginId }}</p>
        </div>
        <div :class="$style.buttonBox">
          <div :class="$style.leftBtn">
            <IconLeftWhiteArrow
              :class="$style.arrowIcon"
              v-if="selectedIndex > 0"
              @click="leftBtn"
            />
            <IconLeftClearArrow
              :class="$style.arrowIcon"
              v-if="selectedIndex <= 0"
            />
          </div>
          <div :class="$style.circleBtnBox">
            <div :class="$style.circleContainer">
              <div
                v-for="index in props.cardData.imgList.length"
                :key="index"
                :class="[
                  $style.circle,
                  selectedIndex === index - 1 ? $style.active : $style.default,
                ]"
                @click="selectedIndex = index - 1"
              ></div>
            </div>
          </div>
          <div :class="$style.rightBtn">
            <IconRightWhiteArrow
              :class="$style.arrowIcon"
              v-if="selectedIndex < props.cardData.imgList.length - 1"
              @click="rightBtn"
            />
            <IconRightClearArrow
              :class="$style.arrowIcon"
              v-if="selectedIndex >= props.cardData.imgList.length - 1"
            />
          </div>
        </div>
      </div>
      <div :class="$style.rightArea">
        <heaeder :class="$style.header">
          <span :class="$style.headerTitle">리뷰</span>
          <div
            @mouseover="isHovering = true"
            @mouseleave="isHovering = false"
            @click="$emit('closeBtn')"
          >
            <IconClose :class="$style.closeBtn" v-if="isHovering" />
            <IconCloseGray :class="$style.closeBtn" v-else />
          </div>
        </heaeder>
        <div :class="$style.commentBox">
          <div :class="$style.commentTitle">
            <span :class="$style.userName">{{ props.cardData.loginId }}</span>
            <span :class="$style.date">{{ props.cardData.date }}</span>
          </div>
          <p :class="$style.comment">{{ props.cardData.content }}</p>
          <div :class="$style.replyBox">
            <span :class="$style.userName">조선 타자기</span>&nbsp;
            <span :class="$style.date">{{ props.cardData.commentDate }}</span>
            <p :class="$style.comment">{{ props.cardData.comment }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import IconClose from "#/icons/IconReviewClose.vue";
import IconCloseGray from "#/icons/IconReviewCloseGray.vue";
import IconLeftWhiteArrow from "#/icons/IconLeftWhiteArrow.vue";
import IconRightWhiteArrow from "#/icons/IconRightWhiteArrow.vue";
import IconLeftClearArrow from "#/icons/IconLeftClearArrow.vue";
import IconRightClearArrow from "#/icons/IconRightClearArrow.vue";
import { ref } from "vue";

const props = defineProps({
  cardData: Object,
});
const selectedIndex = ref(0);
const isHovering = ref(false);

const leftBtn = () => {
  if (selectedIndex.value > 0) {
    selectedIndex.value--;
  }
};
const rightBtn = () => {
  if (selectedIndex.value < props.cardData.imgList.length - 1) {
    selectedIndex.value++;
  }
};
</script>

<style src="@/assets/css/review/ReviewModal.css" module>
</style>