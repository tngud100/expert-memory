<template>
  <section :class="$style.wrapper" ref="wrapperRef">
    <form @submit.prevent="" :class="$style.form" ref="formRef">
      <IconNewLogo :class="$style.titleLink" style="margin-bottom: 105px" />
      <h2 :class="$style.title">로그인</h2>
      <input
        type="text"
        placeholder="아이디를 입력해주세요"
        :class="$style.input"
        @change="loginId = $event.target.value"
      />
      <input
        type="password"
        placeholder="비밀번호를 입력해주세요"
        :class="$style.input"
        autocomplete="off"
        @change="password = $event.target.value"
      />
      <button
        :class="[$style.commonBtn, $style.loginBtn]"
        style="margin-top: 10px"
        type="submit"
        @click="moveToAdminPage"
      >
        로그인
      </button>
    </form>
  </section>
</template>

<script setup>
import IconNewLogo from "#/icons/IconNewLogo.vue";
import { nextTick, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { AuthAPI } from "@/api/AuthAPI.js";
import { useAuthStore } from "@/store/useAuthStore.js";

const { loginCheck } = AuthAPI();
const router = useRouter();
const authStore = useAuthStore();

const wrapperRef = ref();
const formRef = ref();

const loginId = ref("");
const password = ref("");

onMounted(() => {
  nextTick(() => {
    findElAndSetWrapperHeight();
  });
});

const findElAndSetWrapperHeight = () => {
  const formElement = formRef.value;
  if (formElement) {
    const formHeight = formElement.offsetHeight;
    wrapperRef.value.style.height = `calc(100vh - ${formHeight / 2}px)`;
  } else {
    console.error("form 요소를 찾을 수 없습니다.");
  }
};

const moveToAdminPage = async () => {
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
    console.log("auth", authStore.userData);
    router.push("/admin/products");
  }
};
</script>

<style src="@/assets/css/login/Contents.css" module></style>
