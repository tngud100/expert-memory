<template>
  <div :class="$style.textBox">
    <span :class="$style.title">카테고리*</span>
    <div :class="$style.inputBox">
      <input
        type="text"
        placeholder="카테고리명"
        :class="$style.inputValue"
        ref="inputCategory"
      />
    </div>
    <div :class="$style.addCategoryBtn" @click="addCategoryBtn">추가</div>
  </div>
  <div :class="$style.listBox">
    <div
      v-for="(item, index) in categoryList"
      :key="index"
      :class="$style.categoryBox"
    >
      <div :class="$style.inputBox" style="border: 0px">
        <input
          type="checkbox"
          @click="clickDefaultBox(index)"
          v-model="item.isDefault"
        />
        <input
          type="text"
          :class="$style.categoryName"
          :value="item.categoryName"
          :style="{
            border: item.isDisabled ? 'none' : '1px solid #7e7e7e',
          }"
          :readonly="item.isDisabled"
          @mouseover="$style.textDecoration = 'underline'"
          @change="item.categoryName = $event.target.value"
          @click="item.isDisabled ? emitCategoryItem(index) : null"
        />
      </div>
      <div :class="$style.buttonBox">
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
import { useModalStore } from "@/store/useModalStore";
import { computed, ref, watch, defineEmits, defineProps, onMounted } from "vue";
import { postProductAPI } from "@/api/ProductPostDataAPI.js";
import { getProductAPI } from "@/api/ProductGetDataAPI.js";
import { putProductAPI } from "@/api/ProductPutDataAPI.js";
import { deleteProductAPI } from "@/api/ProductDeleteDataAPI.js";

const modalStore = useModalStore();

const categoryListIdx = ref(null);
const isOpenVerifyModal = computed(() => modalStore.isOpenVerifyModal);
const emit = defineEmits(["commentCode", "categoryItem"]);
const verifyModalCode = ref(null);

const { enrollProductCategory } = postProductAPI();
const { getProductCategoryList } = getProductAPI();
const { setCategoryDefault, updateProductCategory } = putProductAPI();
const { deleteProductCategory } = deleteProductAPI();

const props = defineProps({
  defaultState: Boolean,
  page: Number,
  cardProductId: Number,
  productName: String,
});

const inputCategory = ref(null);

const categoryList = ref([]);

const addCategoryBtn = () => {
  verifyModalCode.value = 5;
  modalStore.setOpenVerifyModal(true);
  emit("commentCode", verifyModalCode.value);
};

const addCategory = () => {
  const categoryName = inputCategory.value;

  if (categoryName.value === "") {
    alert("카테고리명을 입력해주세요");
    return;
  }
  for (let i = 0; i < categoryList.value.length; i++) {
    if (categoryList.value[i].categoryName === categoryName.value) {
      alert("중복된 카테고리 이름은 사용이 불가합니다.");
      return;
    }
  }

  if (categoryList.value.length >= 10) {
    alert("카테고리는 10개까지만 추가 가능합니다.");
    return;
  }

  if (categoryList.value.length === 0) {
    categoryList.value.push({
      productName: props.productName,
      productId: props.cardProductId,
      categoryName: categoryName.value,
      isDefault: true,
      isDisabled: true,
      isClicked: false,
    });
    inputCategory.value.value = "";
    enrollCategory(
      props.cardProductId,
      categoryList.value[categoryList.value.length - 1].categoryName,
      categoryList.value[categoryList.value.length - 1].isDefault
    );
    return;
  }

  if (categoryName) {
    categoryList.value.push({
      productName: props.productName,
      categoryName: categoryName.value,
      isDefault: false,
      isDisabled: true,
      isClicked: false,
    });
    inputCategory.value.value = "";
    enrollCategory(
      props.cardProductId,
      categoryList.value[categoryList.value.length - 1].categoryName,
      categoryList.value[categoryList.value.length - 1].isDefault
    );
  }
};

const clickDefaultBox = (index) => {
  verifyModalCode.value = 6;
  openVerifyModal(index, verifyModalCode.value);
};
// 카테고리 설정 부분 하기
const setDefaultState = async (index) => {
  const data = await setCategoryDefault(
    props.cardProductId,
    categoryList.value[index].productCategoryId
  );
  if (data === false) {
    categoryList.value[index].isDefault = !categoryList.value[index].isDefault;
  }
};

const clickModifyBtn = (index) => {
  // console.log(categoryList.value[index].isDisabled);
  if (!categoryList.value[index].isDisabled) {
    verifyModalCode.value = 7;
    openVerifyModal(index, verifyModalCode.value);
  } else {
    categoryList.value[index].isDisabled =
      !categoryList.value[index].isDisabled;
  }
};

const clickDeleteBtn = (index) => {
  verifyModalCode.value = 8;
  openVerifyModal(index, verifyModalCode.value);
};

const setCategoryName = (index, changeStr) => {
  if (changeStr === "") {
    alert("카테고리명을 입력해주세요");
    return;
  }

  for (let i = 0; i < categoryList.value.length; i++) {
    if (changeStr === categoryList.value[i].categoryName && i !== index) {
      alert("중복된 카테고리 이름은 사용이 불가합니다.");
      return;
    }
  }

  categoryList.value[index].isDisabled = !categoryList.value[index].isDisabled;

  const updatedCategory = {
    ...categoryList.value[index],
    categoryName: changeStr,
  };

  updateProductCategory(
    props.cardProductId,
    categoryList.value[index].productCategoryId,
    updatedCategory.categoryName
  );

  categoryList.value.splice(index, 1, updatedCategory);
  categoryList.value = [...categoryList.value];
};

const deleteCategory = async (index) => {
  console.log(categoryList);
  const deleteConfirm = await deleteProductCategory(
    categoryList.value[index].productCategoryId,
    categoryList.value[index].productId
  );
  if (deleteConfirm) {
    categoryList.value.splice(index, 1);
  }
  console.log(categoryList);
};

const openVerifyModal = (index, commentCode) => {
  modalStore.setOpenVerifyModal(true);
  emit("commentCode", commentCode);
  categoryListIdx.value = index;
};

const emitCategoryItem = (index) => {
  categoryList.value[index].isClicked = true;
  emit("categoryItem", categoryList.value[index]);
};

watch(isOpenVerifyModal, (newValue) => {
  if (newValue === true) {
    return;
  }
  if (props.page !== 2) {
    return;
  }

  if (verifyModalCode.value === 5 && props.defaultState) {
    addCategory();
  }

  if (verifyModalCode.value === 6 && props.defaultState) {
    setDefaultState(categoryListIdx.value);
  } else if (verifyModalCode.value === 6 && !props.defaultState) {
    // 모달을 띄우고 취소를 누를시 체크박스가 원래대로 돌아가게
    categoryList.value[categoryListIdx.value].isDefault =
      !categoryList.value[categoryListIdx.value].isDefault;
  }

  if (verifyModalCode.value === 7 && props.defaultState) {
    setCategoryName(
      categoryListIdx.value,
      categoryList.value[categoryListIdx.value].categoryName
    );
  }
  if (verifyModalCode.value === 8 && props.defaultState) {
    deleteCategory(categoryListIdx.value);
  }
});

const enrollCategory = async (product_id, category_name, category_state) => {
  await enrollProductCategory(product_id, category_name, category_state);
  await getCategoryList(props.cardProductId);
};

const getCategoryList = async (cardProductId) => {
  const data = await getProductCategoryList(cardProductId);

  categoryList.value = data;
  categoryList.value = categoryList.value.map((item) => {
    return {
      ...item,
      isDisabled: true,
      isClicked: false,
    };
  });
};

watch(
  () => props.page,
  (newValue) => {
    if (newValue !== 2) {
      return;
    }
    console.log(props.cardProductId);
    getCategoryList(props.cardProductId);
  },
  { immediate: true }
);
</script>

<style src="@/assets/css/modal/EnrollCategory.css" module></style>
