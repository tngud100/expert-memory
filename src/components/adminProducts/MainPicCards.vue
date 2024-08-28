<template>
  <div :class="$style.cardContainer">
    <div v-for="(item, index) in mainProduct" :key="index" :class="$style.card">
      <div :class="$style.titleCard">
        <div :class="$style.title">
          {{ index + 1 + ". " + item.title }}
        </div>
        <button
          :class="$style.deleteButton"
          @click="deleteMainProductBtn(index)"
        >
          <closeIcon />
        </button>
      </div>
      <div :class="$style.fileCard">
        <div :class="$style.fileBox">
          <input
            :class="$style.uploadInput"
            type="file"
            :id="'uploadButton' + index"
            @change="uploadProductMainPicBtn($event, index)"
          />
          <span v-if="item.mainImgName" :class="$style.fileName">{{
            item.mainImgName
          }}</span>
          <span v-else :class="$style.placeHolder">파일을 선택해 주세요</span>
          <label :for="'uploadButton' + index" :class="$style.uploadButton"
            >선택</label
          >
        </div>
      </div>
    </div>
    <button
      :class="$style.addBtn"
      @mouseover="handleHover(true)"
      @mouseleave="handleHover(false)"
      @click="emit('openModal')"
    >
      <IconPlus v-if="iconHover" :class="$style.addBtnImg" />
      <IconPlusDisabled v-else :class="$style.addBtnImg" />
    </button>
  </div>
</template>

<script setup>
import closeIcon from "#/icons/IconClose.vue";
import IconPlus from "#/icons/IconPlus.vue";
import IconPlusDisabled from "#/icons/IconPlusDisabled.vue";
import { computed, ref, watch, watchEffect } from "vue";
import { getProductAPI } from "@/api/ProductGetDataAPI.js";
import { putProductAPI } from "@/api/ProductPutDataAPI.js";
import { useModalStore } from "@/store/useModalStore";

const { getProductMainList } = getProductAPI();
const { uploadProductMainImg, resetMainPicture } = putProductAPI();

const modalStore = useModalStore();
const isOpenVerifyModal = computed(() => modalStore.isOpenVerifyModal);

const mainProduct = ref([
  // productId: item.product_id,
  // mainPicState: item.main_pic_state,
  // imgPath: item.img_path,
  // title: item.name,
]);

const selectedProductIdx = ref(null);

const emit = defineEmits([
  "openModal",
  "uploadMainPic",
  "openCheckCommentNum",
  "setOpenCheckState",
]);

const iconHover = ref(false);

const props = defineProps({
  navState: Number,
  modalState: Boolean,
  defaultState: Boolean,
  commentCode: Number,
  openCheckStateByMainCheck: Boolean,
});

const handleHover = (value) => {
  iconHover.value = value;
};

const uploadProductMainPicBtn = (event, index) => {
  mainProduct.value[index].mainImgName = event.target.files[0].name;
  mainProduct.value[index].imgFile = event.target.files[0];
  selectedProductIdx.value = index;
  emit("openCheckCommentNum", 4);
};

const deleteMainProductBtn = (index) => {
  selectedProductIdx.value = index;
  emit("openCheckCommentNum", 13);
};

const deleteMainProduct = async (index) => {
  const data = await resetMainPicture(mainProduct.value[index].productId);
  console.log(data);
};

const uploadProductMainPic = async (index) => {
  const formData = new FormData();
  formData.append("main_picture", mainProduct.value[index].imgFile);
  formData.append("product_id", mainProduct.value[index].productId);

  const data = await uploadProductMainImg(formData);
  console.log(data);
};

const getProductMain = async () => {
  if (props.navState === 0) {
    const data = await getProductMainList();
    for (var i = 0; i < data.length; i++) {
      mainProduct.value.push(data[i]);
    }
  }
  console.log(mainProduct.value);
};

watchEffect(() => {
  if (!props.modalState && props.navState === 0) {
    mainProduct.value = [];
    getProductMain();
  }
});

watch(isOpenVerifyModal, async (newValue) => {
  if (newValue) {
    return;
  }

  if (
    props.openCheckStateByMainCheck &&
    props.defaultState &&
    props.commentCode === 13
  ) {
    console.log(props.commentCode, props.openCheckStateByMainCheck);
    await deleteMainProduct(selectedProductIdx.value);
    mainProduct.value = [];
    getProductMain();
    emit("setOpenCheckState", false);
  }
  if (
    props.openCheckStateByMainCheck &&
    props.defaultState &&
    props.commentCode === 4
  ) {
    await uploadProductMainPic(selectedProductIdx.value);
    mainProduct.value = [];
    getProductMain();
    emit("setOpenCheckState", false);
  }
  if (!props.defaultState && props.commentCode === 4) {
    mainProduct.value[selectedProductIdx.value].mainImgName = "";
    mainProduct.value[selectedProductIdx.value].imgFile = "";
    mainProduct.value = [];
    getProductMain();
  }
});
</script>

<style src="@/assets/css/adminProducts/MainPicCards.css" module>
</style>
