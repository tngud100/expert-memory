<template>
  <div :class="$style.wrapper">
    <CustomTable
      :columns="columns"
      :rows="rows"
      @activeBtn="deleteBtn"
      @listClick="listClick"
    />
    <modal
      v-if="modalOpen"
      :title="title"
      :rows="modalOption"
      :selectedData="selectedData"
      @closeBtn="closeBtn"
      @submit="handleSubmit"
      @update="handleUpdate"
    />
  </div>
</template>

<script setup>
import CustomTable from "@/components/common/CustomTable.vue";
import modal from "@/components/modal/RenewalEnrollModal.vue";
import { onMounted, ref, watch } from "vue";
import { renewalDataAPI } from "@/api/RenewalDataAPI.js";

const {
  enrollPictorialProduct,
  getMainPictorialList,
  getProductListById,
  updatePictorialProduct,
  deletePictorialProduct,
} = renewalDataAPI();

const props = defineProps({
  title: String,
  modalOpen: Boolean,
  selectedId: Number,
});

const emit = defineEmits(["closeBtn", "selectedList"]);

const columns = [
  {
    label: "순서",
    field: "sequence",
    width: "6%",
  },
  {
    label: "상품번호",
    field: "product_id",
    width: "6%",
  },
  {
    label: "상품명",
    field: "product",
    width: "14%",
  },
  {
    label: "문구",
    field: "comment",
    width: "21%",
  },
  {
    label: "화보 이미지",
    field: "img",
    width: "16%",
  },
  {
    label: "링크",
    field: "link",
    width: "21%",
  },
  {
    label: "등록일",
    field: "regdate",
    width: "8%",
  },
  {
    label: "관리",
    field: "active",
    width: "8%",
  },
];
// const rows = [
//   {
//     id: 0,
//     num: "1",
//     product: "MM Studio Class 0413- 898cc55 click",
//     comment:
//       "조선타자기 컨셉의 이런 저런 설명 쭉 나오고 쭉 설명 설명 설명 줄바뀜으로 나오면서 중앙정렬",
//     img: "SG0001 키보드.jpeg",
//     link: "https://www.youtube.com/watch?v=zo4f_B04-cE",
//     regdate: "2024-08-29",
//     active: "삭제",
//   },
//   {
//     id: 1,
//     num: "2",
//     product: "MM Studio Class 0413- 898cc55 click",
//     comment:
//       "조선타자기 컨셉의 이런 저런 설명 쭉 나오고 쭉 설명 설명 설명 줄바뀜으로 나오면서 중앙정렬",
//     img: "SG0001 키보드.jpeg",
//     link: "https://www.youtube.com/watch?v=zo4f_B04-cE",
//     regdate: "2024-08-29",
//     active: "삭제",
//   },
//   {
//     id: 2,
//     num: "3",
//     product: "MM Studio Class 0413- 898cc55 click",
//     comment:
//       "조선타자기 컨셉의 이런 저런 설명 쭉 나오고 쭉 설명 설명 설명 줄바뀜으로 나오면서 중앙정렬",
//     img: "SG0001 키보드.jpeg",
//     link: "https://www.youtube.com/watch?v=zo4f_B04-cE",
//     regdate: "2024-08-29",
//     active: "삭제",
//   },
//   {
//     id: 3,
//     num: "4",
//     product: "MM Studio Class 0413- 898cc55 click",
//     comment:
//       "조선타자기 컨셉의 이런 저런 설명 쭉 나오고 쭉 설명 설명 설명 줄바뀜으로 나오면서 중앙정렬",
//     img: "SG0001 키보드.jpeg",
//     link: "https://www.youtube.com/watch?v=zo4f_B04-cE",
//     regdate: "2024-08-29",
//     active: "삭제",
//   },
// ];
const modalOption = [
  {
    label: "상품번호",
    field: "product_id",
    placeholder: "상품 번호를 입력해주세요",
    sideSelect: [1, 2, 3],
    sideSelectField: "sequence",
    sideSelectPlaceHolder: "순서",
  },
  {
    label: "문구",
    field: "comment",
    placeholder: "내용을 입력해주세요",
    height: "160px",
    feildAlign: "start",
    textArea: true,
  },
  {
    label: "화보",
    field: "image",
    imgFile: true,
  },
];

const rows = ref([]);

const selectedData = ref(null);

const listClick = async (id) => {
  const data = await getMainPictorialList();
  data.map((item) => {
    console.log(item, id);
    if (item.pictorial_product_id === id) {
      selectedData.value = {
        ...item,
        image: {
          name: item.picture_name,
          path: item.picture_path,
        },
        sideSelect: item.sequence,
      };
    }
  });
  emit("selectedList", id);
};

const deleteBtn = async (id) => {
  if (confirm("정말 삭제하시겠습니까?")) {
    await deletePictorialProduct(id);
    fetchPictorialAllList();
  }
};

const handleSubmit = async (formData) => {
  console.log("formData", formData);

  if (!formData.product_id || !formData.comment || !formData.sequence) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  const isExistProduct = await getProductListById(formData.product_id);

  if (!isExistProduct) {
    alert("존재하지 않는 상품입니다.");
    return;
  }

  await enrollPictorialProduct(formData);
  closeBtn();
};

const handleUpdate = async (formData) => {
  console.log("formData", formData);

  if (!formData.product_id || !formData.comment || !formData.sequence) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  const isExistProduct = await getProductListById(formData.product_id);

  if (!isExistProduct) {
    alert("존재하지 않는 상품입니다.");
    return;
  }

  await updatePictorialProduct(formData);
  closeBtn();
};

const closeBtn = () => {
  selectedData.value = null;
  emit("closeBtn");
  fetchPictorialAllList();
};

const fetchPictorialAllList = async () => {
  const data = await getMainPictorialList();
  console.log(data);
  if (data) {
    rows.value = await Promise.all(
      data.map(async (item) => {
        const productData = await getProductListById(item.product_id);
        console.log(productData);
        return {
          ...item,
          img: item.picture_name,
          id: item.pictorial_product_id,
          product: productData.productList.name,
          link: productData.productList.shopping_link,
          active: "삭제",
        };
      })
    );
  } else {
    console.log("there is no data");
  }
};

onMounted(async () => {
  fetchPictorialAllList();
});
</script>

<style src="@/assets/css/adminMain/TableList.css" module></style>