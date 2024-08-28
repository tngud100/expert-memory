<template>
  <section :class="$style.wrapper">
    <header :class="$style.header">
      <div :class="$style.headerSide">
        <input
          v-if="type === 'represent' || type === 'normal'"
          type="checkbox"
          :checked="props.shoppingBasket.isPicked"
          @change="$emit('checkedProduct', props.shoppingBasket.id)"
          :id="props.shoppingBasket.id"
        />
        <label :for="props.shoppingBasket.id" :class="$style.name">{{
          props.shoppingBasket.productName
        }}</label>
      </div>
      <button
        v-if="type === 'represent' || type === 'normal'"
        type="button"
        @click="$emit('deletedProduct', props.shoppingBasket.id)"
      >
        <IconGrayClose />
      </button>
    </header>
    <div
      :class="[
        type == 'normal' || type === 'option'
          ? $style.nomalContent
          : $style.multiContent,
      ]"
    >
      <div :class="$style.container">
        <div :class="$style.imgWrapper">
          <img
            :src="props.shoppingBasket.imgSrc"
            alt="상품 이미지"
            :class="$style.productImg"
          />
        </div>
        <div :class="$style.contentSide">
          <h4 :class="$style.subName">{{ itemData.detailName }}</h4>
          <ul :class="$style.tagList">
            <li
              v-for="(categoryName, index) in itemData.categoryName"
              :key="index"
              :class="$style.tagItem"
            >
              {{ categoryName }}
            </li>
          </ul>
          <div :class="$style.price">
            <IconCurrency :style="{ width: '16.452px', height: '12.339px' }" />
            {{ itemData.detailPrice.toLocaleString() }}
          </div>
          <div :class="$style.dilvery">배송비 3,000원</div>
        </div>
      </div>
      <div
        :class="$style.countWrapper"
        v-if="type === 'normal' || type === 'option'"
      >
        <button
          type="button"
          v-if="type === 'normal' || type === 'option'"
          :class="$style.countBtn"
          :disabled="props.shoppingBasket.item.count === 1"
          @click="
            $emit('subtractedProduct', props.shoppingBasket.item.detailId)
          "
        >
          <IconMinusDisabled v-show="props.shoppingBasket.item.count === 1" />
          <IconMinus v-show="props.shoppingBasket.item.count !== 1" />
        </button>
        <div :class="$style.count">{{ props.shoppingBasket.item.count }}</div>
        <button
          v-if="type === 'normal' || type === 'option'"
          type="button"
          :class="$style.countBtn"
          @click="$emit('addedProduct', props.shoppingBasket.item.detailId)"
        >
          <IconPlus />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import IconGrayClose from "#/icons/IconGrayClose.vue";
import IconCurrency from "#/icons/IconCurrency.vue";
import IconMinusDisabled from "#/icons/IconMinusDisabled.vue";
import IconMinus from "#/icons/IconMinus.vue";
import IconPlus from "#/icons/IconPlus.vue";
import { computed, onMounted, ref, watch } from "vue";

const emit = defineEmits([
  "checkedProduct",
  "deletedProduct",
  "addedProduct",
  "subtractedProduct",
]);

const props = defineProps({
  shoppingBasket: {
    type: Object,
    required: true,
  },
  itemDetailPrice: {
    type: Number,
  },
  // shoppingBasketId: {
  //   type: String,
  //   required: true,
  // },
});

const type = computed(() =>
  props.shoppingBasket.isMultiIOption
    ? itemData.value.categoryName.length > 1
      ? "represent"
      : "option"
    : "normal"
);

// const addProduct = () => {
//   emit("addedProduct", shoppingBasket.item.detailId);
// };

// console.log("shoppingBasket", shoppingBasket);
// watch(shoppingBasket.item.detailPrice, (newShoppingBasket) => {
//   console.log("shopping", newShoppingBasket);
// });

const itemData = computed(() => props.shoppingBasket.item);
// console.log(itemData.value);
</script>

<style src="@/assets/css/common/ProductPicked.css" module></style>