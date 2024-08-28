<template>
  <div :class="$style.checkWrapper">
    <div :class="$style.textBox">
      <span :class="$style.notice">비밀번호를 입력해주세요.</span><br />
      <span :class="$style.describe"
        >회원님의 개인정보 보호를 위해 비밀번호를 다시 한번 확인 합니다.<br />
        비민번호가 노출되지 않도록 주의해주세요.</span
      >
    </div>
    <div :class="$style.activeBox">
      <input
        :class="$style.passwordInput"
        type="password"
        @change="handlePassword"
        placeholder="비밀번호를 입력해주세요."
      />

      <button :class="$style.verifyBtn" @click="checkAccount">확인</button>
    </div>
  </div>
</template>

<script setup>
import getTokenData from "@/utils/getTokenData.js";
import { AuthAPI } from "@/api/AuthAPI.js";
import { onMounted, ref } from "vue";
const { getUserIdFromToken } = getTokenData();
const { isPasswordCorrect } = AuthAPI();
const emit = defineEmits(["checkAccount"]);
const loginId = ref(null);
const password = ref("");
onMounted(() => {
  loginId.value = getUserIdFromToken();
});

const handlePassword = (event) => {
  password.value = event.target.value;
};

const checkAccount = async () => {
  console.log(loginId.value, password.value);
  const isCorrect = await isPasswordCorrect(loginId.value, password.value);
  if (!isCorrect) {
    return alert("비밀번호가 일치하지 않습니다.");
  }
  await emit("checkAccount", isCorrect);
};
</script>
<style src="@/assets/css/myinfo/CheckPassword.css" module></style>
