<template>
  <div :class="$style.productList">
    <img
      :src="item.representImg"
      alt="Product Image"
      :class="$style.productRepresentImg"
    />
    <div :class="$style.item">{{ item.name }}</div>
    <div :class="$style.item">{{ item.type }}</div>
    <div :class="$style.detailAndCategoryItem">
      <div v-for="detail in item.detailList" :key="detail" :class="$style.item">
        {{ detail.name }}
      </div>
    </div>
    <div :class="$style.detailAndCategoryItem">
      <div
        v-for="(detailList, index) in item.detailList"
        :class="$style.item"
        :key="index"
      >
        {{ detailList.category }}
      </div>
    </div>
    <div :class="$style.item">{{ item.amount }}원</div>
    <div :class="$style.item">{{ item.createDate }}</div>
    <div :class="$style.item">{{ item.modifiedDate }}</div>
    <div style="display: flex">
      <button @click="modifyBtn" :class="$style.iconBox">
        <writeIcon />
      </button>
      <button @click="deleteBtn" :class="$style.iconBox">
        <closeIcon />
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

import writeIcon from "#/icons/IconWrite.vue";
import closeIcon from "#/icons/IconClose.vue";

const emit = defineEmits(["clickModifyBtn"]);

const props = defineProps({
  item: Object,
});

const modifyBtn = () => {
  emit("clickModifyBtn", props.item);
};
const deleteBtn = () => {
  emit("clickDeleteBtn", props.item.productId);
};
</script>

<style src="@/assets/css/adminProducts/Cards.css" module></style>
