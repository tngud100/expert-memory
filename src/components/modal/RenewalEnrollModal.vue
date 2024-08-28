<template>
  <div :class="$style.wrapper">
    <div :class="$style.filter" @click.stop="closeBtn"></div>
    <div :class="$style.container">
      <div :class="$style.header">
        <div :class="$style.title">
          {{ title }}
        </div>
        <div :class="$style.closeBox">
          <IconClose @click.stop="closeBtn" />
        </div>
      </div>
      <div :class="$style.content">
        <div
          v-for="(row, rowIndex) in rows"
          :key="rowIndex"
          :class="$style.row"
        >
          <div :class="$style.field" :style="{ alignContent: row.feildAlign }">
            {{ row.label }}*
          </div>

          <div
            :class="$style.inputBox"
            :style="{ height: row.height }"
            v-if="!row.imgFile && !row.textArea && !row.select"
          >
            <input
              type="text"
              :class="$style.input"
              :placeholder="row.placeholder"
              v-model="formData[row.field]"
            />
          </div>

          <textarea
            :class="$style.textarea"
            :style="{ height: row.height }"
            :placeholder="row.placeholder"
            v-if="row.textArea"
            v-model="formData[row.field]"
          />

          <div v-if="row.imgFile" :class="$style.imgFileBox">
            <input
              :class="$style.uploadInput"
              type="file"
              :id="'uploadButton' + rowIndex"
              @change="uploadProductMainPicBtn($event, rowIndex, row.field)"
              style="display: none"
            />
            <span v-if="imgNames[rowIndex]" :class="$style.fileName">{{
              imgNames[rowIndex]
            }}</span>
            <span v-else-if="formData[row.field]" :class="$style.fileName">{{
              formData[row.field].name
            }}</span>
            <div v-else :class="$style.placeHolder">파일을 선택해 주세요</div>
            <label
              :for="'uploadButton' + rowIndex"
              :class="$style.uploadButton"
            >
              <span>선택</span>
            </label>
          </div>

          <select
            v-if="row.select"
            :class="$style.inputBox"
            @change="formData[row.field] = $event.target.value"
          >
            <option
              :value="selectedData ? formData[row.field] : null"
              disabled
              selected
              hidden
            >
              <span :class="$style.placeHolder">{{
                selectedData ? formData[row.field] : row.placeholder
              }}</span>
            </option>
            <option
              v-for="item in row.select"
              :key="item"
              :class="$style.input"
              :value="item"
            >
              {{ item }}
            </option>
          </select>

          <select
            v-if="row.sideSelect"
            :class="$style.select"
            @change="formData[row.sideSelectField] = $event.target.value"
          >
            <option
              :value="selectedData ? formData[row.field] : null"
              disabled
              selected
              hidden
            >
              <span :class="$style.placeHolder">{{
                selectedData ? formData.sideSelect : row.sideSelectPlaceHolder
              }}</span>
            </option>
            <option
              v-for="item in row.sideSelect"
              :key="item"
              :class="$style.option"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </div>
      </div>

      <div :class="$style.buttonBox">
        <button
          :class="$style.button"
          @click="selectedData ? handleUpdate() : handleSubmit()"
        >
          {{ selectedData ? "수정" : "등록" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconClose from "#/icons/IconClose.vue";
import { onMounted, ref } from "vue";

const props = defineProps({
  title: String,
  rows: Array,
  selectedData: Array,
});

const emit = defineEmits(["closeBtn", "submit", "emitChecking", "update"]);

const formData = ref({});

const isChangedImage = ref(false);

onMounted(() => {
  props.rows.forEach((row) => {
    formData.value[row.field] = row.defaultValue || "";
  });

  if (props.selectedData) {
    formData.value = {
      ...props.selectedData,
    };
    console.log(formData.value);
  }
});

const imgNames = ref(props.rows.map(() => ""));

const uploadProductMainPicBtn = (event, index, field) => {
  const file = event.target.files[0];
  if (file) {
    imgNames.value[index] = file.name;
    formData.value[field] = file;
  }
  isChangedImage.value = true;
};

const handleUpdate = () => {
  if (!isChangedImage.value && props.selectedData) {
    formData.value.image = null;
  }
  emit("update", formData.value);
};

const handleSubmit = () => {
  emit("submit", formData.value);
};

const closeBtn = () => {
  emit("closeBtn");
  formData.value = {};
  imgNames.value = imgNames.value.map(() => "");
};
</script>

<style src="@/assets/css/modal/RenewalEnrollModal.css" module></style>
