<template>
  <section :class="$style.menuSection">
    <ul :class="$style.box">
      <router-link to="/intro" :class="$style.gotoBtn" @click="gotoLink">
        <li>회사소개</li>
      </router-link>
      <router-link
        to="/product/keyboard"
        :class="$style.gotoBtn"
        @click="gotoLink(1)"
      >
        <li>상품</li>
      </router-link>
      <a :class="$style.gotoBtn">
        <li>스토어 바로가기</li>
      </a>
      <router-link to="/board/notice" :class="$style.gotoBtn" @click="gotoLink">
        <li>고객지원</li>
      </router-link>
    </ul>
    <div :class="$style.container">
      <div :class="$style.textBox">
        <p :class="$style.callName">고객센터</p>
        <p :class="$style.callNum">051-000-0000</p>
        <p>
          운영 시간 : 09:00 ~ 18:00<br />
          점심시간 12:00 ~ 13:00<br />
          주말 및 공휴일 휴무
        </p>
      </div>
      <div :class="$style.btnBox">
        <button :class="$style.btn">자주묻는 질문</button>
        <button :class="$style.btn">자료실</button>
      </div>
    </div>
    <div :class="$style.copyright">
      <p>Copyrightⓒ 2024 조선타자기 All right reserved.</p>
    </div>
  </section>
</template>

<script setup>
const emit = defineEmits(["gotoLink"]);

const gotoLink = () => {
  emit("gotoLink");
};
</script>

<style src="@/assets/css/layouts/RenewalMobileMenu.css" module></style>