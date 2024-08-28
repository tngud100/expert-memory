<template>
  <div :class="$style.wrapper">
    <ul :class="$style.productList">
      <Product
        type="normal"
        :id="1"
        name="Gateron Switch Opener"
        :price="189000"
        :backgroundImg="firstPcb"
        @click="moveKeyboardDetailPage(6)"
      />
      <Product
        type="normal"
        :id="1"
        name="Geon DailyLube Plate"
        :price="149000"
        :backgroundImg="firstPcb"
        @click="moveKeyboardDetailPage(6)"
      />
      <Product
        type="normal"
        :id="1"
        name="Geon Switch Opener"
        :price="189000"
        :backgroundImg="firstPcb"
        @click="moveKeyboardDetailPage(6)"
      />
      <Product
        type="normal"
        :id="1"
        name="Geon DailyLube Plate"
        :price="149000"
        :backgroundImg="firstPcb"
        @click="moveKeyboardDetailPage(6)"
      />
      <Product
        type="normal"
        :id="1"
        name="Geon DailyLube Plate"
        :price="149000"
        :backgroundImg="firstPcb"
        @click="moveKeyboardDetailPage(6)"
      />
    </ul>
  </div>
</template>

<script setup>
import firstPcb from "@/assets/images/pcb_1.jpg";
import Product from "#/common/Product.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const moveKeyboardDetailPage = (id) => {
  router.push({
    path: `/keyboard/${id}`,
    query: { productId: id },
  });
};
</script>

<style src="@/assets/css/pcb/Contents.css" module></style>
