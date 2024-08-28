import { defineStore } from "pinia";
import { ref, onMounted } from "vue";

export const useMobileSizeStore = defineStore("mobile", () => {
    const isMobile = ref(false);

    const checkMobileSize = () => {
        isMobile.value = window.innerWidth < 768;
    };

    onMounted(() => {
        checkMobileSize();
        // window.addEventListener("resize", checkMobileSize);
    });

    return { isMobile, checkMobileSize };
});