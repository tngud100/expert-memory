<template>
  <footer>
    <div :class="$style.footer">
      <div v-if="!props.isClickMenu">
        <!-- <div :class="[$style.topBox, $style.box]">
          <ul :class="$style.topSideList">
            <li :class="$style.topSideItem">회사소개</li>
            <li :class="$style.topSideItem">|</li>
            <li :class="$style.topSideItem">이용약관</li>
            <li :class="$style.topSideItem">|</li>
            <li :class="$style.topSideItem">개인정보처리방침</li>
            <li :class="$style.topSideItem">|</li>
            <li :class="$style.topSideItem">이용안내</li>
          </ul>
        </div> -->
        <div :class="[$style.midBox, $style.box]">
          <img :src="logo" alt="조선타자기 로고" :class="$style.logo" />
          <p :class="$style.company">
            상호명: 조선타자기 | 대표자: 정성엽 <br />
            주소: ㅁㅁㅁㅁ 사업자등록번호: 000-00-00000<br />
            통신판매신고번호: 2024-ㅁㅁㅁㅁ-00000<br />
            개인정보보호책임자: 정성엽(example@example.com)<br />
          </p>
          <!-- <p :class="$style.customerService">고객센터 051-000-0000</p>
          <p :class="$style.timeList">
            운영 시간 : 평일 09:00 ~ 18:00<br />
            점심시간 12:00 ~ 13:00<br />
            주말 및 공휴일 휴무<br />
          </p> -->
        </div>
      </div>
      <div :class="[$style.bottomBox, $style.box]">
        <p :class="$style.copyright">
          Copyrightⓒ 2024 조선타자기 All right reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import logo from "@/assets/images/logoText.svg";
const props = defineProps({
  isClickMenu: {
    type: Boolean,
  },
});
</script>

<style src="@/assets/css/layouts/RenewalMobileFooter.css" module></style>
