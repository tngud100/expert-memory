import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

export const useAdminStore = defineStore("Admin", () => {
    const route = useRoute();

    const adminMainIndex = ref(0);
    const adminProductIndex = ref(0);
    const adminBoardIndex = ref(0);

    const isAdminPageRouter = computed(() => {
        return route.path.startsWith("/admin");
    });

    const isAdminLoginPage = computed(() => {
        if (route.path.toLowerCase() === "/admin/login") {
            return false;
        } else {
            return true;
        }
    });

    const adminSideBarIndex = computed(() => {
        if (route.path.toLowerCase() === "/admin/main") {
            return 0;
        }else if (route.path.toLowerCase() === "/admin/products") {
            return 1;
        }else if (route.path.toLowerCase() === "/admin/board") {
            return 2;
        }else {
            return 0;
        }
    })

    const setAdminMainIndex = (index) => {
        adminMainIndex.value = index;
    }
    const setAdminProductIndex = (index) => {
        adminProductIndex.value = index;
    }
    const setAdminBoardIndex = (index) => {
        adminBoardIndex.value = index;
    }

    return {
        isAdminPageRouter,
        isAdminLoginPage,
        adminSideBarIndex,
        adminMainIndex,
        adminProductIndex,
        adminBoardIndex,
        setAdminMainIndex,
        setAdminProductIndex,
        setAdminBoardIndex,
    };
});

export default useAdminStore; 