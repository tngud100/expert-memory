<template>
  <section>
    <MyPageNav />
    <div :class="$style.container">
      <MyPageMenu :class="$style.sideBar" @menuItem="updateMenuListNum" />
      <div>
        <Title :title="menuName" @writeAskForm="handleWriteAsk" />
        <component
          :is="currentView"
          :menuNum="menuNum"
          :writeAsk="isAskWriteBtn"
          :class="$style.content"
          @goBackAskList="goBackAskList"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import MyPageNav from "@/layouts/MyPageNav.vue";
import MyPageMenu from "@/layouts/MyPageMenu.vue";
import Title from "#/mypage/Title.vue";
import myorder from "#/myorder/Contents.vue";
import myaskReview from "#/myaskReview/Contents.vue";
import myinfo from "#/myinfo/Contents.vue";
import { ref, computed } from "vue";

const menuNum = ref(0);
const menuName = ref("주문조회");

const isAskWriteBtn = ref(false);

const updateMenuListNum = (Item) => {
  menuNum.value = Item.listNum;
  menuName.value = Item.name;
};

const currentView = computed(() => {
  if (menuNum.value <= 1) {
    return myorder;
  } else if (menuNum.value > 1 && menuNum.value <= 3) {
    return myaskReview;
  } else if (menuNum.value > 3 && menuNum.value <= 6) {
    return myinfo; // 다른 컴포넌트 예시로 변경
  } else {
    return myorder; // 기본값 설정
  }
});

const goBackAskList = () => {
  isAskWriteBtn.value = false;
};

const handleWriteAsk = () => {
  isAskWriteBtn.value = true;
};
</script>

<style src="@/assets/css/mypage/Content.css" module></style>
