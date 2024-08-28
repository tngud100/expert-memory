<template>
  <Ckeditor
    :editor="editor"
    v-model="text"
    :config="editorConfig"
    @ready="onEditorReady"
  ></Ckeditor>
</template>

<script setup>
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { Bold, Italic } from "@ckeditor/ckeditor5-basic-styles";
import { BlockQuote } from "@ckeditor/ckeditor5-block-quote";
import { Font } from "@ckeditor/ckeditor5-font";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { Indent } from "@ckeditor/ckeditor5-indent";
import { List } from "@ckeditor/ckeditor5-list";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { TextTransformation } from "@ckeditor/ckeditor5-typing";
import { Alignment } from "@ckeditor/ckeditor5-alignment";
import {
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  ImageResize,
} from "@ckeditor/ckeditor5-image";

import { reactive, ref, watch } from "vue";
import UploadAdapter from "#/Editor/UploadAdapter";
import axios from "@/utils/axiosInstance.js";

let text = ref();

const emit = defineEmits([
  "update:modelValue",
  "update:images",
  "update:deletedImages",
]);

const props = defineProps({
  selectedContent: String,
  boardIdx: Number,
  isContentUpdating: Boolean,
});

const editor = ClassicEditor;
const editorConfig = {
  extraPlugins: [CustomUploadAdapterPlugin],
  plugins: [
    Essentials,
    Heading,
    Bold,
    Italic,
    Font,
    Paragraph,
    BlockQuote,
    Indent,
    List,
    TextTransformation,
    Alignment,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    ImageResize,
  ],
  toolbar: {
    items: [
      "heading",
      "bold",
      "italic",
      "fontColor",
      "fontBackgroundColor",
      "link",
      "imageUpload",
      "indent",
      "outdent",
      "numberedList",
      "bulletedList", // bulletedList도 함께 추가
      "alignment",
      "blockQuote",
      "undo",
      "redo",
      "insertTable",
    ],
  },
  image: {
    toolbar: [
      "imageStyle:alignLeft", // 왼쪽 정렬
      "imageStyle:alignCenter", // 중앙 정렬
      "imageStyle:alignRight", // 왼쪽 정렬
    ],
    styles: ["alignLeft", "alignCenter", "alignRight"],
  },
  language: "ko",
};

let imageUrls = reactive([]); // 이미지 URL들을 저장할 배열
let deletedImageUrls = reactive([]); // 이미지 URL들을 저장할 배열
// Custom Upload Adapter Plugin function
function CustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new UploadAdapter(loader, imageUrls);
  };
}

const deleteImageFromServer = async (imageURL) => {
  const originName = imageURL.split("/").pop();
  const imagePathName = imageURL.split("/").slice(-2).join("/");

  return await axios
    .delete(`/editor/imgDelete/${originName}`, {
      params: {
        originalName: decodeURIComponent(imagePathName),
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("Image deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting image:", error);
    });
};

const onEditorReady = (editorInstance) => {
  editorInstance.model.document.on("change:data", () => {
    if (props.isContentUpdating) return;

    const editorContent = editorInstance.getData();

    // console.log("ReadyContent");
    console.log("imageUrls", imageUrls);
    // console.log("imageUrlsLength", imageUrls.length);

    for (let i = 0; i < imageUrls.length; i++) {
      imageUrls[i] = decodeURIComponent(imageUrls[i]);
      if (!editorContent.includes(imageUrls[i])) {
        console.log("deleteImageFromServer", imageUrls[i]);
        deleteImageFromServer(imageUrls[i]);
        // let deletedImageName = imageUrls[i].replace(
        //   "http://localhost:8080",
        //   ""
        // );

        let deletedImageName = imageUrls[i].replace(
          "https://joseonkeyboard-image-bucket.s3.ap-northeast-2.amazonaws.com/",
          ""
        );

        console.log("deletedImageName", deletedImageName);
        deletedImageUrls.push(deletedImageName); // 삭제된 이미지를 추가
        imageUrls.splice(i, 1);
      }
    }
    // console.log("imageUrlsLength", imageUrls.length);
    // console.log("deletedImageUrls", deletedImageUrls);
  });
};

// 모든 이미지를 content에서 추출하여 imageUrls에 넣는다
const extractInitialImageUrls = (content) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const imgs = doc.querySelectorAll("img");
  imageUrls.length = 0; // 기존 이미지 URL 목록을 초기화합니다.
  imgs.forEach((img) => {
    imageUrls.push(img.src);
  });
};

watch(
  () => props.selectedContent,
  async () => {
    extractInitialImageUrls(props.selectedContent);
    text.value = props.selectedContent;
  },
  { immediate: true }
);

watch(text, (newValue, oldValue) => {
  emit("update:modelValue", newValue);
});

watch(
  imageUrls,
  (newValue, oldValue) => {
    emit("update:images", newValue);
  },
  { deep: true }
);

watch(
  deletedImageUrls,
  (newValue, oldValue) => {
    emit("update:deletedImages", newValue);
  },
  { deep: true }
);
</script>

<style>
@import "@ckeditor/ckeditor5-editor-classic/theme/classiceditor.css";

.ck.ck-editor {
  font-size: 14px;
}

.ck-content .ck-editor__editable {
  min-height: 300px;
  max-height: 350px;
}
.ck-content {
  /* padding-left: 24px !important; */
}
ol {
  padding-left: 15px !important;
  list-style-type: decimal !important; /* 기본적인 숫자 목록 스타일 */
}

strong {
  font-weight: bold !important;
}
i {
  font-style: italic !important;
}
h2 {
  font-size: 2em !important;
}
h3 {
  font-size: 1.5em !important;
}
h4 {
  font-size: 1.17em !important;
}

blockquote {
  border-left: 4px solid #cccccc !important;
  padding-left: 1rem !important;
  margin: 1.5rem 0 !important;
  color: #666666 !important;
  font-style: italic !important;
  background-color: #f9f9f9 !important;
}
/* blockquote 내부 텍스트 스타일 */
blockquote p {
  margin: 0 !important; /* 내부 문단의 기본 여백 제거 */
}

.ck-content .text-left {
  text-align: left !important;
}
.ck-content .text-center {
  text-align: center !important;
}
.ck-content .text-right {
  text-align: right !important;
}
.ck-content .text-justify {
  text-align: justify !important;
}

figure.image-style-align-left {
  float: left;
  margin-right: 1rem;
}
figure.image-style-align-center {
  margin-left: auto;
  margin-right: auto;
}
figure.image-style-align-right {
  float: right;
  margin-left: 1rem;
}
figure.image img {
  max-width: 100%;
  height: auto;
}
</style>