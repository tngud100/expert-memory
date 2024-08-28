<template>
  <div :class="$style.textWrapper">
    <span :class="$style.text">상품</span>
  </div>
  <Nav />
  <div :class="$style.productWrapper">
    <ul :class="$style.productList">
      <Product
        v-for="item in productList"
        :key="item.id"
        :id="item.id + 1"
        :productImg="item.listImg"
        :backgroundImg="item.listBackImg"
        :price="item.amount"
        :name="item.name"
        :isMobile="true"
        @click="moveKeyboardDetailPage(item.link)"
      />
    </ul>
  </div>
</template>

<script setup>
import Nav from "@/layouts/RenewalProductMobileNav.vue";
import Product from "#/common/Product.vue";
import { useRouter } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";
import { renewalDataAPI } from "@/api/RenewalDataAPI.js";

const { getProductAllList } = renewalDataAPI();

const router = useRouter();

const productList = ref([]);

const path = computed(() => router.currentRoute.value.path);

watch(path, (newVal) => {
  fetchProductAllList();
});

const moveKeyboardDetailPage = (link) => {
  window.open(link);
};

const setCategory = (category) => {
  switch (category) {
    case "keyboard":
      return "키보드";
    case "switch":
      return "스위치";
    case "pcb":
      return "PCB";
    case "keycap":
      return "키캡";
    case "tool":
      return "도구";
    default:
      return "키보드";
  }
};

const fetchProductAllList = async () => {
  productList.value = [];
  const data = await getProductAllList();
  const productLists = data.productLists;
  const productImageLists = data.productImageLists;
  console.log(data);
  if (productList) {
    productLists.forEach((item) => {
      if (
        item.category ===
        setCategory(path.value.split("/").pop().toLocaleLowerCase())
      ) {
        productList.value.push({
          id: item.product_id,
          name: item.name,
          amount: item.amount + "원",
          listBackImg: productImageLists.find(
            (img) => img.product_id === item.product_id
          )?.path,
          link: item.shopping_link,
        });
      }
    });
    return productList;
  } else {
    console.log("there is no data");
  }
};

onMounted(() => {
  fetchProductAllList();
});
</script>

<style src="@/assets/css/renewalProduct/MobileContents.css" module></style>
