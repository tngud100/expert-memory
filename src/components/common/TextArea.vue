<template>
  <div :class="$style.contentBox">
    <div :class="$style.label">{{ label }}</div>
    <div>
      <div :class="$style.content">
        <textarea
          type="text"
          v-model="form.content"
          @input="emitContentChange"
          :class="$style.contentInput"
        />
      </div>
      <div :class="$style.fileBox">
        <div
          v-for="(file, index) in form.files"
          :key="index"
          :class="$style.imageWrapper"
        >
          <div :class="$style.addFileBtn" @click="triggerFileInput(index)">
            <IconPlus v-if="!file.preview" />
            <img
              v-else
              :src="file.preview"
              :alt="'Preview ' + index"
              :class="$style.previewImage"
            />
          </div>
          <button
            v-if="file.preview"
            @click="removeFile(index)"
            :class="$style.removeFileBtn"
          >
            <IconCloseBackground />
          </button>
          <input
            type="file"
            :ref="'fileInput' + index"
            @change="handleFileChange($event, index)"
            accept="image/*"
            style="display: none"
          />
        </div>
        <span :class="$style.addRuleText">
          -최대 15MB 이하의 JPG, PNG, GIF 파일 3장까지 첨부 가능합니다.
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconPlus from "#/icons/IconPlus.vue";
import IconCloseBackground from "#/icons/IconCloseBackground.vue";
import { computed, ref, watch } from "vue";

const props = defineProps({
  label: String,
  content: String,
  imgFiles: Array,
});

const emit = defineEmits(["contentChange", "fileChange"]);

const label = computed(() => props.label);

const form = ref({
  content: "",
  files: [
    { preview: "", fileName: null, file: null },
    { preview: "", fileName: null, file: null },
    { preview: "", fileName: null, file: null },
  ],
});

const emitContentChange = () => {
  emit("contentChange", form.value.content);
};

const triggerFileInput = (index) => {
  const fileInputs = document.querySelectorAll('input[type="file"]');
  if (fileInputs[index]) {
    fileInputs[index].click();
  }
};

const handleFileChange = (event, index) => {
  const file = event.target.files[0];
  if (file) {
    const preview = URL.createObjectURL(file);
    // 파일이 다 차있지 않은 경우
    if (form.value.files.some((f) => f.preview === "")) {
      console.log("true");
      form.value.files = form.value.files.filter((f) => f.preview !== "");
      form.value.files.unshift({
        file: file,
        preview: preview,
        fileName: null,
      });
      // 최대 3장까지만 유지
      form.value.files = form.value.files.concat(
        new Array(3 - form.value.files.length).fill({
          file: null,
          preview: "",
          fileName: null,
        })
      );
    } else {
      console.log("false");
      // 지정된 인덱스의 파일을 교체
      form.value.files[index] = {
        ...form.value.files[index],
        file: file,
        preview: preview,
      };
    }
  }
  emit("fileChange", form.value.files);
};

const removeFile = (index) => {
  form.value.files.splice(index, 1);
  form.value.files.push({ file: null, preview: "", fileName: null });
  // emit("fileChange", form.value.files);
};

watch(
  () => props.content,
  () => {
    if (props.content) {
      form.value.content = props.content;
      emitContentChange();
    }
    // 이미지 나타내기 로직 구현
    if (props.imgFiles) {
      props.imgFiles.forEach((img, index) => {
        form.value.files[index] = {
          preview: img.path,
          fileName: img.fileName,
          file: null,
        };
      });
      emit("fileChange", form.value.files);
    }
  }
);
</script>

<style src="@/assets/css/common/TextArea.css" module></style>
