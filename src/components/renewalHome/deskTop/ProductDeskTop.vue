<template>
  <div :class="$style.wrapper">
    <div :class="$style.menuContainer" ref="menuText">
      <div :class="$style.menuTitle">
        <p :class="$style.subTitle">조선타자기 베스트</p>
        <p :class="$style.title">상품</p>
      </div>
      <div :class="$style.linkBox">
        <router-link to="/product/keyboard" :class="$style.linkTo"
          >더보기 +</router-link
        >
      </div>
    </div>
    <div :class="$style.contentContainer" ref="menuList">
      <div :class="$style.menuButtonBox">
        <button
          :class="[$style.menuBtn, { [$style.active]: item.idx === menuNum }]"
          v-for="item in productCategories"
          :key="item.idx"
          @click="clickMenu(item.idx)"
        >
          {{ item.category }}
        </button>
      </div>

      <div
        :class="$style.contentBox"
        v-for="item in filterProductItem"
        :key="item.idx"
      >
        <div :class="$style.leftContent">
          <div :class="$style.nameBox">
            <p :class="$style.categoryName">{{ item.category }}</p>
            <p :class="$style.productName">{{ item.name }}</p>
          </div>
          <div :class="$style.describeBox">
            <div v-html="convertHTML(item.describe)"></div>
          </div>
          <div :class="$style.buttonBox">
            <button
              :class="$style.gotoStore"
              @click="linkToStore(item.link)"
              @mouseover="gotoStore = true"
              @mouseleave="gotoStore = false"
            >
              상품 보러가기
              <IconHomeProductArrow
                v-if="!gotoStore"
                :class="$style.rightArrow"
              />
              <IconHomeProductRedArrow
                v-if="gotoStore"
                :class="$style.rightArrow"
              />
            </button>
          </div>
        </div>
        <div :class="$style.rightContent">
          <div :class="$style.imageBox">
            <img :src="item.imgSrc" alt="productImg" :class="$style.Image" />
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

const categoryList = ref(["키보드", "스위치", "PCB", "키캡", "도구"]);

const menuText = ref(null);
const menuList = ref(null);

const productItem = ref([]);

const productCategories = ref([]);

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

    productItem.value = products;

    for (var i = 0; i <= categoryList.value.length; i++) {
      products.map((item) => {
        if (categoryList.value[i] === item.category) {
          productCategories.value.push({
            idx: item.idx,
            category: item.category,
          });
          return;
        }
      });
    }
  } else {
    console.log("there is no data");
  }
};

onMounted(async () => {
  await fetchBestAllList();
  fadeInElements(
    menuText.value,
    [menuText.value, menuList.value],
    null,
    50,
    0,
    1,
    80,
    0.3
  );
});
</script>
<style src="@/assets/css/renewalHome/deskTop/ProductDeskTop.css" module></style>
