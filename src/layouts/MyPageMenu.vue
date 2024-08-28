<template>
  <div :class="$style.mypageMenu">
    <div :class="$style.menuContiner">
      <div
        :class="$style.menuBox"
        v-for="(menu, index) in menuList"
        :key="index"
      >
        <div :class="$style.menuTitle">{{ menu.title }}</div>
        <div
          :class="$style.menuItem"
          v-for="listItem in menu.list"
          :key="listItem.listNum"
        >
          <span :class="$style.listItem" @click="clickMenuList(listItem)">{{
            listItem.name
          }}</span
          ><br />
        </div>
        <div :class="$style.divideLine"></div>
      </div>
      <div :class="$style.info">
        <span :class="$style.centerName">고객센터</span>
        <p :class="$style.phoneNum">051-000-0000</p>
        <span :class="$style.time">평일 09:00 ~ 18:00</span><br />
        <span :class="$style.time">점심시간 12:00 ~ 13:00</span><br />
        <span :class="$style.dayOff">주말, 공휴일 휴무</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["menuItem"]);

const menuList = {
  order: {
    title: "주문내역",
    list: [
      { name: "주문조회", listNum: 0 },
      { name: "취소/교환/환불 내역", listNum: 1 },
    ],
  },
  ask: {
    title: "문의내역",
    list: [
      { name: "1:1문의", listNum: 2 },
      { name: "리뷰", listNum: 3 },
    ],
  },
  userInfo: {
    title: "회원 정보",
    list: [
      { name: "회원정보 수정", listNum: 4 },
      { name: "회원탈퇴", listNum: 5 },
      // { name: '배송지 관리', listNum: 5 },
    ],
  },
};

const clickMenuList = (listItem) => {
  emit("menuItem", listItem);
};
</script>

<style src="@/assets/css/layouts/MyPageMenu.css" module></style>