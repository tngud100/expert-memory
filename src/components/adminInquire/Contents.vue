<template>
  <section>
    <div :class="$style.adminContainer">
      <p :class="$style.pageLabel">1:1 문의 관리자 페이지</p>
      <div :class="$style.askListContainer">
        <ul :class="$style.listTitle">
          <li :class="$style.proccess">처리 상태</li>
          <li :class="$style.type">처리 상태</li>
          <li :class="$style.title">제목</li>
          <li :class="$style.loginId">아이디</li>
          <li :class="$style.date">문의일</li>
          <li :class="$style.actions">작업</li>
        </ul>
        <div v-if="asklist.length === 0" :class="$style.emptyInquire">
          문의내역이 존재 하지 않습니다.
        </div>
        <div :class="$style.ListBox">
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
                  list.comment_state ? $style.blackColor : $style.redColor,
                ]"
              >
                {{ list.proccessState }}
              </li>
              <li :class="$style.type">{{ list.inquire_type }}</li>
              <li :class="$style.titleText">{{ list.title }}</li>
              <li :class="$style.loginId">{{ list.login_id }}</li>
              <li :class="$style.date">{{ list.date }}</li>
              <li :class="$style.actions">
                <button
                  v-if="!list.comment_state"
                  :class="$style.actionBtn"
                  @click.stop="replyBtn(list.inquire_id, list.idx)"
                >
                  답변
                </button>
                <button
                  v-if="list.comment_state"
                  :class="$style.actionBtn"
                  @click.stop="modifyBtn(list.inquire_id, list.idx)"
                >
                  수정
                </button>
                <button
                  :class="$style.actionBtn"
                  @click.stop="deleteBtn(list.inquire_id)"
                >
                  삭제
                </button>
              </li>
            </ul>
            <div :class="$style.askContainer" v-if="list.isclicked">
              <div :class="$style.content">
                <span v-html="replaceNewline(list.content)"></span>
              </div>
              <div :class="$style.ImgAndBtnBox">
                <ImgContainer :imgFiles="filteredImgFiles(list.inquire_id)" />
              </div>
              <div v-if="list.response" :class="$style.response">
                <span v-html="replaceNewline(list.response.content)"></span>
              </div>
              <div
                :class="$style.replyBox"
                v-if="list.isReplying && selectedInquiryId === list.inquire_id"
              >
                <textarea
                  v-model="replyContent"
                  :class="$style.replyTextarea"
                  placeholder="답변을 입력하세요..."
                ></textarea>
                <div :class="$style.submitReplyBox">
                  <button
                    v-if="!list.comment_state"
                    @click="submitReply(list.inquire_id)"
                    :class="$style.submitReplyBtn"
                  >
                    답변 제출
                  </button>
                  <button
                    v-if="list.comment_state"
                    @click="submitModify(list.inquire_id)"
                    :class="$style.submitReplyBtn"
                  >
                    답변 수정
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div :class="$style.modalContainer" v-if="modalStore.isOpenVerifyModal">
        <CheckModal :commentCode="14" @isVerifyState="isVerifyState" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/store/useAuthStore.js";
import { AskAPI } from "@/api/AskReviewGetDataAPI.js";
import { AuthAPI } from "@/api/AuthAPI.js";
import { useModalStore } from "@/store/useModalStore.js";
import ImgContainer from "#/myaskReview/ImgContainer.vue";
import CheckModal from "#/modal/CheckModal.vue";

const authStore = useAuthStore();
const modalStore = useModalStore();
const {
  getAskListAll,
  getAskByInquireId,
  deleteAsk,
  enrollAskComment,
  updateAskComment,
} = AskAPI();
const { getUserDataByMemberId } = AuthAPI();

const proccessState = ["답변대기", "답변완료"];

const adminUserInfo = ref([]);
const asklist = ref([]);
const imgFiles = ref([]);
const inquireIdToDelete = ref(null);
const selectedInquiryId = ref(null);
const replyContent = ref("");

const fetchAskListData = async () => {
  asklist.value = [];
  imgFiles.value = [];
  const data = await getAskListAll();

  for (let index = 0; index < data.length; index++) {
    await setAskListData(data[index], index);
  }
};

const setAskListData = async (item, index) => {
  const data = await getUserDataByMemberId(item.inquire.member_id);
  const LoginId = data.login_ID;

  asklist.value.push({
    login_id: LoginId,
    proccessState:
      item.inquire.comment_state === 0 ? proccessState[0] : proccessState[1],
    comment_state: item.inquire.comment_state === 0 ? false : true,
    title: item.inquire.title,
    content: item.inquire.content,
    inquire_type: item.inquire.inquire_type,
    isclicked: false,
    isReplying: false,
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
    item.isReplying = false;
  });
};

const replaceNewline = (text) => {
  return text.replace(/\r?\n/g, "<br>");
};

const replyBtn = (inquire_id, idx) => {
  selectedInquiryId.value = inquire_id;
  asklist.value.forEach((item, index) => {
    item.isclicked = index === idx ? true : false;
    item.isReplying = index === idx ? !item.isReplying : false;
  });
};

const submitReply = async (inquire_id) => {
  const isEnrollComment = await enrollAskComment(
    adminUserInfo.value.memberId,
    inquire_id,
    replyContent.value
  );
  if (!isEnrollComment) {
    alert("답변 등록에 실패하였습니다.");
  }
  await fetchAskListData();
  selectedInquiryId.value = null;
  asklist.value.forEach((item) => {
    item.isReplying = false;
  });
  replyContent.value = "";
  alert("답변이 등록되었습니다.");
};

const modifyBtn = (inquire_id, idx) => {
  selectedInquiryId.value = inquire_id;
  asklist.value.forEach((item, index) => {
    item.isclicked = index === idx ? true : false;
    item.isReplying = index === idx ? !item.isReplying : false;
  });
  replyContent.value = asklist.value[idx].response.content;
};

const submitModify = async (inquire_id) => {
  const isUpdateComment = await updateAskComment(
    inquire_id,
    replyContent.value
  );
  if (!isUpdateComment) {
    alert("답변 수정에 실패하였습니다.");
  }
  await fetchAskListData();
  selectedInquiryId.value = null;
  asklist.value.forEach((item) => {
    item.isReplying = false;
  });
  replyContent.value = "";
  alert("답변이 수정되었습니다.");
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
      await fetchAskListData(); // 데이터를 초기화하고 다시 받아옴
      alert("삭제되었습니다.");
    } else {
      alert("삭제에 실패하였습니다.");
    }
  }

  inquireIdToDelete.value = null;
  modalStore.isOpenVerifyModal = false;
  document.body.style.overflow = "";
};

onMounted(async () => {
  await authStore.fetchUserData();
  adminUserInfo.value = authStore.getUserData;
  await fetchAskListData();
  console.log(adminUserInfo.value);
});
</script>

<style src="@/assets/css/adminInquire/Contents.css" module></style>
