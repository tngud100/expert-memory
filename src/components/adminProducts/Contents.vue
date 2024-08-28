<template>
  <div :class="$style.container">
    <span :class="$style.title">상품</span>
    <ul :class="$style.nav">
      <li
        :class="[navState === 0 ? $style.selected : '']"
        @click="selectIndex(0)"
      >
        상품 등록 및 수정
      </li>
      <li
        :class="[navState === 1 ? $style.selected : '']"
        @click="selectIndex(1)"
      >
        상품 화보 등록
      </li>
    </ul>
    <div :class="$style.wrapper" v-if="navState === 1">
      <Card
        v-for="(item, index) in productList.value"
        :key="index"
        :item="item"
        :class="$style.productList"
        @clickModifyBtn="cardModifyBtn"
        @clickDeleteBtn="cardDeleteBtn"
      />
      <button
        :class="$style.addBtn"
        @mouseover="handleHover(true)"
        @mouseleave="handleHover(false)"
        @click="addProduct"
      >
        <IconPlus v-if="iconHover" :class="$style.addBtnImg" />
        <IconPlusDisabled v-else :class="$style.addBtnImg" />
      </button>
    </div>

    <div :class="$style.wrapper" v-if="navState === 0">
      <MainPicCard
        :navState="navState"
        :modalState="modalState"
        :defaultState="defaultState"
        :commentCode="commentCode"
        :openCheckStateByMainCheck="openCheckStateByMainCheck"
        @openModal="addMainPic"
        @openCheckCommentNum="openChekcModalByMainPic"
        @setOpenCheckState="setOpenCheckState"
      />
    </div>

    <modal
      v-if="modalState"
      :item="item[modalNum]"
      @close="closeModal"
      :cardItem="cardItem"
    />
    <div v-if="isOpenVerifyModal && !modalState" :class="$style.CheckModal">
      <CheckModal
        :commentCode="commentCode"
        @isVerifyState="setDefaultState"
        :key="commentCode"
      />
    </div>
  </div>
</template>

<script setup>
import Card from "@/components/adminProducts/Cards.vue";
import MainPicCard from "@/components/adminProducts/MainPicCards.vue";
import IconPlus from "#/icons/IconPlus.vue";
import IconPlusDisabled from "#/icons/IconPlusDisabled.vue";
import modal from "#/modal/Contents.vue";
import CheckModal from "#/modal/CheckModal.vue";
import { getProductAPI } from "@/api/ProductGetDataAPI.js";
import { deleteProductAPI } from "@/api/ProductDeleteDataAPI.js";
import { computed, ref, watch } from "vue";
import { useModalStore } from "@/store/useModalStore";

const navState = ref(0);
const iconHover = ref(false);

const modalState = ref(false);

const modalStore = useModalStore();

const isOpenVerifyModal = computed(() => modalStore.isOpenVerifyModal);
const commentCode = ref(null);
const defaultState = ref(null);
const cardProductId = ref(null);

const { getProductList } = getProductAPI();
const { deleteProduct } = deleteProductAPI();

const modalNum = ref(null);

const item = [
  {
    title: "상품등록",
    modalNum: 0,
  },
  {
    title: "상품수정",
    modalNum: 1,
  },
  {
    title: "화보등록",
    modalNum: 2,
  },
];
const cardItem = ref();

const productList = ref([]);

const openCheckStateByMainCheck = ref(false);

const handleHover = (value) => {
  iconHover.value = value;
};

const selectIndex = (value) => {
  navState.value = value;
};

const addMainPic = () => {
  modalNum.value = 2;
  changeModalState();
};

const addProduct = () => {
  modalNum.value = 0;
  changeModalState();
};

const changeModalState = () => {
  modalState.value = !modalState.value;
  if (cardItem.value) {
    cardItem.value = null;
  }

  if (modalState.value === true) {
    document.body.style.overflow = "hidden";
    return;
  }
  if (modalState.value === false) {
  }
  document.body.style.overflow = "auto";
};

const closeModal = () => {
  cardItem.value = null;
  changeModalState();
  fetchProductList();
};

const cardModifyBtn = (value) => {
  modalNum.value = 1;
  changeModalState();
  cardItem.value = value;
};

const openChekcModalByMainPic = (Code) => {
  commentCode.value = Code;
  openCheckStateByMainCheck.value = true;
  openVerifyModal(commentCode.value);
};

const setOpenCheckState = (boolean) => {
  openCheckStateByMainCheck.value = boolean;
};

const cardDeleteBtn = (cardId) => {
  cardProductId.value = cardId;
  commentCode.value = 2;
  openVerifyModal(commentCode.value);
};

const deleteSelectedProduct = async (productId) => {
  await deleteProduct(productId);
  await fetchProductList();
};

const openVerifyModal = (Code) => {
  commentCode.value = Code;
  modalStore.setOpenVerifyModal(true);
};

const setDefaultState = (boolean) => {
  defaultState.value = boolean;
};

const fetchProductList = async () => {
  const data = await getProductList(); // api.js의 getProductList 함수 호출
  productList.value = data;
};

watch(isOpenVerifyModal, (newValue) => {
  if (newValue === true) {
    return;
  }

  if (commentCode.value === 2 && defaultState.value) {
    deleteSelectedProduct(cardProductId.value);
    commentCode.value = null;
    cardProductId.value = null;
  }
});

fetchProductList();
</script>

<style src="@/assets/css/adminProducts/Contents.css" module></style>
