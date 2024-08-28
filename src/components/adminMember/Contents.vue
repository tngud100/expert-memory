<template>
  <section>
    <div :class="$style.adminContainer">
      <div :class="$style.pageLabel">
        <span>회원</span>
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
      <div>
        <CustomTable :columns="tableColumns" :rows="tableRows" />
      </div>
    </div>
  </section>
</template>

<script setup>
import CustomTable from "#/common/CustomTable.vue";
import IconSearch from "#/icons/IconSearch.vue";

const tableColumns = [
  { label: "번호", field: "num", width: "5%" },
  { label: "아이디", field: "id", width: "15%" },
  { label: "이름", field: "name", width: "15%" },
  { label: "이메일", field: "email", width: "20%" },
  { label: "휴대번호", field: "phone", width: "20%" },
  { label: "가입일", field: "regdate", width: "10%" },
  { label: "관리", field: "remark", width: "15%" },
];

const tableRows = [
  {
    num: "1",
    id: "tngud100",
    name: "김수형",
    email: "33285109@naver.com",
    phone: "010-5484-7856",
    regdate: "2024-06-07",
    remark: "수정 / 삭제",
  },
  {
    num: "2",
    id: "adminId",
    name: "김수형",
    email: "33285109@naver.com",
    phone: "010-5484-7856",
    regdate: "2024-06-07",
    remark: "수정 / 삭제",
  },
  {
    num: "3",
    id: "testId",
    name: "김수형",
    email: "33285109@naver.com",
    phone: "010-5484-7856",
    regdate: "2024-06-07",
    remark: "수정 / 삭제",
  },
];
</script>

<style src="@/assets/css/adminMember/Contents.css" module>
</style>