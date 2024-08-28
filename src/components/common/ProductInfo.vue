<template>
  <section :class="$style.wrapper">
    <header :class="$style.header">
      <div :class="$style.info">
        <h2 :class="$style.name">{{ props.productList.name }}</h2>
        <p :class="$style.price">
          <IconCurrency />
          {{ formattedPrice(props.productList.price) }}
        </p>
      </div>
      <div :class="$style.shareBtnWrapper">
        <button type="button" :class="$style.shareBtn">
          <IconShare />
        </button>
      </div>
    </header>

    <div :class="$style.deliveryInfo">
      <dl :class="$style.deliveryInfoList">
        <dt :class="[$style.deliveryInfoItem, $style.deliveryInfoTerm]">
          배송정보
        </dt>
        <dd :class="[$style.deliveryInfoItem, $style.deliveryPlatformWrapper]">
          <div :class="$style.deliveryPlatform">
            <span :class="$style.deliveryStrong">택배배송</span
            >&nbsp;|&nbsp;<span :class="$style.deliveryStrong">한진택배</span>
          </div>
          <p>1/10 도착 예정</p>
        </dd>
      </dl>
      <dl :class="$style.deliveryInfoList">
        <dt :class="[$style.deliveryInfoItem, $style.deliveryInfoTerm]">
          배송비
        </dt>
        <dd :class="$style.deliveryInfoItem">
          {{ formattedPrice(props.productList.deliveryPrice) }}원
        </dd>
      </dl>
    </div>
    <div :class="$style.characterInfoWrapper">
      <div
        :class="$style.characterInfo"
        v-for="item in category"
        :key="item.id"
      >
        <h4 :class="$style.characterTitle">
          {{ item }}
        </h4>
        <ul :class="$style.characterList">
          <li v-for="detailItem in categoryItem" :key="detailItem.id">
            <span
              v-if="detailItem.category === item"
              :data-detail="detailItem.detailName"
              :data-category="item"
              @click="updateSelectedItem"
              :class="[
                $style.characterItem,
                selectedDetail.some(
                  (item) =>
                    item.categoryName[0] === detailItem.category &&
                    item.detailName === detailItem.detailName
                )
                  ? $style.active
                  : '',
              ]"
            >
              {{ detailItem.detailName }}
            </span>
          </li>
        </ul>
      </div>
    </div>

    <ul :class="$style.selectedProductList">
      <li
        v-for="selectedProduct in props.selectedProducts"
        :class="$style.selectedProductItem"
        :key="selectedProduct.id"
      >
        <h5 :class="$style.selectedProductTitle">
          <div>
            <span v-for="(item, i) in selectedProduct.item" :key="i">
              {{ item.detailName }}
              <span v-if="i < selectedProduct.item.length - 1">
                &nbsp; / &nbsp;
              </span>
            </span>
          </div>

          <!-- {{ selectedProduct.type }}&nbsp;/&nbsp;{{ selectedProduct.color }} -->
          <button
            type="button"
            :class="$style.removeBtn"
            @click="deleteProduct(selectedProduct.id)"
          >
            <IconClose />
          </button>
        </h5>
        <div :class="$style.selectedProductPriceInfo">
          <div :class="$style.countWrapper">
            <button
              type="button"
              :class="$style.countBtn"
              @click="updateSubtractedCount(selectedProduct.id)"
              :disabled="selectedProduct.count === 1"
            >
              <IconMinusDisabled v-show="selectedProduct.count === 1" />
              <IconMinus v-show="selectedProduct.count !== 1" />
            </button>
            <div :class="$style.count">{{ selectedProduct.count }}</div>
            <button
              type="button"
              :class="$style.countBtn"
              @click="updateAddedCount(selectedProduct.id)"
            >
              <IconPlus />
            </button>
          </div>
          <div :class="$style.totalPrice">
            <span :class="$style.totalPriceStrong">
              {{
                calcTotalPrice(
                  selectedProduct.item.reduce(
                    (total, item) => total + item.detailPrice,
                    0
                  ),
                  selectedProduct.count
                )
              }} </span
            >원
          </div>
        </div>
      </li>
    </ul>

    <div :class="$style.purchaseBtnWrapper">
      <Button
        type="primary"
        text="구매 바로가기"
        eventName="onPurchase"
        @onPurchase="purchaseProduct"
      />
      <Button
        text="장바구니 담기"
        eventName="onStore"
        @onStore="storeProduct"
      />
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, watch, watchEffect } from "vue";
import { v4 as uuidv4 } from "uuid";
import { formattedPrice } from "@/utils";
import Button from "#/common/Button.vue";
import IconCurrency from "#/icons/IconCurrency.vue";
import IconShare from "#/icons/IconShare.vue";
import IconMinusDisabled from "#/icons/IconMinusDisabled.vue";
import IconMinus from "#/icons/IconMinus.vue";
import IconClose from "#/icons/IconClose.vue";
import IconPlus from "#/icons/IconPlus.vue";
import { useRouter } from "vue-router";

const props = defineProps({
  selectedProducts: {
    type: Array,
    required: true,
  },
  productList: {
    type: Object,
    required: true,
  },
});
console.log("updateSelectedProducts", props.selectedProducts);

const emit = defineEmits([
  "selectedDetail",
  "addCount",
  "subtractCount",
  "onStore",
  "addShoppingBasket",
  "deleteProduct",
]);

const router = useRouter();

const category = ref([]);
const categoryItem = ref([]);

const selectedDetail = ref([]);

onMounted(() => {
  // console.log("selectedProducts", selectedProducts);
  // console.log("productList", productList);
  props.productList.detailProduct.forEach((item) => {
    category.value.push(item.category);
    categoryItem.value.push({
      category: item.category,
      detailName: item.detailName,
    });
  });
  category.value = [...new Set(category.value)];
});

watch(
  () => selectedDetail.value,
  (newValue) => {
    if (newValue.length < category.value.length || newValue.length === 0) {
      return;
    }

    emit("selectedDetail", {
      id: uuidv4(),
      productName: props.productList.name,
      item: newValue,
    });
    resetSelectedItem();
  },
  { deep: true }
);

const resetSelectedItem = () => {
  selectedDetail.value = [];
};

const updateSelectedItem = (event) => {
  const detailName = event.target.dataset.detail;
  const categoryName = event.target.dataset.category;

  const detailItem = props.productList.detailProduct.find(
    (item) => item.category === categoryName && item.detailName === detailName
  );
  const detailPrice = detailItem.detailPrice;

  const key = {
    detailId: uuidv4(),
    categoryName: [categoryName],
    detailName: detailName,
    detailPrice: detailPrice,
    count: 1,
  };
  for (let i = 0; i < selectedDetail.value.length; i++) {
    if (selectedDetail.value[i].categoryName.includes(categoryName)) {
      selectedDetail.value.splice(i, 1);
    }
  }
  selectedDetail.value.push(key);
};

const updateAddedCount = (id) => emit("addCount", { id });

const updateSubtractedCount = (id) => emit("subtractCount", { id });

const deleteProduct = (id) => emit("deleteProduct", { id });

const purchaseProduct = ({ event }) => {
  if (props.selectedProducts.length === 0) {
    return alert("구매하실 상품의 옵션을 선택해주세요.");
  }
  const buyList = [];
  props.selectedProducts.forEach((product) => {
    if (product.item.length > 1) {
      product.item.forEach((productItem) => {
        buyList.push({
          productName: product.productName,
          id: product.id,
          item: productItem,
          isPicked: true,
          count: product.count,
          imgSrc: props.productList.importedProduct,
        });
      });
    } else {
      buyList.push({
        productName: product.productName,
        id: product.id,
        item: product.item[0],
        count: product.count,
        isPicked: true,
        imgSrc: props.productList.importedProduct,
      });
    }
  });
  router.push({
    path: "/order",
    query: { from: "productDetail", params: JSON.stringify(buyList) },
  });
};

const storeProduct = () => {
  emit("addShoppingBasket");
};

const calcTotalPrice = (price, count) => formattedPrice(price * count);
</script>

<style src="@/assets/css/common/ProductInfo.css" module></style>
