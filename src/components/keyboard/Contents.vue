<template>
  <div :class="$style.wrapper">
    <ul :class="$style.productList">
      <Product
        v-for="item in productList"
        :key="item.id"
        :id="item.id + 1"
        :productImg="item.listImg"
        :backgroundImg="item.listBackImg"
        :price="item.amount"
        :name="item.name"
        @click="moveKeyboardDetailPage(item.id)"
      />
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Product from "#/common/Product.vue";
import { getProductAPI } from "@/api/ProductGetDataAPI.js";
import { onMounted, ref } from "vue";

const { getProductList } = getProductAPI();

const router = useRouter();

const productList = ref([]);

const moveKeyboardDetailPage = (id) => {
  router.push({
    path: `/keyboard/${id}`,
    query: { productId: id },
  });
};

const getProductData = async () => {
  const dataList = await getProductList();
  for (let i = 0; i < dataList.value.length; i++) {
    if (dataList.value[i].type === "keyboard") {
      const data = dataList.value[i];
      productList.value.push({
        id: data.productId,
        name: data.name,
        listImg: data.listImg,
        listBackImg: data.listBackImg,
        amount: data.amount,
      });
    }
  }
};

onMounted(() => {
  getProductData();
});
</script>

<style src="@/assets/css/keyboard/Contents.css" module></style>
