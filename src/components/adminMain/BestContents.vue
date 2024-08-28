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
      :rows="modalOption"
      :title="title"
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
  enrollBestProduct,
  getMainBestList,
  getProductListById,
  updateBestProduct,
  deleteBestProduct,
} = renewalDataAPI();

const props = defineProps({
  title: String,
  modalOpen: Boolean,
  selectedId: Number,
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
    field: "product",
    width: "15%",
  },
  {
    label: "문구",
    field: "comment",
    width: "20%",
  },
  {
    label: "이미지",
    field: "img",
    width: "15%",
  },
  {
    label: "링크",
    field: "link",
    width: "20%",
  },
  {
    label: "등록일",
    field: "regdate",
    width: "8%",
  },
  {
    label: "관리",
    field: "active",
    width: "6%",
  },
];
// const rows = [
//   {
//     id: 0,
//     category: "키보드",
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
//     category: "키캡",
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
//     category: "PCB",
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
    label: "이미지",
    field: "image",
    imgFile: true,
  },
];

const rows = ref([]);

const selectedData = ref(null);

const listClick = async (id) => {
  const data = await getMainBestList();
  console.log(data);
  const productList = data.productLists;
  const productImageList = data.productImageLists;
  productList.map((item) => {
    if (item.best_product_id === id) {
      selectedData.value = {
        ...item,
        image: productImageList.find(
          (img) => img.best_product_id === item.best_product_id
        ),
      };
    }
  });

  emit("selectedList", id);
};
const deleteBtn = async (id) => {
  if (confirm("정말 삭제하시겠습니까?")) {
    await deleteBestProduct(id);
    fetchBestAllList();
  }
};

const handleSubmit = async (formData) => {
  console.log("formData", formData);

  if (!formData.product_id || !formData.comment) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  const isExistProduct = await getProductListById(formData.product_id);
  if (!isExistProduct) {
    alert("해당 상품이 존재하지 않습니다.");
    return;
  }

  await enrollBestProduct(formData);
  closeBtn();
};

const handleUpdate = async (formData) => {
  console.log("formData", formData);

  if (!formData.product_id || !formData.comment) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  const isExistProduct = await getProductListById(formData.product_id);
  if (!isExistProduct) {
    alert("해당 상품이 존재하지 않습니다.");
    return;
  }

  await updateBestProduct(formData);
  closeBtn();
};

const closeBtn = () => {
  selectedData.value = null;
  emit("closeBtn");
  fetchBestAllList();
};

const fetchBestAllList = async () => {
  const bestData = await getMainBestList();
  const bestList = bestData.productLists;
  const bestImageList = bestData.productImageLists;

  if (bestData) {
    rows.value = await Promise.all(
      bestList.map(async (item) => {
        const productData = await getProductListById(item.product_id);
        return {
          ...item,
          id: item.best_product_id,
          product: productData.productList?.name,
          category: productData.productList?.category,
          link: productData.productList?.shopping_link,
          img: bestImageList.find(
            (img) => img.best_product_id === item.best_product_id
          )?.name,
          active: "삭제",
        };
      })
    );
  } else {
    console.log("there is no data");
  }
};

onMounted(() => {
  fetchBestAllList();
});
</script>

<style src="@/assets/css/adminMain/TableList.css" module></style>