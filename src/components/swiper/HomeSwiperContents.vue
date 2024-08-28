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
      <div :class="$style.progressBox">
        <div :class="$style.progressBar">
          <div
            :class="$style.progress"
            :style="{
              width: (currentPage / item.length) * 100 + '%',
            }"
          ></div>
        </div>
        <div :class="$style.paginationBox">
          <IconPaginationLeftArrow
            :class="['prevBtn', $style.prevBtn, $style.btn]"
          />
          <div :class="$style.currentPage">
            {{ currentPage }}/{{ item.length }}
            <IconPaginationPause
              :class="[$style.pauseBtn, $style.btn]"
              v-if="autoSwipe"
              @click="autoToggle"
            />
            <IconPaginationPlay
              :class="[$style.playBtn, $style.btn]"
              v-else
              @click="autoToggle"
            />
          </div>
          <IconPaginationRightArrow
            :class="['nextBtn', $style.nextBtn, $style.btn]"
          />
        </div>
      </div>
    </div>

    <Swiper
      v-if="swiperInitialized"
      :slidesPerView="1"
      :spaceBetween="0"
      :autoplay="true"
      :loop="true"
      :pagination="false"
      :autoSwipe="autoSwipe"
      :item="item"
      :imgSize="itemSize"
      @currentPage="changePage"
    />
  </div>
</template>

<script setup>
import Swiper from "#/swiper/AllScreenSwipe.vue";
import IconPaginationLeftArrow from "#/icons/IconPaginationLeftArrow.vue";
import IconPaginationRightArrow from "#/icons/IconPaginationRightArrow.vue";
import IconPaginationPause from "#/icons/IconPaginationPause.vue";
import IconPaginationPlay from "#/icons/IconPaginationPlay.vue";
import { onMounted, ref } from "vue";
import { XdirectfadeIn } from "@/utils/gsapUtils";
import { renewalDataAPI } from "@/api/RenewalDataAPI.js";

const { getMainPictorialList, getProductListById } = renewalDataAPI();

const textBox = ref(null);
const autoSwipe = ref(true);
const currentPage = ref(1);
const itemSize = {
  minWidth: 1400,
  maxWidth: 1920,
  height: 798,
};
const item = ref([]);
const swiperInitialized = ref(false); // Swiper가 초기화되었는지 확인하는 변수

const changePage = (page) => {
  currentPage.value = page;
  XdirectfadeIn(textBox.value);
};

const autoToggle = () => {
  autoSwipe.value = !autoSwipe.value;
};

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
</script>

<style src="@/assets/css/swiper/HomeSwiperContents.css" module></style>
