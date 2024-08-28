<template>
  <div :class="$style.container">
    <div :class="$style.textArea">
      <div :class="$style.textBox">
        <span :class="$style.title">상세 상품명*</span>
        <div :class="$style.inputBox">
          <input
            type="text"
            placeholder="상세 상품명을 입력하세요."
            :class="$style.inputValue"
            ref="productName"
          />
        </div>
      </div>
      <div :class="$style.textBox">
        <span :class="$style.title">상세 상품 가격*</span>
        <div :class="$style.inputBox">
          <input
            type="text"
            placeholder="상세 상품 가격을 입력하세요."
            :class="$style.inputValue"
            ref="productPrice"
          />
        </div>
      </div>
      <div :class="$style.textBox">
        <span :class="$style.title">상세 상품 재고*</span>
        <div :class="$style.inputBox">
          <input
            type="text"
            placeholder="상세 상품 재고를 입력하세요."
            :class="$style.inputValue"
            ref="productStock"
          />
        </div>
      </div>
    </div>
    <div :class="$style.addCategoryBtn" @click="clickAddBtn">추가</div>
  </div>
  <div :class="$style.listBox">
    <div :class="$style.productBox">
      <div :class="$style.listCard">
        <div :class="$style.titleBox">
          <span :class="$style.productName">상품명</span>
          <span :class="$style.productPrice">가격</span>
          <span :class="$style.productStock">재고</span>
        </div>
      </div>
      <div :class="$style.buttonBox">
        <span class="">기본값</span>
      </div>
    </div>
    <div
      v-for="(item, index) in productDetailList"
      :key="index"
      :class="$style.productBox"
    >
      <div :class="$style.listCard" style="border: 0px">
        <input
          type="text"
          :class="$style.productName"
          :value="item.productName"
          :disabled="item.isDisabled"
          :style="{
            border: item.isDisabled ? 'none' : '1px solid #7e7e7e',
          }"
          @change="item.productName = $event.target.value"
        />
        <input
          type="text"
          :class="$style.productPrice"
          :value="item.productPrice"
          :disabled="item.isDisabled"
          :style="{
            border: item.isDisabled ? 'none' : '1px solid #7e7e7e',
          }"
          @change="item.productPrice = $event.target.value"
        />
        <input
          type="text"
          :class="$style.productStock"
          :value="item.productStock"
          :disabled="item.isDisabled"
          :style="{
            border: item.isDisabled ? 'none' : '1px solid #7e7e7e',
          }"
          @change="item.productStock = $event.target.value"
        />
      </div>

      <div :class="$style.buttonBox">
        <input
          v-if="item.isDisabled"
          type="checkbox"
          :checked="item.isDefault"
          @change="setDefaultValue(index)"
          disabled
        />
        <button :class="$style.editBtn" @click="clickDefaultBtn(index)">
          {{ item.isDisabled ? "기본값" : "" }}
        </button>

        &nbsp;{{ item.isDisabled ? "|" : "" }}&nbsp;
        <button :class="$style.editBtn" @click="clickModifyBtn(index)">
          {{ item.isDisabled ? "수정" : "확인" }}
        </button>

        &nbsp;{{ item.isDisabled ? "|" : "" }}&nbsp;
        <button :class="$style.editBtn" @click="clickDeleteBtn(index)">
          {{ item.isDisabled ? "삭제" : "" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from "vue";
import { useModalStore } from "@/store/useModalStore";
import { getProductAPI } from "@/api/ProductGetDataAPI.js";
import { postProductAPI } from "@/api/ProductPostDataAPI.js";
import { putProductAPI } from "@/api/ProductPutDataAPI.js";
import { deleteProductAPI } from "@/api/ProductDeleteDataAPI.js";

const store = useModalStore();
const { getProductDetailListForEnroll } = getProductAPI();
const { enrollProductDetail } = postProductAPI();
const { updateProductDetail, setProductDetailDefault } = putProductAPI();
const { deleteProductDetail } = deleteProductAPI();

const productDetailList = ref([
  // {
  //   productName: "asd",
  //   productPrice: "1",
  //   productStock: "2",
  //   isDisabled: true,
  //   isDefault: true,
  // },
  // {
  //   productName: "vcc",
  //   productPrice: "12",
  //   productStock: "123",
  //   isDisabled: true,
  //   isDefault: false,
  // },
]);
const emit = defineEmits(["commentCode"]);

const props = defineProps({
  defaultState: Boolean,
  categoryItem: {
    productId: String,
    productCategoryId: String,
    isDefault: Boolean,
  },
  page: Number,
  cardProductId: Number,
});

const productName = ref(null);
const productPrice = ref(null);
const productStock = ref(null);

const productIdx = ref(null);

const verifyModalCode = ref(null);

const addProduct = async () => {
  let isDefault = false;
  if (
    productName.value.value === "" ||
    productPrice.value.value === "" ||
    productStock.value.value === ""
  ) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  if (productDetailList.value.length === 0) {
    isDefault = true;
    productIdx.value = 0;
  }

  productDetailList.value.push({
    productName: productName.value.value,
    productPrice: productPrice.value.value,
    productStock: productStock.value.value,
    isDisabled: true, // 수정 상태인지 확인하기 위한 상태
    isDefault: isDefault, // 기본값인지 확인하기 위한 상태
  });

  let formData = new FormData();
  formData.append("product_id", props.categoryItem.productId);
  formData.append("product_category_id", props.categoryItem.productCategoryId);
  formData.append(
    "name",
    productDetailList.value[productDetailList.value.length - 1].productName
  );
  formData.append(
    "amount",
    productDetailList.value[productDetailList.value.length - 1].productPrice
  );
  formData.append(
    "stock",
    productDetailList.value[productDetailList.value.length - 1].productStock
  );
  formData.append(
    "default_state",
    productDetailList.value[productDetailList.value.length - 1].isDefault
      ? 1
      : 0
  );
  await enrollProductDetail(formData);
  await getProductDetailList();

  // 입력 필드 초기화
  productName.value.value = "";
  productPrice.value.value = "";
  productStock.value.value = "";
};
const clickAddBtn = () => {
  verifyModalCode.value = 9;
  store.setOpenVerifyModal(true);
  emit("commentCode", verifyModalCode);
};

const updateProduct = async (index) => {
  toggleEdit(index);
  const updateDetailList = productDetailList.value[index];
  // { productName, productPrice, productStock } = updateDetailList;
  const productName = updateDetailList.productName;
  let productPrice = updateDetailList.productPrice;
  let productStock = updateDetailList.productStock;

  let formData = new FormData();
  formData.append("name", productName);
  formData.append("amount", productPrice);
  formData.append("stock", productStock);

  await updateProductDetail(formData, updateDetailList.productDetailId);
  await getProductDetailList();
};

const clickModifyBtn = (index) => {
  verifyModalCode.value = 11;
  if (productDetailList.value[index].isDisabled) {
    toggleEdit(index);
  } else {
    openVerifyModal(index, verifyModalCode.value);
  }
};
const toggleEdit = (index) => {
  productDetailList.value[index].isDisabled =
    !productDetailList.value[index].isDisabled;
};

const clickDefaultBtn = (index) => {
  verifyModalCode.value = 10;
  if (productDetailList.value[index].isDisabled) {
    openVerifyModal(index, verifyModalCode.value);
  }
};
const setDefaultValue = async (index, isDefault) => {
  await setProductDetailDefault(
    props.categoryItem.productId,
    productDetailList.value[index].productDetailId
  );
  await getProductDetailList();
};

const openVerifyModal = (index, verifyModalCode) => {
  store.setOpenVerifyModal(true);
  emit("commentCode", verifyModalCode);
  productIdx.value = index;
};

const clickDeleteBtn = (index) => {
  verifyModalCode.value = 12;
  openVerifyModal(index, verifyModalCode.value);
};

const deleteProduct = async (index) => {
  const deleteConfirm = await deleteProductDetail(
    productDetailList.value[index].productDetailId
  );
  console.log(deleteConfirm);
  if (deleteConfirm) {
    productDetailList.value.splice(index, 1);
  }
};

watch(
  () => store.isOpenVerifyModal,
  (newValue) => {
    if (newValue) {
      return;
    }
    if (props.page !== 3) {
      return;
    }
    if (verifyModalCode.value === 9 && props.defaultState) {
      addProduct();
    }
    if (verifyModalCode.value === 10 && props.defaultState) {
      setDefaultValue(productIdx.value, props.defaultState);
    } else if (verifyModalCode.value === 11 && props.defaultState) {
      updateProduct(productIdx.value);
    } else if (verifyModalCode.value === 12 && props.defaultState) {
      deleteProduct(productIdx.value);
    }
  }
);

watch(
  () => props.page,
  (newValue) => {
    if (newValue !== 3) {
      return;
    }
    getProductDetailList();
  }
);
const getProductDetailList = async () => {
  const data = await getProductDetailListForEnroll(
    props.categoryItem.productId,
    props.categoryItem.productCategoryId
  );
  productDetailList.value = data;
  productDetailList.value = productDetailList.value.map((item) => {
    return {
      ...item,
      // productPrice: item.productPrice.endsWith("원")
      //   ? item.productPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      //   : item.productPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원",
      // productStock: item.productStock.endsWith("개")
      //   ? item.productStock
      //   : item.productStock + "개",
      isDisabled: true,
    };
  });
};
</script>
<style src="@/assets/css/modal/EnrollProductDetail.css" module></style>
