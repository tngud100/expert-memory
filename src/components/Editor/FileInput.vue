<template>
  <div :class="$style.fileUpload">
    <input
      type="file"
      multiple
      @change="handleFileUpload"
      ref="fileInput"
      style="display: none"
    />
    <button :class="$style.selectFileBtn" @click="triggerFileInput">
      <IconDownloadImg />
      첨부파일
    </button>
    <div :class="$style.fileList">
      <ul :class="$style.fileBox">
        <li
          v-for="(file, index) in fileNames"
          :key="index"
          :class="$style.file"
        >
          <IconClose
            @click="removeFile(index)"
            :class="$style.closeBtn"
          ></IconClose>
          {{ file }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import IconDownloadImg from "#/icons/IconDownloadImg.vue";
import IconClose from "#/icons/IconClose.vue";

const fileNames = ref([]);
const selectFiles = ref([]);
const fileInput = ref(null);

const emit = defineEmits(["fileChange"]);

const props = defineProps({
  selectedFiles: Array,
  selectedFileNames: Array,
});

const handleFileUpload = async (event) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    fileNames.value.push(files[i].name);
    selectFiles.value.push(files[i]);
  }

  emit("fileChange", { files: selectFiles.value, names: fileNames.value });
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const removeFile = (index) => {
  fileNames.value.splice(index, 1);
  selectFiles.value.splice(index, 1);
  emit("fileChange", { files: selectFiles.value, names: fileNames.value });
};

watch(
  () => props.selectedFileNames,
  (newFile) => {
    fileNames.value = [...newFile];
  }
);
</script>

<style src="@/assets/css/Editor/FileInput.css" module></style>
