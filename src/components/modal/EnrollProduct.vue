<template>
  <div :class="$style.textBox">
    <span :class="$style.optionName">제품명</span>
    <div :class="$style.uploadBox">
      <input
        type="text"
        placeholder="상품명"
        :class="$style.optionValue"
        :value="props.cardItem ? props.cardItem.name : productName.value"
        ref="productName"
      />
    </div>
  </div>
  <div :class="$style.textBox">
    <span :class="$style.optionName">누끼사진</span>
    <div :class="$style.uploadBox">
      <input
        type="file"
        placeholder="사진을 선택하세요."
        :class="$style.optionValue"
        name="productImg"
        id="productImg"
        @change="handleFileUpload($event, 'productImg')"
        style="display: none"
      />
      <div v-if="props.cardItem && !productImgName" :class="$style.optionValue">
        {{ props.cardItem.listImgName }}
      </div>
      <div :class="$style.optionValue">{{ productImgName }}</div>
      <label for="productImg">
        <div :class="$style.chooseImgBtn">선택</div>
      </label>
    </div>
  </div>
  <div :class="$style.textBox">
    <span :class="$style.optionName">배경사진</span>
    <div :class="$style.uploadBox">
      <input
        type="file"
        placeholder="사진을 선택하세요."
        :class="$style.optionValue"
        name="file"
        id="backgroundImg"
        @change="handleFileUpload($event, 'backgroundImg')"
        style="display: none"
      />
      <div
        v-if="props.cardItem && !backgroundImgName"
        :class="$style.optionValue"
      >
        {{ props.cardItem.listBackImgName }}
      </div>
      <div :class="$style.optionValue">{{ backgroundImgName }}</div>
      <label for="backgroundImg">
        <div :class="$style.chooseImgBtn">선택</div>
      </label>
    </div>
  </div>
  <div :class="$style.textBox">
    <span :class="$style.optionName">대표사진</span>
    <div :class="$style.uploadBox">
      <input
        type="file"
        placeholder="사진을 선택하세요."
        :class="$style.optionValue"
        name="representImg"
        id="representImg"
        @change="handleFileUpload($event, 'representImg')"
        style="display: none"
      />
      <div
        v-if="props.cardItem && !representImgName"
        :class="$style.optionValue"
      >
        {{ props.cardItem.representImgName }}
      </div>
      <div :class="$style.optionValue">{{ representImgName }}</div>
      <label for="representImg">
        <div :class="$style.chooseImgBtn">선택</div>
      </label>
    </div>
  </div>

  <div :class="$style.textBox">
    <span :class="$style.optionName">상세설명</span>
    <div :class="$style.uploadList">
      <div :class="$style.listBox">
        <input
          type="file"
          placeholder="describeImgList."
          :class="$style.optionValue"
          id="describeImg"
          ref="describeImg"
          style="display: none"
          multiple
          @change="handleFileUpload($event, 'describeImg')"
        />
        <div :class="$style.optionValue">{{ describeImgName }}</div>
        <label for="describeImg">
          <div :class="$style.chooseImgBtn">선택</div>
        </label>
      </div>

      <div :class="$style.listMenu">
        <div v-if="props.cardItem && describeBlobList.length === 0">
          <div
            v-for="(item, index) in props.cardItem.descImgName"
            :key="index"
            :class="$style.list"
          >
            {{ index + 1 }}. {{ item }}
          </div>
        </div>

        <div
          v-for="(item, index) in describeBlobList"
          :key="item"
          :class="$style.list"
        >
          {{ index + 1 }}. {{ item.name }}
          <IconClose :class="$style.deleteBtn" @click="deleteList(index)" />
        </div>
      </div>
    </div>
  </div>

  <div :class="$style.textBox">
    <span :class="$style.optionName">종류</span>
    <div :class="$style.uploadBox">
      <input
        type="text"
        placeholder="종류 ex) 키보드, 키캡, 등"
        :class="$style.optionValue"
        :value="props.cardItem ? props.cardItem.type : productType.value"
        ref="productType"
      />
    </div>
  </div>
  <div :class="$style.submit">
    <button :class="$style.submitBtn" @click="productBtn">
      {{ props.cardItem ? "상품 수정" : "상품 등록" }}
    </button>
  </div>
</template>

<script setup>
import IconClose from "#/icons/IconClose.vue";
import { useModalStore } from "@/store/useModalStore";
import { computed, ref, watch } from "vue";
import { postProductAPI } from "@/api/ProductPostDataAPI.js";
import { getProductAPI } from "@/api/ProductGetDataAPI.js";
import { putProductAPI } from "@/api/ProductPutDataAPI.js";

const representImg = ref("");
const backgroundImg = ref("");
const productImg = ref("");
const describeImg = ref("");

const representImgName = ref("");
const backgroundImgName = ref("");
const productImgName = ref("");
const describeImgName = ref("");

const describeBlobList = ref([]);

const productName = ref("");
const productType = ref("");

const productItem = ref({
  productName: null,
  productId: null,
  isfilled: false,
});

const { enrollProduct } = postProductAPI();
const { getProductList } = getProductAPI();
const { updateProduct } = putProductAPI();

const modalstore = useModalStore();

const emit = defineEmits(["productItem", "commentCode", "nextModal"]);

const props = defineProps({
  defaultState: Boolean,
  page: Number,
  cardItem: Object,
});

const verifyModalCode = ref(null);
const isOpenVerifyModal = computed(() => modalstore.isOpenVerifyModal);

const handleFileUpload = (event, type) => {
  const selectedFile = event.target.files[0];

  if (type === "productImg") {
    productImg.value = selectedFile;
    productImgName.value = selectedFile.name;
  } else if (type === "backgroundImg") {
    backgroundImg.value = selectedFile;
    backgroundImgName.value = selectedFile.name;
  } else if (type === "representImg") {
    representImg.value = selectedFile;
    representImgName.value = selectedFile.name;
  } else if (type === "describeImg") {
    const selectedFiles = event.target.files;

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      describeBlobList.value.push(file);
    }

    describeImgName.value = selectedFiles[selectedFiles.length - 1].name;
  }
};

const deleteList = (index) => {
  describeBlobList.value.splice(index, 1);
  console.log(describeBlobList.value.length);
  if (describeBlobList.value.length === 0) {
    describeImgName.value = "";
    return;
  }
  describeImgName.value =
    describeBlobList.value[describeBlobList.value.length - 1].name;
};
const enrollbtn = () => {
  if (
    productName.value.value &&
    representImg.value &&
    backgroundImg.value &&
    productImg.value &&
    describeImg.value &&
    productType.value.value &&
    describeBlobList.value.length > 0
  ) {
    verifyModalCode.value = 0;
    openVerifyModal(verifyModalCode.value);
  } else {
    alert("모든 항목을 입력해주세요.");
  }
};

const modifyBtn = () => {
  verifyModalCode.value = 1;
  openVerifyModal(verifyModalCode.value);
};

const modifyForm = async () => {
  let formData = new FormData();
  if (props.cardItem.name !== productName.value) {
    formData.append("name", productName.value.value);
  } else {
    formData.append("name", props.cardItem.name);
  }

  if (props.cardItem.representImgName !== representImgName.value) {
    if (representImg.value) {
      formData.append("represent_picture", representImg.value);
    }
  }
  if (props.cardItem.listBackImgName !== backgroundImgName.value) {
    if (backgroundImg.value) {
      formData.append("list_back_picture", backgroundImg.value);
    }
  }
  if (props.cardItem.listImgName !== productImgName.value) {
    if (productImg.value) {
      formData.append("list_picture", productImg.value);
    }
  }
  if (props.cardItem.descImgName !== describeImgName.value) {
    describeBlobList.value.forEach((item) => {
      formData.append("desc_picture", item);
    });
  }

  if (props.cardItem.type !== productType.value.value) {
    formData.append("product_type", productType.value.value);
  } else {
    formData.append("product_type", props.cardItem.type);
  }
  formData.append("product_id", props.cardItem.productId);
  for (let pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  await updateProduct(formData, props.cardItem.productId);
  const data = await getProductList();
  if (Array.isArray(data.value)) {
    data.value.forEach((item) => {
      if (item.productId === props.cardItem.productId) {
        productName.value.value = item.name;
        productType.value.value = item.type;
      }
    });
  }
};

const productBtn = () => {
  props.cardItem ? modifyBtn() : enrollbtn();
};

const openVerifyModal = (commentCode) => {
  modalstore.setOpenVerifyModal(true);
  emit("commentCode", commentCode);
};

watch(isOpenVerifyModal, (newValue) => {
  if (newValue) {
    return;
  }
  if (props.page !== 1) {
    return;
  }

  if (props.defaultState && verifyModalCode.value === 0) {
    uploadForm();
  }

  if (props.defaultState && verifyModalCode.value === 1) {
    modifyForm();
  }
});

const uploadForm = async () => {
  const productData = ref([]);
  let formData = new FormData();
  formData.append("name", productName.value.value);
  formData.append("represent_picture", representImg.value);
  formData.append("list_back_picture", backgroundImg.value);
  formData.append("list_picture", productImg.value);
  describeBlobList.value.forEach((item) => {
    formData.append("desc_picture", item);
  });
  formData.append("product_type", productType.value.value);

  await enrollProduct(formData);
  productData.value = await getProductList();

  productItem.value.productName = productName.value.value;
  productItem.value.isfilled = true;

  productItem.value.productId =
    productData.value.value[productData.value.value.length - 1].productId;

  console.log(productData.value.value);
  console.log(productData.value.value.length);

  console.log("productItem", productItem.value);
  emit("productItem", productItem.value);
  emit("nextModal");
};
</script>

<style src="@/assets/css/modal/EnrollProduct.css" module></style>