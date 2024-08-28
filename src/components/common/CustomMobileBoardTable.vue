<template>
  <div
    v-for="(item, index) in rows"
    :key="index"
    :class="$style.listItem"
    @click="handleRowClick(index)"
  >
    <div :class="$style.title">
      {{ item.title }}
    </div>
    <div :class="$style.subText">
      <span :class="$style.text" v-if="type == 'download'">
        [{{ item.category }}]&nbsp;
      </span>
      <span :class="[$style.text, $style.author]">
        {{ item.author }}
      </span>
      <span :class="$style.text">
        {{ item.date }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  rows: Array,
  type: String,
});
const router = useRouter();

const handleRowClick = (index) => {
  if (props.rows[index].linkTo) {
    router.push(props.rows[index].linkTo + "/" + props.rows[index].num);
  }
};
</script>

<style src="@/assets/css/common/CustomMobileBoardTable.css" module></style>