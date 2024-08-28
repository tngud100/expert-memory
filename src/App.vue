<script setup>
// import Header from "@/layouts/Header.vue";
// import Nav from "@/layouts/Nav.vue";
// import Footer from "@/layouts/Footer.vue";
import Header from "@/layouts/RenewalHeader.vue";
import Footer from "@/layouts/RenewalFooter.vue";
import MobileHeader from "@/layouts/RenewalMobileHeader.vue";
import MobileFooter from "@/layouts/RenewalMobileFooter.vue";
import RenewalMobileMenu from "@/layouts/RenewalMobileMenu.vue";
// import Menu from "@/layouts/Menu.vue";
import AdminHeader from "@/layouts/AdminHeader.vue";
import AdminSideBar from "@/layouts/AdminSideBar.vue";

import { useMenuStore } from "@/store/useMenuStore";
import { useAdminStore } from "@/store/useAdminPageStore";
import { useMobileSizeStore } from "@/store/useMobileSizeStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const { isShowingMenuByRoute } = storeToRefs(useMenuStore());
const { isAdminPageRouter, isAdminLoginPage } = storeToRefs(useAdminStore());

const mobileSizeStore = useMobileSizeStore();
mobileSizeStore.checkMobileSize();
const { isMobile } = storeToRefs(mobileSizeStore);

const isClickMenu = ref(false);
const isClickedMenu = (value) => {
  isClickMenu.value = value;
};
const gotoLink = () => {
  isClickMenu.value = false;
};
</script>

<template>
  <div v-if="isAdminPageRouter" class="adminLayout">
    <!-- 어드민 버전 -->
    <AdminHeader v-if="isAdminLoginPage" />
    <div class="headerContent" v-if="isAdminLoginPage">
      <AdminSideBar v-if="isAdminLoginPage" class="sideBar" />
      <router-view />
    </div>
    <router-view v-if="!isAdminLoginPage" />
  </div>
  <!-- <Nav /> -->
  <!-- <Menu v-if="isShowingMenuByRoute" /> -->
  <div v-else>
    <!-- PC버전 -->
    <div v-if="!isMobile">
      <Header />
      <section class="contents">
        <router-view />
      </section>
      <Footer />
    </div>
    <!-- 모바일버전 -->
    <div v-else>
      <MobileHeader @isClickMenu="isClickedMenu" :isClickedMenu="isClickMenu" />
      <RenewalMobileMenu v-if="isClickMenu" @gotoLink="gotoLink" />
      <section class="mobileContents">
        <router-view />
      </section>
      <MobileFooter :isClickMenu="isClickMenu" />
    </div>
  </div>
</template>

<style>
body {
  /* overflow-x: scroll; */
}
</style>
<style scoped>
.mobileContents {
  padding-top: 64px;
}
.contents {
  padding-top: 90px;
}
.adminLayout {
}
.headerContent {
  display: flex;
}
</style>
