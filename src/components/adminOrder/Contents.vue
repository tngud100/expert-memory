<template>
  <section>
    <div :class="$style.adminContainer">
      <div :class="$style.pageLabel">
        <span>주문 내역</span>
        <div :class="$style.header">
          <div :class="$style.searchBox">
            <input type="text" :class="$style.search" ref="searchRef" />
            <button
              type="button"
              :class="$style.searchBtn"
              @click="toggleIsSearch"
            >
              <IconSearch />
            </button>
          </div>
        </div>
      </div>
      <CustomTable :columns="tableColumns" :rows="tableRows" />
    </div>
  </section>
</template>

<script setup>
import CustomTable from "#/common/CustomTable.vue";
import IconSearch from "#/icons/IconSearch.vue";
import { ref } from "vue";

const searchRef = ref(null);

const tableColumns = [
  { label: "번호", field: "num", width: "5%" },
  { label: "아이디", field: "id", width: "15%" },
  { label: "상품명", field: "productName", width: "15%" },
  { label: "수량", field: "EA", width: "20%" },
  { label: "금액", field: "price", width: "20%" },
  { label: "총 금액", field: "totalPrice", width: "10%" },
  { label: "주문 날짜", field: "regdate", width: "15%" },
];

const tableRows = [
  {
    num: "1",
    id: "tngud100",
    productName: "SG-847A",
    EA: "3개",
    price: "3000원",
    totalPrice: "45000원",
    regdate: "2024-03-06",
  },
];
</script>

<style src="@/assets/css/adminOrder/Contents.css" module></style>