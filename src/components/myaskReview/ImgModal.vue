<template>
  <div :class="$style.modalOverlay" @click="close">
    <div :class="$style.modalContent" @click.stop>
      <img
        :src="imgFile.preview"
        :alt="imgFile.fileName"
        :class="$style.modalImage"
      />
      <a
        v-if="role === 'ROLE_ADMIN'"
        :href="downloadUrl"
        download
        :class="$style.downloadBtn"
        >다운로드</a
      >
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import getTokenData from "@/utils/getTokenData.js";

const { getRoleFromToken } = getTokenData();

const role = getRoleFromToken();

const props = defineProps({
  imgFile: Object,
});

// const baseUrl = props.imgFile.preview.split("images\\")[0]; // 클라이언트 측에서 이미지 파일 이름에서 슬래시를 제거하는 부분입니다.
const imgName = props.imgFile.preview.split("images\\")[1]; // 클라이언트 측에서 이미지 파일 이름에서 슬래시를 제거하는 부분입니다.
const baseUrl = "http://localhost:8080/api/inquire/download";
// const baseUrl =
//   "https://KeyboardBack-env.eba-xmfhb4un.ap-northeast-2.elasticbeanstalk.com/api/inquire/download";
// const baseUrl = "https://dik58thfdw586.cloudfront.net/api/inquire/download";

const downloadUrl = computed(() => {
  return `${baseUrl}/${imgName}`;
});

// console.log(props.imgFile.preview);
// console.log(downloadUrl.value);

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>

<style src="@/assets/css/myaskReview/ImgModal.css" module></style>
