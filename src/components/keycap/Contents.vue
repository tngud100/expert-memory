<template>
  <div :class="$style.wrapper">
    <ul :class="$style.productList">
      <Product
        type="normal"
        :id="1"
        name="Gateron Keycap Opener"
        :price="189000"
        :backgroundImg="firstKeycap"
        @click="moveKeyboardDetailPage(6)"
      />
      <Product
        type="normal"
        :id="1"
        name="Geon DailyLube Plate"
        :price="149000"
        :backgroundImg="secondKeycap"
        @click="moveKeyboardDetailPage(6)"
      />
      <Product
        type="normal"
        :id="1"
        name="Geon Keycap Opener"
        :price="189000"
        :backgroundImg="thirdKeycap"
        @click="moveKeyboardDetailPage(6)"
      />
      <Product
        type="normal"
        :id="1"
        name="Geon DailyLube Plate"
        :price="149000"
        :backgroundImg="fourthKeycap"
        @click="moveKeyboardDetailPage(6)"
      />
      <Product
        type="normal"
        :id="1"
        name="Geon DailyLube Plate"
        :price="149000"
        :backgroundImg="fourthKeycap"
        @click="moveKeyboardDetailPage(6)"
      />
    </ul>
  </div>
</template>

<script setup>
import firstKeycap from "@/assets/images/keycap_1.jpg";
import secondKeycap from "@/assets/images/keycap_2.jpg";
import thirdKeycap from "@/assets/images/keycap_3.jpg";
import fourthKeycap from "@/assets/images/keycap_4.jpg";
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

<style src="@/assets/css/keycap/Contents.css" module></style>
