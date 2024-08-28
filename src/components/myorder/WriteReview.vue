<template>
  <SummaryCard :data="cardData" />
  <div :class="$style.titleWrapper">
    <span :class="$style.titleLabel">제목</span>
    <div :class="$style.reviewTitle">
      <input
        type="text"
        placeholder="제목을 입력해주세요."
        @input="updateTitle"
        :value="form.title"
        :class="$style.reviewInput"
      />
    </div>
  </div>
  <TextArea
    :label="'상품 리뷰'"
    :content="form.content"
    :imgFiles="imgFiles"
    @contentChange="updateContent"
    @fileChange="handleFileChange"
  />
  <div :class="$style.btnBox">
    <button :class="$style.btn" type="button" @click="cancel">취소하기</button>
    <button
      v-if="!props.reviewNum"
      :class="$style.btn"
      type="button"
      @click="submit"
    >
      작성하기
    </button>
    <button
      v-if="props.reviewNum"
      :class="$style.btn"
      type="button"
      @click="modify"
    >
      수정하기
    </button>
  </div>
</template>

<script setup>
import TextArea from "#/common/TextArea.vue";
import SummaryCard from "#/common/ProductSummaryCard.vue";
import { ref } from "vue";

const emit = defineEmits(["closeReview", "submitReview", "modifyReview"]);
const props = defineProps({
  data: Object,
});
const cardData = ref({
  imgSrc: props.data.imgSrc,
  productName: props.data.productName,
  productDetail: [...props.data.productDetail],
});
const form = ref({
  title: "",
  content: "",
  files: [
    { preview: "", fileName: null, file: null },
    { preview: "", fileName: null, file: null },
    { preview: "", fileName: null, file: null },
  ],
});

const cancel = () => {
  form.value.title = "";
  form.value.content = "";
  form.value.files = [
    { preview: "", fileName: null, file: null },
    { preview: "", fileName: null, file: null },
    { preview: "", fileName: null, file: null },
  ];
  emit("closeReview");
};
</script>

<style src="@/assets/css/myorder/WriteReview.css" module></style>