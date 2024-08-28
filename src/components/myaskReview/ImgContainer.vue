<template>
  <div :class="$style.fileBox">
    <div v-for="(file, index) in files" :key="index" :class="$style.addFileBtn">
      <IconPlus v-if="!file.preview" />
      <img
        v-if="file.preview"
        :src="file.preview"
        :alt="file.fileName"
        :class="$style.previewImage"
        @click="openModal(file)"
      />
      <ImageModal
        v-if="selectedImg"
        :imgFile="selectedImg"
        @close="closeModal"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import ImageModal from "#/myaskReview/ImgModal.vue";

const props = defineProps({
  imgFiles: Array,
  inquireId: Number,
});

const files = ref([]);

const selectedImg = ref(null);
const openModal = (imgFile) => {
  selectedImg.value = imgFile;
  // console.log(selectedImg.value);
};

const closeModal = () => {
  selectedImg.value = null;
};

watch(
  () => props.imgFiles,
  (imgFiles) => {
    // console.log("img", imgFiles);
    if (imgFiles && files.value.length !== imgFiles.length) {
      imgFiles.forEach((imgFile) => {
        files.value.push({
          preview: imgFile.path,
          fileName: imgFile.fileName,
          inquireId: imgFile.inquireId,
        });
      });
    }
  },
  { immediate: true }
);
</script>
<style src="@/assets/css/myaskReview/ImgContainer.css" module></style>
