<template>
  <header :class="$style.header">
    <div :class="$style.sites">
      <button type="button" :class="$style.siteBtn">
        <IconInstagram />
      </button>
      <button type="button" :class="$style.siteBtn">
        <IconDiscord />
      </button>
      <button type="button" :class="$style.siteBtn">
        <IconNaver />
      </button>
      <button type="button" :class="$style.siteBtn">
        <IconYoutube />
      </button>
    </div>
    <h1 :class="$style.title">
      <router-link to="/" :class="$style.titleLink">
        <IconNewLogo />
      </router-link>
    </h1>
    <div :class="$style.etc">
      <div :class="[$style.searchWrapper, isShowingSearchBoard]">
        <input
          type="text"
          :class="$style.search"
          v-show="isSearch"
          ref="searchRef"
        />
        <button type="button" :class="$style.searchBtn" @click="toggleIsSearch">
          <IconSearch />
        </button>
      </div>
      <button type="button">
        <router-link to="/basket">
          <IconBasket />
        </router-link>
      </button>
      <button type="button" @click="gotoMypage">
        <IconMyPage />
      </button>
      <button v-if="isLogin" type="button" @click="logoutTokenClear">
        <IconLogout />
      </button>
      <Language />
    </div>
  </header>
</template>

<script setup>
import { computed, ref, useCssModule } from "vue";
import Language from "#/common/Language.vue";
import IconInstagram from "#/icons/IconInstagram.vue";
import IconDiscord from "#/icons/IconDiscord.vue";
import IconNaver from "#/icons/IconNaver.vue";
import IconYoutube from "#/icons/IconYoutube.vue";
import IconNewLogo from "#/icons/IconNewLogo.vue";
import IconSearch from "#/icons/IconSearch.vue";
import IconMyPage from "#/icons/IconMyPage.vue";
import IconLogout from "#/icons/IconLogout.vue";
import IconBasket from "#/icons/IconBasket.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/useAuthStore.js";
import { AuthAPI } from "@/api/AuthAPI.js";

const isSearch = ref(false);
const searchRef = ref(null);
const style = useCssModule();
const router = useRouter();
const authStore = useAuthStore();
const { logout } = AuthAPI();

const isLogin = computed(() => !!JSON.parse(authStore.token));

const isShowingSearchBoard = computed(
  () => isSearch.value && style.searchWrapperBorder
);

const toggleIsSearch = () => {
  let timer;

  isSearch.value = !isSearch.value;

  if (isSearch.value) {
    timer = setTimeout(() => {
      searchRef.value.focus();
      clearTimeout(timer);
    }, 0);
  }
};

const gotoMypage = () => {
  router.push(isLogin.value ? "/mypage" : "/login");
};

const logoutTokenClear = async () => {
  const token = JSON.parse(authStore.token);

  const data = await logout(token.authorization, token.refreshToken);
  if (data === true) {
    authStore.clearToken();
    isLogin.value = null;
    router.push("/login");
  }
};
</script>

<style src="@/assets/css/layouts/Header.css" module></style>
