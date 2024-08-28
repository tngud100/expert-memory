import { defineStore } from "pinia";
import { computed, onMounted, watch, nextTick, ref } from "vue";
import { useRoute } from "vue-router";
import { compileScript } from "vue/compiler-sfc";


export const useMenuStore = defineStore("menu", () => {
  const isShowingMenu = ref(false);
  const route = useRoute();

  const isShowingMenuByRoute = computed(() => {
    if (route.path === "/login") {
      isShowingMenu.value = false;
    } else {
      isShowingMenu.value = true;
    }

    return isShowingMenu.value;
  });

  return { isShowingMenu, isShowingMenuByRoute };
});

export const useTopStore = defineStore("Top", () => {
  const isShowingTopBtn = ref(false);
  const route = useRoute();

  const checkScrollbarVisibility = () => {
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );

    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;

    isShowingTopBtn.value = documentHeight > viewportHeight;
  };

  onMounted(() => {
    nextTick(() => {
      checkScrollbarVisibility();
    });
    window.addEventListener("resize", checkScrollbarVisibility);
  });

  watch(
    () => route.path,
    () => {
      nextTick(() => {
        checkScrollbarVisibility();
      });
    }
  );

  const shouldShowOnMainPage = computed(() => route.path === "/");

  const shouldShowTopBtn = computed(
    () => shouldShowOnMainPage.value || isShowingTopBtn.value
  );

  return { shouldShowTopBtn };
});
