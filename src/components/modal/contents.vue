<template>
  <section :class="$style.modal">
    <div :class="$style.background" @click="closeBtn"></div>
    <div :class="$style.modalBox" @click.stop="">
      <div :class="$style.header">
        <span :class="$style.title">{{ item.title }}</span>
        <IconClose :class="$style.closeBtn" @click="closeBtn"></IconClose>
      </div>

      <div v-if="item.modalNum != 2" :class="$style.contents" ref="contentEl">
        <div :class="$style.productEl" ref="productEl">
          <EnrollProduct
            @productItem="setProductItem"
            @commentCode="setCommentCode"
            @nextModal="nextModal"
            :defaultState="modalItem.defaultState"
            :page="page"
            :cardItem="item.modalNum == 1 ? props.cardItem : null"
          />
        </div>
        <div :class="$style.categoryEl" ref="categoryEl">
          <EnrollCategory
            :defaultState="modalItem.defaultState"
            :productName="productItem.productName"
            :page="page"
            @categoryItem="setCategoryItem"
            @commentCode="setCommentCode"
            :cardProductId="
              item.modalNum == 1
                ? props.cardItem.productId
                : productItem.productId
            "
          />
        </div>
        <div :class="$style.detailEl" ref="detailEl">
          <EnrollDetail
            :categoryItem="categoryItem"
            :page="page"
            :defaultState="modalItem.defaultState"
            @commentCode="setCommentCode"
            :cardProductId="
              item.modalNum == 1 ? props.cardItem.productId : null
            "
          />
        </div>
      </div>
      <div v-if="item.modalNum === 2" :class="$style.mainEnrollModal">
        <EnrollMain
          @commentCode="setCommentCode"
          :defaultState="modalItem.defaultState"
        />
      </div>

      <div v-if="item.modalNum != 2" :class="$style.footer">
        <button v-show="page > 1" :class="$style.nextBtn" @click="prevModal">
          이전
        </button>
        <button v-show="page < 2" :class="$style.nextBtn" @click="nextModal">
          다음
        </button>
      </div>

      <CheckModal
        v-if="isOpenVerifyModal"
        @isVerifyState="setDefaultState"
        :commentCode="modalItem.commentCode"
      />
    </div>
  </section>
</template>

<script setup>
import IconClose from "#/icons/IconClose.vue";
import EnrollProduct from "#/modal/EnrollProduct.vue";
import EnrollCategory from "#/modal/EnrollCategory.vue";
import EnrollDetail from "#/modal/EnrollProductDetail.vue";
import EnrollMain from "#/modal/EnrollProductMain.vue";
import CheckModal from "#/modal/CheckModal.vue";
import { animateSlide } from "@/utils/anime.js";
import { computed, ref, useCssModule, watch } from "vue";

import { useModalStore } from "@/store/useModalStore";

const style = useCssModule();
const modalStore = useModalStore();

const productEl = ref(null);
const categoryEl = ref(null);
const detailEl = ref(null);

const contentEl = ref(null);

let page = ref(1);

const isOpenVerifyModal = computed(() => modalStore.isOpenVerifyModal);

const emit = defineEmits(["close"]);

const modalItem = ref({
  defaultState: null,
  commentCode: null,
});

const productItem = ref({
  productName: null,
  productId: null,
  isFilled: false,
});

const categoryItem = ref({
  productId: null,
  productCategoryId: null,
  isDefault: false,
});

const props = defineProps({
  item: Object,
  cardItem: Object,
});

const setCategoryItem = (item) => {
  categoryItem.value.productId = item.productId;
  categoryItem.value.productCategoryId = item.productCategoryId;
  categoryItem.value.isDefault = item.isDefault;
  nextModal();
};

const setDefaultState = (isVerifyState) => {
  modalItem.value.defaultState = isVerifyState;
};

const setCommentCode = (commentCode) => {
  modalItem.value.commentCode = commentCode;
};

const setProductItem = (ProductItem) => {
  productItem.value.productName = ProductItem.productName;
  productItem.value.productId = ProductItem.productId;
  productItem.value.isFilled = ProductItem.isFilled;
};

const closeBtn = () => {
  emit("close", true);
  props.cardItem = null;
};

const nextModal = () => {
  if (props.cardItem) {
    animateSlide(style.productEl, contentEl, 1, page.value);
    animateSlide(style.categoryEl, contentEl, 1, page.value);
    animateSlide(style.detailEl, contentEl, 1, page.value);
    page.value++;
    return;
  }
  if (productItem.value.isFilled === false) {
    alert("상품을 등록해주세요");
    return;
  }
  if (page.value >= 3) {
    return;
  }
  animateSlide(style.productEl, contentEl, 1, page.value);
  animateSlide(style.categoryEl, contentEl, 1, page.value);
  animateSlide(style.detailEl, contentEl, 1, page.value);
  page.value++;
};
const prevModal = () => {
  if (page.value <= 1) {
    return;
  }
  animateSlide(style.productEl, contentEl, -1, page.value);
  animateSlide(style.categoryEl, contentEl, -1, page.value);
  animateSlide(style.detailEl, contentEl, -1, page.value);
  page.value--;
};
</script>

<style src="@/assets/css/modal/Contents.css" module></style>