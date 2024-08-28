<template>
  <div :class="$style.container">
    <div
      v-for="(item, index) in productList"
      :key="index"
      :class="$style.productCard"
      @click="enrollProductMainPic(item.productId)"
    >
      <div :class="$style.imgBox">
        <img :src="item.representImg" alt="대표사진" :class="$style.img" />
      </div>
      <div :class="$style.product">
        <div :class="$style.productName">
          {{ item.name }}
        </div>
      </div>
      <div :class="$style.product">
        <div :class="$style.cardTitle">상세 상품 수</div>
        <div :class="$style.cardContent">{{ item.detailList.length }}개</div>
      </div>
      <div :class="$style.product">
        <div :class="$style.cardTitle">상품 가격</div>
        <div :class="$style.cardContent">{{ item.amount }}원</div>
      </div>
      <div :class="$style.product">
        <div :class="$style.cardTitle">상품 종류</div>
        <div :class="$style.cardContent">
          {{ item.type }}
        </div>
      </div>
      <div :class="$style.product">
        <div :class="$style.cardTitle">상품 등록일</div>
        <div :class="$style.cardContent">
          {{ item.createDate }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getProductAPI } from "@/api/ProductGetDataAPI.js";
import { putProductAPI } from "@/api/ProductPutDataAPI.js";
import { useModalStore } from "@/store/useModalStore";
import { computed, ref, watch } from "vue";

const { getProductList } = getProductAPI();
const { setProductMain } = putProductAPI();
const modalstore = useModalStore();

const emit = defineEmits(["commentCode"]);

const productList = ref([]);
const isOpenVerifyModal = computed(() => modalstore.isOpenVerifyModal);
const verifyModalCode = ref(null);

const selectedProductId = ref(null);

const props = defineProps({
  defaultState: Boolean,
});

const enrollProductMainPic = (product_id) => {
  selectedProductId.value = product_id;
  verifyModalCode.value = 3;
  openVerifyModal(verifyModalCode.value);
};

const openVerifyModal = (verifyModalCode) => {
  modalstore.setOpenVerifyModal(true);
  emit("commentCode", verifyModalCode);
};

const fetchProductList = async () => {
  const data = await getProductList(); // api.js의 getProductList 함수 호출
  for (var i = 0; i < data.value.length; i++) {
    if (data.value[i].mainPicState === 0) {
      productList.value.push(data.value[i]);
    }
  }
};

// product_id에 해당하는 상품을 메인 상품으로 설정 (구해야함)
const setProductMainState = async (product_id) => {
  await setProductMain(product_id);
  productList.value = [];
  await fetchProductList();
};

fetchProductList();

watch(isOpenVerifyModal, (newValue) => {
  if (newValue) {
    return;
  }
  if (verifyModalCode.value === 3 && props.defaultState) {
    console.log(verifyModalCode.value);
    setProductMainState(selectedProductId.value);
  }
});
</script>

<style src="@/assets/css/modal/EnrollProductMain.css" module>
</style>