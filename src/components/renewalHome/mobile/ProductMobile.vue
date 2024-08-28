<template>
  <div :class="$style.wrapper">
    <div ref="menuBox">
      <div :class="$style.titleBox">
        <p :class="$style.subTitle">조선타자기 베스트</p>
        <div :class="$style.textBox">
          <span :class="$style.title">상품</span>
          <a :class="$style.moreLink" href="/product/keyboard">더보기 +</a>
        </div>
      </div>
      <div :class="$style.menuWrapper">
        <div :class="$style.menuBtnBox">
          <button
            :class="[$style.menuBtn, { [$style.active]: item.idx === menuNum }]"
            v-for="item in productItem"
            :key="item.idx"
            @click="clickMenu(item.idx)"
          >
            {{ item.category }}
          </button>
        </div>
      </div>
    </div>
    <div :class="$style.bottomContainer" ref="productBox">
      <div
        :class="$style.product"
        v-for="item in filterProductItem"
        :key="item.idx"
      >
        <div :class="$style.infoBox">
          <p :class="$style.category">{{ item.category }}</p>
          <p :class="$style.productName">{{ item.name }}</p>
        </div>
        <div :class="$style.descBox">
          <div v-html="convertHTML(item.describe)"></div>
        </div>
        <div :class="$style.imgBox">
          <img :src="item.imgSrc" alt="productImg" :class="$style.productImg" />
        </div>
        <div :class="$style.moreBox">
          <div
            :class="$style.moreBtn"
            @click="linkToStore(item.link)"
            @mouseover="gotoStore = true"
            @mouseleave="gotoStore = false"
          >
            자세히 보기
            <IconHomeProductArrow
              v-if="!gotoStore"
              :class="$style.rightArrow"
            />
            <IconHomeProductRedArrow
              v-if="gotoStore"
              :class="$style.rightArrow"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import IconHomeProductArrow from "#/icons/IconHomeProductArrow.vue";
import IconHomeProductRedArrow from "#/icons/IconHomeProductRedArrow.vue";
import { fadeInElements } from "@/utils/gsapUtils.js";
import { renewalDataAPI } from "@/api/RenewalDataAPI.js";

const { getMainBestList, getProductListById } = renewalDataAPI();

const gotoStore = ref(false);
const menuNum = ref(0);

const menuBox = ref(null);
const productBox = ref(null);

const productItem = ref([]);

const categoryList = ref(["키보드", "스위치", "PCB", "키캡", "도구"]);

const filterProductItem = computed(() =>
  productItem.value.filter((item) => item.idx === menuNum.value)
);

const clickMenu = (num) => {
  menuNum.value = num;
};

const linkToStore = (link) => {
  window.open(link);
};

const convertHTML = (text) => {
  return text.replace(/(?:\r\n|\r|\n)/g, "<br>");
};

const fetchBestAllList = async () => {
  const bestData = await getMainBestList();
  const bestList = bestData.productLists;
  const bestImageList = bestData.productImageLists;

  if (bestData) {
    const products = await Promise.all(
      bestList.map(async (item, index) => {
        const productData = await getProductListById(item.product_id);
        return {
          idx: index,
          name: productData.productList?.name,
          category: productData.productList?.category,
          link: productData.productList?.shopping_link,
          describe: bestList.find(
            (best) => best.best_product_id === item.best_product_id
          ).comment,
          imgSrc: bestImageList.find(
            (img) => img.best_product_id === item.best_product_id
          )?.path,
        };
      })
    );

    productItem.value = products.sort((a, b) => {
      return (
        categoryList.value.indexOf(a.category) -
        categoryList.value.indexOf(b.category)
      );
    });
  } else {
    console.log("there is no data");
  }
};

onMounted(async () => {
  await fetchBestAllList();
  fadeInElements(
    menuBox.value,
    [menuBox.value, productBox.value],
    null,
    50,
    0,
    1,
    80,
    0.3
  );
});
</script>

<style src="@/assets/css/renewalHome/mobile/ProductMobile.css" module></style>
