<template>
  <section :class="$style.wrapper">
    <div :class="$style.form" @submit.prevent="submit">
      <div :class="$style.askTypeBox">
        <div :class="$style.askLabel">문의 유형*</div>
        <div :class="$style.typeWrapper" @click="clickType">
          <div :class="$style.typeOption">
            {{ form.typeName ? form.typeName : "문의 유형 선택" }}
            <div>
              <IconMediumDownArrow />
            </div>
          </div>
          <div v-if="showType" :class="$style.dropDownTypeBox">
            <span
              v-for="item in typeList"
              :key="item.index"
              @click="selectType(item)"
              :class="$style.optionStyle"
            >
              {{ item.type }}
            </span>
          </div>
        </div>
        <div :class="$style.askTitle">
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            @input="updateTitle"
            :value="form.title"
            :class="$style.askInput"
          />
        </div>
      </div>
      <TextArea
        :label="'문의 내용*'"
        :content="form.content"
        :imgFiles="imgFiles"
        @contentChange="updateContent"
        @fileChange="handleFileChange"
      ></TextArea>

      <div :class="$style.btnBox">
        <button :class="$style.btn" type="button" @click="cancel">
          취소하기
        </button>
        <button
          v-if="!props.inquireNum"
          :class="$style.btn"
          type="button"
          @click="submit"
        >
          문의하기
        </button>
        <button
          v-if="props.inquireNum"
          :class="$style.btn"
          type="button"
          @click="modify"
        >
          수정하기
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import IconMediumDownArrow from "#/icons/IconMediumDownArrow.vue";
import TextArea from "#/common/TextArea.vue";
import { AskAPI } from "@/api/AskReviewGetDataAPI.js";
import { useAuthStore } from "@/store/useAuthStore.js";
import { onMounted, ref } from "vue";

const {
  enrollAsk,
  getAskByInquireId,
  enrollAskPictures,
  updateAsk,
  updateAskPictures,
} = AskAPI();
const authStore = useAuthStore();
const emit = defineEmits(["goBackAskList"]);

const props = defineProps({
  inquireNum: Number,
});

const form = ref({
  typeName: "",
  title: "",
  content: "",
  files: [
    { file: null, preview: "" },
    { file: null, preview: "" },
    { file: null, preview: "" },
  ],
});
const imgFiles = ref([]);

const typeList = ref([
  { type: "구매문의", index: 0 },
  { type: "취소문의", index: 1 },
  { type: "변경문의", index: 2 },
  { type: "반품문의", index: 3 },
  { type: "상품문의", index: 4 },
  { type: "기타문의", index: 5 },
]);
const showType = ref(false);

onMounted(async () => {
  if (props.inquireNum) {
    const data = await getAskByInquireId(props.inquireNum);
    form.value.typeName = data.inquireType;
    form.value.title = data.title;
    form.value.content = data.content;
    console.log(data);
    data.images.forEach((item) => {
      imgFiles.value.push({
        fileName: item.fileName,
        path: item.imgPath,
      });
    });
  }
});

const clickType = () => {
  showType.value = !showType.value;
};

const selectType = (item) => {
  form.value.typeName = item.type;
};

const updateTitle = (event) => {
  form.value.title = event.target.value;
};

const updateContent = (content) => {
  form.value.content = content;
};

const handleFileChange = (files) => {
  form.value.files = files;
  // console.log("file", form.value.files);
};

const cancel = () => {
  emit("goBackAskList");
};

const submit = async () => {
  if (!form.value.typeName || !form.value.title || !form.value.content) {
    alert("모든 항목을 입력하세요.");
    return;
  }

  const memberId = authStore.userData.memberId;
  const formData = new FormData();
  formData.append("member_id", memberId);
  formData.append("inquire_type", form.value.typeName);
  formData.append("title", form.value.title);
  formData.append("content", form.value.content);

  const inquireId = await enrollAsk(formData);

  const hasFiles = form.value.files.some((file) => file.file !== null);

  if (hasFiles) {
    const imgFiles = new FormData();
    form.value.files.forEach((file) => {
      imgFiles.append("pictures", file.file);
    });
    imgFiles.append("inquires_id", inquireId);

    await enrollAskPictures(imgFiles);
  }

  if (inquireId) {
    alert("문의가 등록되었습니다.");
    emit("goBackAskList");
  }
};

const modify = async () => {
  // 필수 필드가 비어 있는지 확인
  if (!form.value.typeName || !form.value.title || !form.value.content) {
    alert("수정하실 모든 항목을 입력하세요.");
    return;
  }

  const formData = new FormData();
  formData.append("inquires_id", props.inquireNum);
  formData.append("inquire_type", form.value.typeName);
  formData.append("title", form.value.title);
  formData.append("content", form.value.content);

  const isModify = await updateAsk(formData, props.inquireNum);

  console.log("form", form.value);
  const imgFileForm = new FormData();
  form.value.files.forEach((file, index) => {
    imgFileForm.append("existedFileName", file.fileName);
    if (file.file !== null) {
      imgFileForm.append("pictures", file.file);
    }
  });
  imgFileForm.append("inquires_id", props.inquireNum);

  const isUpdatePicture = await updateAskPictures(
    imgFileForm,
    props.inquireNum
  );
  console.log(isUpdatePicture);

  if (isModify === true) {
    alert("문의가 수정되었습니다.");
    emit("goBackAskList");
  }
};
</script>

<style src="@/assets/css/myaskReview/WriteAsk.css" module></style>
