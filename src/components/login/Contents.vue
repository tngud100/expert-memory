<template>
  <section :class="$style.wrapper">
    <form @submit.prevent="" :class="$style.form">
      <h2 :class="$style.title">로그인</h2>

      <input
        type="text"
        placeholder="아이디를 입력해주세요"
        :value="loginId"
        :class="$style.input"
        @change="loginId = $event.target.value"
      />
      <input
        type="password"
        placeholder="비밀번호를 입력해주세요"
        :value="password"
        :class="$style.input"
        @change="password = $event.target.value"
        autocomplete="off"
      />
      <div :class="$style.infoWrapper">
        <div :class="$style.infoSavedWrapper">
          <input type="checkbox" id="savedId" :class="$style.idSavedCheckBox" />
          <label for="savedId">아이디 저장</label>
        </div>
        <div :class="$style.infoFinder">
          아이디&nbsp;찾기&nbsp;|&nbsp;비밀번호&nbsp;찾기
        </div>
      </div>
      <button
        :class="[$style.commonBtn, $style.loginBtn]"
        type="submit"
        @click="moveToMypage"
      >
        로그인
      </button>
      <button
        :class="[$style.commonBtn, $style.signupBtn]"
        type="button"
        @click="moveToAgreementPage()"
      >
        회원가입
      </button>
    </form>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { AuthAPI } from "@/api/AuthAPI.js";
import { useAuthStore } from "@/store/useAuthStore.js";

const router = useRouter();

const authStore = useAuthStore();

const { loginCheck, getUserDataByLoginId } = AuthAPI();

const loginId = ref("");
const password = ref("");

const moveToAgreementPage = () => {
  router.push("/agreement");
};

const moveToMypage = async () => {
  const loginForm = new FormData();
  loginForm.append("login_id", loginId.value);
  loginForm.append("password", password.value);

  const data = await loginCheck(loginForm);
  if (data.authorization && data.refreshToken) {
    const token = {
      authorization: data.authorization,
      refreshToken: data.refreshToken,
    };
    authStore.setToken(JSON.stringify(token));
    await authStore.fetchUserData();
    // console.log("auth", authStore.userData);
    router.push("/mypage");
  }
};
</script>

<style src="@/assets/css/login/Contents.css" module></style>
