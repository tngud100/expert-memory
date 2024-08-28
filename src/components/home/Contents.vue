<template>
  <section :class="$style.contents">
    <div
      v-for="(item, index) in homeItem"
      :key="index"
      :class="$style.backgroundWrapper"
      @click="moveDetailPage(item.type, item.productId)"
    >
      <img
        :src="item.mainImg"
        :alt="item.mainImgName"
        :class="$style.backgroundImgs"
      />
      <div :class="$style.descWrapper">
        <span
          :class="[
            $style.nameLabel,
            index === 0
              ? $style.productBlackName
              : index === 1
              ? $style.productBlackName
              : $style.productWhiteName,
          ]"
          >제품명</span
        >
        <div :class="$style.nameWrapper">
          <div
            :class="[
              $style.productName,
              index === 0
                ? $style.firstName
                : index === 1
                ? $style.secondName
                : $style.thirdName,
            ]"
          >
            {{ item.name }}
          </div>
          <div :class="$style.arrowWrapper">
            <component
              :is="
                index === 0
                  ? IconHomeBlackArrow
                  : index === 1
                  ? IconHomePurpleArrow
                  : IconHomeGreenArrow
              "
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import IconHomeBlackArrow from "#/icons/IconHomeBlackArrow.vue";
import IconHomePurpleArrow from "#/icons/IconHomePurpleArrow.vue";
import IconHomeGreenArrow from "#/icons/IconHomeGreenArrow.vue";
import { getProductAPI } from "@/api/ProductGetDataAPI.js";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { getProductMainList } = getProductAPI();
const homeItem = ref([]);

const getHomeData = async () => {
  const data = await getProductMainList();
  for (const itemData of data) {
    homeItem.value.push({
      name: itemData.title,
      mainImg: itemData.mainImg,
      mainImgName: itemData.mainImgName,
      type: itemData.type,
      productId: itemData.productId,
      // Icon:
      //   itemData.index === 0
      //     ? IconHomeBlackArrow
      //     : itemData.index === 1
      //     ? IconHomePurpleArrow
      //     : IconHomeGreenArrow,
    });
  }
};

const moveDetailPage = (type, id) => {
  router.push({
    path: `/${type}/${id}`,
    query: { productId: id },
  });
};

onMounted(() => {
  getHomeData();
});
</script>

<style src="@/assets/css/home/Contents.css" module></style>
