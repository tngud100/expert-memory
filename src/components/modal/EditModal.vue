<template>
  <section :class="$style.editModalSection">
    <div :class="$style.background" @click="closeModal" />
    <div :class="$style.wrapper">
      <div :class="$style.type">
        <span>
          {{ type }}
        </span>
        <Close :class="$style.closeBtn" @click="closeModal" />
      </div>
      <Title
        :boardIdx="boardIdx"
        :selectedTitle="editContent.title"
        :selectedCategory="editContent.category"
        @update:title="updateTitle"
        @update:category="updateCategory"
      />
      <File
        v-if="props.boardIdx === 2"
        @fileChange="fileChange"
        :selectedFiles="editContent.files"
        :selectedFileNames="editContent.fileNames"
      />
      <!-- <AskEditor
        v-if="props.boardIdx === 1"
        @update:category="updateAsk"
        :spanText="'Q. '"
        :placeholder="'질문을 입력해주세요'"
        :selectedAsk="editContent.ask"
      /> -->
      <Editor
        @update:eidtorContent="updateContent"
        @update:images="updateImagesUrls"
        @update:deletedImages="updateDeletedImagesUrls"
        :selectedContent="editContent.content"
        :boardIdx="boardIdx"
        :isContentUpdating="isContentUpdating"
      />
      <div :class="$style.btnContainer">
        <button :class="$style.submitBtn" @click="handleSubmit">
          {{ selectedId ? "수정" : "등록" }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import Title from "#/Editor/Title.vue";
import Editor from "#/Editor/Contents.vue";
import AskEditor from "#/Editor/AskContent.vue";
import File from "#/Editor/FileInput.vue";
import Close from "#/icons/IconClose.vue";
import { boardPostAPI } from "@/api/BoardPostDataAPI.js";
import { boardGetDataAPI } from "@/api/BoardGetDataAPI.js";
import { boardPutDataAPI } from "@/api/BoardPutDataAPI.js";
import { computed, onMounted, reactive, ref } from "vue";
import axios from "@/utils/axiosInstance.js";

const emit = defineEmits(["closeModal", "enrollBoard"]);

const { enrollNotice, enrollFAQ, enrollDownload } = boardPostAPI();
const { getNoticeByNoticeId, getFAQByFAQId, getDownloadByDownloadId } =
  boardGetDataAPI();
const { updateNoticeBoard, updateFAQBoard, updateDownloadBoard } =
  boardPutDataAPI();

const props = defineProps({
  boardIdx: Number,
  selectedId: Number,
});

const type = computed(() => {
  switch (props.boardIdx) {
    case 0:
      return "공지사항 작성";
    case 1:
      return "자주묻는 질문 작성";
    case 2:
      return "자료실 작성";
  }
});

const editContent = ref({
  title: "",
  category: "",
  content: "",
  ask: "",
  files: [],
  fileNames: [],
  editorImgUrls: [], // 현재 content의 이미지
  uploadEditorImgUrls: [], // submit 버튼을 눌렀을시의 이미지
  deletedEditorImgUrls: [], // 삭제된 이미지
});

let isContentUpdating = reactive(false);

const updateTitle = (value) => {
  editContent.value.title = value;
};
const updateCategory = (value) => {
  editContent.value.category = value;
};
const updateContent = (value) => {
  editContent.value.content = value;
};
const updateAsk = (value) => {
  editContent.value.ask = value;
};
const fileChange = (value) => {
  editContent.value.files = value.files;
  editContent.value.fileNames = value.names;
};
const updateImagesUrls = (value) => {
  editContent.value.editorImgUrls = value;
};
const updateDeletedImagesUrls = (value) => {
  editContent.value.deletedEditorImgUrls = value;
};

const handleSubmit = async () => {
  isContentUpdating = true;
  let data = {};

  console.log("editContent.value.content", editContent.value.content);

  // editContent.value.content = editContent.value.content.replace(
  //   /(<img[^>]*src=")([^"]*editorImage\/[^"]*)("[^>]*>)/g,
  //   (match, p1, p2, p3) => p1 + p2.replace("editorImage/", "board/notice/") + p3
  // );
  // console.log("editContent.value.content", editContent.value.content);

  editContent.value.uploadEditorImgUrls = editContent.value.editorImgUrls;
  editContent.value.editorImgUrls = [];

  // 디코딩된 이미지 URL 배열
  editContent.value.uploadEditorImgUrls =
    editContent.value.uploadEditorImgUrls.map((url) => decodeURIComponent(url));
  editContent.value.deletedEditorImgUrls =
    editContent.value.deletedEditorImgUrls.map((url) =>
      decodeURIComponent(url)
    );

  if (props.boardIdx === 0) {
    editContent.value.content = editContent.value.content.replace(
      /(<img[^>]*src=")([^"]*editorImage\/[^"]*)("[^>]*>)/g,
      (match, p1, p2, p3) =>
        p1 + p2.replace("editorImage/", "board/notice/") + p3
    );
    data = {
      title: editContent.value.title,
      content: editContent.value.content,
      imageUrls: editContent.value.uploadEditorImgUrls || [],
      deleteImageUrls: editContent.value.deletedEditorImgUrls || [],
    };
  } else if (props.boardIdx === 1) {
    editContent.value.content = editContent.value.content.replace(
      /(<img[^>]*src=")([^"]*editorImage\/[^"]*)("[^>]*>)/g,
      (match, p1, p2, p3) => p1 + p2.replace("editorImage/", "board/faq/") + p3
    );
    data = {
      title: editContent.value.title,
      category: editContent.value.category,
      ask: editContent.value.ask,
      comment: editContent.value.content,
      imageUrls: editContent.value.uploadEditorImgUrls || [],
      deleteImageUrls: editContent.value.deletedEditorImgUrls || [],
    };
  } else if (props.boardIdx === 2) {
    editContent.value.content = editContent.value.content.replace(
      /(<img[^>]*src=")([^"]*editorImage\/[^"]*)("[^>]*>)/g,
      (match, p1, p2, p3) =>
        p1 + p2.replace("editorImage/", "board/download/") + p3
    );
    const formData = new FormData();
    formData.append("title", editContent.value.title);
    formData.append("content", editContent.value.content);
    formData.append("category", editContent.value.category);
    if (editContent.value.uploadEditorImgUrls.length > 0) {
      for (var i = 0; i < editContent.value.uploadEditorImgUrls.length; i++) {
        formData.append("imageUrls", editContent.value.uploadEditorImgUrls[i]);
      }
    } else {
      formData.append("imageUrls", []);
    }

    if (editContent.value.deletedEditorImgUrls.length > 0) {
      for (var i = 0; i < editContent.value.deletedEditorImgUrls.length; i++) {
        formData.append(
          "deleteImageUrls",
          editContent.value.deletedEditorImgUrls[i]
        );
      }
    } else {
      formData.append("deleteImageUrls", []);
    }

    data = formData;
  }
  console.log("data", data);
  if (props.selectedId) {
    await modifyContent(data);
  } else {
    await enrollContent(data);
  }
  resetEditContent();
  await closeModal();
  isContentUpdating = false;
};

const enrollContent = async (data) => {
  switch (props.boardIdx) {
    case 0:
      await enrollNotice(data);
      break;
    case 1:
      await enrollFAQ(data);
      break;
    case 2:
      editContent.value.files.forEach((file, index) => {
        data.append("files", file);
      });
      await enrollDownload(data);
      break;
  }
};

const modifyContent = async (data) => {
  switch (props.boardIdx) {
    case 0:
      data.notices_id = props.selectedId;
      await updateNoticeBoard(props.selectedId, data);
      break;
    case 1:
      data.faqs_id = props.selectedId;
      await updateFAQBoard(props.selectedId, data);
      break;
    case 2:
      data.append("downloads_id", props.selectedId);
      editContent.value.files.forEach((file, index) => {
        data.append("files", file);
      });
      editContent.value.fileNames.forEach((file, index) => {
        data.append("existedFileNames", file);
      });
      await updateDownloadBoard(props.selectedId, data);
      break;
  }
};

const resetEditContent = () => {
  editContent.value = {
    title: "",
    category: "",
    content: "",
    ask: "",
    files: [],
    fileNames: [],
    editorImgUrls: [],
    uploadEditorImgUrls: [],
    deletedEditorImgUrls: [],
  };
};

const closeModal = async () => {
  if (editContent.value.editorImgUrls.length !== 0) {
    for (const url of editContent.value.editorImgUrls) {
      console.log(url);
      const originName = url.split("/").pop();
      const imagePathName = url.split("/").slice(-2).join("/");
      try {
        await axios.delete(`/editor/imgDelete/${originName}`, {
          params: {
            originalName: imagePathName,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
  }
  await emit("closeModal");
};

const fetchData = async () => {
  if (props.selectedId) {
    let data;
    switch (props.boardIdx) {
      case 0:
        data = await getNoticeByNoticeId(props.selectedId);
        break;
      case 1:
        data = await getFAQByFAQId(props.selectedId);
        break;
      case 2:
        data = await getDownloadByDownloadId(props.selectedId);
        console.log(data);
        break;
    }
    if (props.boardIdx === 0) {
      editContent.value.title = data.title;
      editContent.value.content = data.content;
    }
    if (props.boardIdx === 1) {
      editContent.value.category = data.category;
      editContent.value.title = data.title;
      editContent.value.ask = data.ask;
      editContent.value.content = data.comment;
    }
    if (props.boardIdx === 2) {
      editContent.value.title = data.boardList.title;
      editContent.value.content = data.boardList.content;
      editContent.value.category = data.boardList.category;
      editContent.value.fileNames =
        data.files.map((item) => {
          return item.fileName;
        }) || [];
    }
  }
};

onMounted(fetchData);
</script>

<style src="@/assets/css/modal/EditModal.css" module></style>
