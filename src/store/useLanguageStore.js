import { defineStore } from "pinia";
import { ref } from "vue";

export const useLanguageStore = defineStore("language", () => {
  const isLanguage = ref(false);
  const localLanguage = localStorage.getItem("language");

  if (localLanguage === null || localLanguage === "false") {
    isLanguage.value = false;
  } else if (localLanguage === "true") {
    isLanguage.value = true;
  }

  const toggleLanguage = () => {
    isLanguage.value = !isLanguage.value;
    localStorage.setItem("language", isLanguage.value);
  };

  return { isLanguage, toggleLanguage };
});
