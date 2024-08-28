<template>
  <section :class="$style.wrapper">
    <header :class="$style.header">
      <h2 :class="$style.title">약관 동의</h2>
      <p :class="$style.desc">
        이용약관과 개인정보처리방침에 대한 안내를 읽고 동의 해주세요.
      </p>
      <div :class="$style.checkWrapper">
        <input
          type="checkbox"
          id="all"
          :checked="allAgreement"
          @change="updateAllCheck"
        />
        <label for="all">모든 약관을 확인하고 전체 동의함</label>
      </div>
    </header>
    <main :class="$style.main">
      <div :class="$style.agreementWrapper">
        <h3 :class="$style.subTitle">(필수) 회원 약관</h3>
        <div :class="$style.subDescWrapper">
          <p>조선타자기의 서비스 이용과 관련하여 필요한 사항들을 규정합니다.</p>
          <p :class="$style.subDesc">
            제1조 목적<br />
            본 약관은 조선타자기(이하 "회사"라 합니다)가 제공하는 인터넷
            서비스의 이용과 관련하여 회원의 권리, 의무 및 기타 필요한 사항을
            규정함을 목적으로 합니다.
          </p>
          <p :class="$style.subDesc">
            제2조 (용어의 정의)<br />
            회원 : 회사와 서비스 이용 계약을 체결한 자, 카카오톡 회원가입을 한
            자 아이디 : 카카오톡 ID를 티키앤타카에 부여한 자 비밀번호 : 따로
            수집하지 않습니다.<br />
            닉네임 : 카카오톡 닉네임을 말합니다. 이용 제한 : 회사가 약관에 따라
            회원의 서비스 이용을 제한하는 것을 의미하며,<br />
            일정 기간 서비스 중지, 영구적인 서비스 이용 중지, 서비스 중 일부에
            대한 이용 중지를 포함합니다.<br />
            포인트 : 각 회원에게 부여되는 점수, 서비스의 이용에 따라 증가될 수
            있습니다.
          </p>
        </div>
        <div :class="$style.userAgreementWrapper">
          <div :class="$style.userAgreementCheckboxWrapper">
            <input
              type="checkbox"
              id="userNotAgreement"
              default
              :checked="userAgreement === null ? false : !userAgreement"
              @change="() => (userAgreement = false)"
            />
            <label :class="$style.userAgreementLabel" for="userNotAgreement"
              >동의하지 않음</label
            >
          </div>
          <div :class="$style.userAgreementCheckboxWrapper">
            <input
              type="checkbox"
              id="userAgreement"
              :checked="userAgreement"
              @change="() => (userAgreement = true)"
            />
            <label :class="$style.userAgreementLabel" for="userAgreement"
              >동의함</label
            >
          </div>
        </div>
      </div>
      <div :class="$style.agreementBox">
        <h3 :class="$style.subTitle">(필수) 조선타자기 서비스 이용 약관</h3>
        <div :class="$style.subDescWrapper">
          <p>조선타자기의 서비스 이용과 관련하여 필요한 사항들을 규정합니다.</p>
          <p :class="$style.subDesc">
            제1조 목적<br />
            본 약관은 조선타자기(이하 "회사"라 합니다)가 제공하는 인터넷
            서비스의 이용과 관련하여 회원의 권리, 의무 및 기타 필요한 사항을
            규정함을 목적으로 합니다.
          </p>
          <p :class="$style.subDesc">
            제2조 (용어의 정의)<br />
            회원 : 회사와 서비스 이용 계약을 체결한 자, 카카오톡 회원가입을 한
            자 아이디 : 카카오톡 ID를 티키앤타카에 부여한 자 비밀번호 : 따로
            수집하지 않습니다.<br />
            닉네임 : 카카오톡 닉네임을 말합니다. 이용 제한 : 회사가 약관에 따라
            회원의 서비스 이용을 제한하는 것을 의미하며,<br />
            일정 기간 서비스 중지, 영구적인 서비스 이용 중지, 서비스 중 일부에
            대한 이용 중지를 포함합니다.<br />
            포인트 : 각 회원에게 부여되는 점수, 서비스의 이용에 따라 증가될 수
            있습니다.
          </p>
        </div>
        <div :class="$style.userAgreementWrapper">
          <div :class="$style.userAgreementCheckboxWrapper">
            <input
              type="checkbox"
              id="serviceNotAgreement"
              :checked="serviceAgreement === null ? false : !serviceAgreement"
              @change="() => (serviceAgreement = false)"
            />
            <label :class="$style.userAgreementLabel" for="serviceNotAgreement"
              >동의하지 않음</label
            >
          </div>
          <div :class="$style.userAgreementCheckboxWrapper">
            <input
              type="checkbox"
              id="serviceAgreement"
              :checked="serviceAgreement"
              @change="() => (serviceAgreement = true)"
            />
            <label :class="$style.userAgreementLabel" for="serviceAgreement"
              >동의함</label
            >
          </div>
        </div>
      </div>
    </main>
    <footer :class="$style.footer">
      <button
        :class="$style.confirmBtn"
        type="button"
        @click="moveToSignupPage()"
      >
        확인
      </button>
    </footer>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userAgreement = ref(null);
const serviceAgreement = ref(null);

const allAgreement = computed(
  () => userAgreement.value && serviceAgreement.value
);

const updateAllCheck = ({ target }) => {
  if (target.checked) {
    userAgreement.value = true;
    serviceAgreement.value = true;
  } else {
    userAgreement.value = null;
    serviceAgreement.value = null;
  }
};

const moveToSignupPage = () => {
  if (userAgreement.value && serviceAgreement.value) router.push("/signup");
};
</script>

<style src="./Contents.css" module></style>
