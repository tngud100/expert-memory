<template>
  <section>
    <div :class="$style.askBoard">
      <ul :class="$style.listTitle">
        <li :class="$style.proccess">처리 상태</li>
        <li :class="$style.title">제목</li>
        <li :class="$style.date">문의일</li>
      </ul>
      <div v-if="!asklist.length" :class="$style.noExistBoard">
        <NoContent />
      </div>
      <div v-for="list in asklist" :key="list.idx">
        <ul
          :class="[
            $style.list,
            list.isclicked ? $style.listAskActive : $style.listAsk,
          ]"
          @click="clickList(list.idx)"
        >
          <li
            :class="[
              $style.proccess,
              list.comment_state ? $style.redColor : $style.blackColor,
            ]"
          >
            {{ list.proccessState }}
          </li>
          <li :class="$style.titleText">{{ list.title }}</li>
          <li :class="$style.date">{{ list.date }}</li>
        </ul>
        <div :class="$style.askContainer" v-if="list.isclicked">
          <div :class="$style.content">
            <span v-html="replaceNewline(list.content)"></span>
          </div>
          <div :class="$style.ImgAndBtnBox">
            <ImgContainer :imgFiles="filteredImgFiles(list.inquire_id)" />
            <div :class="$style.btnBox">
              <button
                :class="$style.contentBtn"
                v-if="!list.response"
                @click="modifyBtn(list.inquire_id)"
              >
                수정
              </button>
              <button
                :class="$style.contentBtn"
                @click="deleteBtn(list.inquire_id)"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
        <div
          :class="$style.ansContainer"
          v-if="list.isclicked && list.response"
        >
          <span v-html="replaceNewline(list.response.content)"></span>
        </div>
      </div>
    </div>
    <div :class="$style.modalContainer" v-if="modalStore.isOpenVerifyModal">
      <CheckModal :commentCode="14" @isVerifyState="isVerifyState" />
    </div>
  </section>
</template>
  
  <script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/store/useAuthStore.js";
import { AskAPI } from "@/api/AskReviewGetDataAPI.js";
import { useModalStore } from "@/store/useModalStore.js";
import ImgContainer from "#/myaskReview/ImgContainer.vue";
import NoContent from "#/myaskReview/NoContent.vue";
import CheckModal from "#/modal/CheckModal.vue";

const authStore = useAuthStore();
const modalStore = useModalStore();
const { getAskListByMemberId, getAskByInquireId, deleteAsk } = AskAPI();

const emit = defineEmits(["showWriteForm"]);

const proccessState = ["접수", "답변완료"];
const asklist = ref([
  // {
  //   proccessState: proccessState[1],
  //   title: "상품 문의합니다.",
  //   content: "상품이 이상해요.",
  //   comment_state: true,
  //   isclicked: false,
  //   response: {
  //     content: "이상한건 당신입니다.",
  //   },
  //   date: "2021.09.01",
  //   idx: 0,
  // },
]);

const imgFiles = ref([]);
const inquireIdToDelete = ref(null);

onMounted(async () => {
  await authStore.fetchUserData();
  await fetchAskListData();
});

const fetchAskListData = async () => {
  imgFiles.value = [];
  const memberId = authStore.userData.memberId;
  const data = await getAskListByMemberId(memberId);

  for (let index = 0; index < data.length; index++) {
    await setAskListData(data[index], index);
  }
};

const setAskListData = async (item, index) => {
  asklist.value.push({
    proccessState:
      item.inquire.comment_state === 0 ? proccessState[0] : proccessState[1],
    comment_state: item.inquire.comment_state === 0 ? false : true,
    title: item.inquire.title,
    content: item.inquire.content,
    inquire_type: item.inquire.inquire_type,
    isclicked: false,
    response: item.comment ? { content: item.comment?.comment } : null,
    date: item.inquire.regdate.slice(0, 10),
    inquire_id: item.inquire.inquires_id,
    idx: index,
  });

  const imgData = await getAskByInquireId(item.inquire.inquires_id);
  imgData.images.forEach((img) => {
    imgFiles.value.push({
      inquireId: item.inquire.inquires_id,
      fileName: img.fileName,
      path: img.imgPath,
    });
  });
};

const filteredImgFiles = (inquireId) => {
  return imgFiles.value.filter((item) => item.inquireId === inquireId);
};

const clickList = (idx) => {
  asklist.value.forEach((item, index) => {
    item.isclicked = index === idx ? !item.isclicked : false;
  });
};
const replaceNewline = (text) => {
  return text.replace(/\r?\n/g, "<br>");
};

const modifyBtn = (inquire_id) => {
  emit("showWriteForm", inquire_id);
};

const deleteBtn = (inquire_id) => {
  modalStore.isOpenVerifyModal = true;
  document.body.style.overflow = "hidden";
  inquireIdToDelete.value = inquire_id;
};
const isVerifyState = async (isVerify) => {
  if (isVerify) {
    const isdelete = await deleteAsk(inquireIdToDelete.value);
    if (isdelete) {
      await fetchAskListData();
    }
  }

  inquireIdToDelete.value = null;
  modalStore.isOpenVerifyModal = false;
  document.body.style.overflow = "";
};
</script>
  
  <style src="@/assets/css/myaskReview/AskMain.css" module></style>
  