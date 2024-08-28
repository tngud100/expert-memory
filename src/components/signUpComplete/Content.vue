<template>
  <div :class="$style.wrapper">
    <IconSignUpComplete />
    <h2 :class="$style.title">회원가입이 완료되었습니다.</h2>
    <div :class="$style.descBox">
      <p :class="$style.desc">모든 회원가입 절차가 완료되었습니다.</p>
      <p :class="$style.desc">조선타자기 서비스를 이용할 수 있습니다.</p>
    </div>
    <button :class="$style.gotoBtn" @click="gotoLoginPage">
      로그인 바로하기
    </button>
  </div>
</template>

<script setup>
import IconSignUpComplete from "#/icons/IconSignUpComplete.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const gotoLoginPage = () => {
  router.push("/login");
};
</script>

<style src="@/assets/css/signUpComplete/Contents.css" module></style>