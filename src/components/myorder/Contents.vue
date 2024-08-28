<template>
  <section>
    <OrderProduct v-if="props.menuNum === 0" />
    <OrderChange v-if="props.menuNum === 1" />
  </section>
</template>

<script setup>
import OrderProduct from "#/myorder/OrderProduct.vue";
import OrderChange from "#/myorder/OrderChange.vue";

const props = defineProps({
  menuNum: Number,
});
</script>
<style src="@/assets/css/myorder/Contents.css" module></style>
