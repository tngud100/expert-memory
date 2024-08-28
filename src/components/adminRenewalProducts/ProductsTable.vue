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
  enrollProduct,
  getProductListById,
  updateRenewalProduct,
  deleteRenewalProduct,
} = renewalDataAPI();

const props = defineProps({
  modalOpen: Boolean,
  title: String,
  selectedId: Number,
  fetchFunc: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(["closeBtn", "selectedList"]);

const columns = [
  {
    label: "상품번호",
    field: "product_id",
    width: "6%",
  },
  {
    label: "카테고리",
    field: "category",
    width: "10%",
  },
  {
    label: "상품명",
    field: "name",
    width: "18%",
  },
  {
    label: "금액",
    field: "amount",
    width: "10%",
  },
  {
    label: "이미지",
    field: "img",
    width: "18%",
  },
  {
    label: "링크",
    field: "shopping_link",
    width: "18%",
  },
  {
    label: "등록일",
    field: "regdate",
    width: "10%",
  },
  {
    label: "관리",
    field: "active",
    width: "10%",
  },
];
const modalOption = [
  {
    label: "카테고리",
    field: "category",
    select: ["키보드", "스위치", "PCB", "키캡", "도구"],
    placeholder: "카테고리를 선택해주세요",
  },
  {
    label: "상품명",
    field: "name",
    placeholder: "상품을 입력해주세요",
  },
  {
    label: "금액",
    field: "amount",
    placeholder: "금액을 입력해주세요",
  },
  {
    label: "이미지",
    field: "image",
    placeholder: "이미지를 입력해주세요",
    imgFile: true,
  },
  {
    label: "링크",
    field: "shopping_link",
    placeholder: "URL주소를 입력해주세요",
  },
];
// const rows = [
//   {
//     id: 0,
//     category: "키보드",
//     product: "MM Studio Class 0413- 898cc55 click",
//     price: formattedPrice(180239) + "원",
//     img: "SG0001 키보드.jpeg",
//     link: "https://www.youtube.com/watch?v=zo4f_B04-cE",
//     regdate: "등록일",
//     active: "삭제",
//   },
// ];
const rows = ref([]);

const selectedData = ref(null);

const listClick = async (id) => {
  const data = await getProductListById(id);
  const productList = data.productList;
  const productImageList = data.productImageList;
  const clickedData = {
    ...productList,
    image: productImageList,
  };

  selectedData.value = clickedData;
  emit("selectedList", id);
};

const deleteBtn = async (id) => {
  if (confirm("정말 삭제하시겠습니까?")) {
    await deleteRenewalProduct(id);
    getFetchData();
  }
};

const handleSubmit = async (formData) => {
  console.log("formData", formData);
  if (
    !formData.category ||
    !formData.name ||
    !formData.amount ||
    !formData.shopping_link
  ) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  if (formData.shopping_link.includes("http") === false) {
    alert("http:// 또는 https:// 를 포함한 URL을 입력해주세요.");
    return;
  }

  await enrollProduct(formData);
  closeBtn();
};

const handleUpdate = async (formData) => {
  console.log("formData", formData);
  formData.image;

  if (
    !formData.category ||
    !formData.name ||
    !formData.amount ||
    !formData.shopping_link
  ) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  if (formData.shopping_link.includes("http") === false) {
    alert("http:// 또는 https:// 를 포함한 URL을 입력해주세요.");
    return;
  }

  await updateRenewalProduct(formData);
  closeBtn();
};

const closeBtn = () => {
  selectedData.value = null;
  emit("closeBtn");
  getFetchData();
};

const getFetchData = async () => {
  rows.value = [];
  const fetchData = await props.fetchFunc();

  fetchData.map((item) => {
    if (item.category === props.title) {
      rows.value.push({
        ...item,
        select: item.category,
      });
    }
  });
};

onMounted(() => {
  getFetchData();
});
</script>

<style src="@/assets/css/adminMain/TableList.css" module></style>