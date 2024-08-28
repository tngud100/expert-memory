<template>
  <footer>
    <section :class="$style.topSideWrapper">
      <div :class="$style.topSide">
        <div>
          <img :src="logo" />
        </div>
        <div>
          <ul :class="$style.topSideList">
            <li :class="[$style.topSideItem, $style.introduced]">회사소개</li>
            <li :class="[$style.topSideItem, $style.used]">이용약관</li>
            <li :class="[$style.topSideItem, $style.personalInfo]">
              개인정보처리방침
            </li>
            <li :class="[$style.topSideItem, $style.guide]">이용안내</li>
          </ul>
          <p :class="$style.company">
            상호명: 조선타자기 | 대표자: 정성엽 | 주소: 부산광역시 백양대로 684
            2F | 사업자등록번호: 000-00-00000 | 통신판매신고번호:
            2024-부산사상-00000<br />고객센터: 051-000-0000 |
            개인정보보호책임자: 정성엽(gameinscokr@naver.com)
          </p>
        </div>
      </div>
    </section>
    <section :class="$style.bottomSideWrapper">
      <div :class="$style.bottomSide">
        <div :class="$style.bottomBox">
          <h3 :class="$style.customerService">고객센터</h3>
          <p :class="$style.tel">051-000-0000</p>
          <ul :class="$style.timeList">
            <li :class="$style.timeItem">운영 시간 : 평일 09:00 ~ 18:00</li>
            <li :class="$style.timeItem">점심시간 12:00 ~ 13:00</li>
            <li :class="$style.timeItem">주말 및 공휴일 휴무</li>
          </ul>
        </div>
        <p :class="$style.copyright">
          Copyright 2023 조선타자기 All right reserved.
        </p>
      </div>
    </section>
  </footer>
</template>

<script setup>
import logo from "@/assets/images/logo.jpg";
</script>

<style src="@/assets/css/layouts/Footer.css" module></style>
