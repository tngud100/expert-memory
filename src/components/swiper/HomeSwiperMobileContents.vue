<template>
  <div>
    <div :class="$style.swiperText">
      <div :class="$style.textBox" ref="textBox">
        <p
          v-if="item.length > 0 && item[currentPage - 1]"
          v-html="convertHTML(item[currentPage - 1].text)"
          :class="[$style.text, 'text']"
        ></p>
      </div>
    </div>
    <div>
      <Swiper
        v-if="swiperInitialized"
        :slidesPerView="1"
        :spaceBetween="0"
        :loop="false"
        :autoplay="false"
        :pagination="true"
        :item="item"
        :imgSize="itemSize"
        @currentPage="changePage"
      />
    </div>
  </div>
</template>

<script setup>
import Swiper from "#/swiper/AllScreenSwipe.vue";
import { onMounted, ref } from "vue";
import { XdirectfadeIn } from "@/utils/gsapUtils";
import { renewalDataAPI } from "@/api/RenewalDataAPI.js";

const { getMainPictorialList, getProductListById } = renewalDataAPI();

const textBox = ref(null);
const itemSize = {
  height: 375,
};

const item = ref([]);
const currentPage = ref(1);

const swiperInitialized = ref(false); // Swiper가 초기화되었는지 확인하는 변수

const convertHTML = (text) => {
  return text.replace(/(?:\r\n|\r|\n)/g, "<br>");
};

const fetchPictorialAllList = async () => {
  const data = await getMainPictorialList();
  if (data) {
    return Promise.all(
      data.map(async (item, index) => {
        const productData = await getProductListById(item.product_id);
        return {
          idx: item.sequence,
          img: item.picture_path,
          text: item.comment,
          link: productData.productList.shopping_link,
        };
      })
    );
  } else {
    console.log("there is no data");
    return [];
  }
};

onMounted(async () => {
  try {
    const loadedItems = await fetchPictorialAllList();
    item.value = loadedItems;
    console.log(item.value);

    // 데이터가 로드된 후에 Swiper를 초기화
    swiperInitialized.value = true;
  } catch (error) {
    console.error("Error initializing items:", error);
  }
});

const changePage = (page) => {
  currentPage.value = page;
  XdirectfadeIn(textBox.value);
};
</script>

<style src="@/assets/css/swiper/HomeSwiperMobileContents.css" module></style>
