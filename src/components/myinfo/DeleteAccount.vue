<template>
  <div :class="$style.descBox">
    <span :class="$style.descText">
      회원탈퇴 전, 유의사항을 확인해 주시기 바랍니다.
    </span>
    <span :class="$style.descText">
      -회원탈퇴 시 회원전용 웹 서비스 이용이 불가합니다.</span
    >
    <span :class="$style.descText">
      -회원탈퇴 시 회원전용 웹 서비스 이용이 불가합니다.</span
    >
    <span :class="$style.descText">
      -회원탈퇴 시 회원전용 웹 서비스 이용이 불가합니다.</span
    >
    <span :class="$style.descText">
      -회원탈퇴 시 회원전용 웹 서비스 이용이 불가합니다.</span
    >
    <span :class="$style.descText">
      -회원탈퇴 시 회원전용 웹 서비스 이용이 불가합니다.</span
    >
    <span :class="$style.descText">
      -회원탈퇴 시 회원전용 웹 서비스 이용이 불가합니다.</span
    >
  </div>
  <div :class="$style.checkWrapper">
    <input type="checkbox" id="agree" name="agree" value="agree" />
    <label for="agree" :class="$style.checkLabel"
      >조선타자기 회원탈퇴 시 처리 사항 안내를 확인하였음에 동의합니다.</label
    >
  </div>
  <div :class="$style.passwordInputWrapper">
    <span :class="$style.inputLabel"> 사용중인 비밀번호 </span>
    <div :class="$style.passwordInputBox">
      <input
        :class="$style.passwordInput"
        type="password"
        placeholder="비밀번호를 입력해주세요."
      />
      <button :class="$style.deleteBtn">회원탈퇴</button>
    </div>
  </div>
</template>

<script setup>
</script>

<style src="@/assets/css/myinfo/DeleteAccout.css" module></style>
