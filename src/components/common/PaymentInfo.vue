<template>
  <div :class="$style.wrapper">
    <h3 :class="$style.title">결제 예상 금액</h3>
    <div :class="$style.table">
      <div :class="$style.head">상품금액</div>
      <div :class="$style.data">
        {{ props.totalProductsPrice.toLocaleString() }}
        <span :class="$style.commonCurrency">원</span>
      </div>
      <div :class="$style.head">상품할인금액</div>
      <div :class="$style.data">
        0<span :class="$style.commonCurrency">원</span>
      </div>
      <div :class="$style.head">배송비</div>
      <div :class="$style.data">
        {{ props.totalDelivery.toLocaleString()
        }}<span :class="$style.commonCurrency">원</span>
      </div>
    </div>
    <div :class="$style.totalPrice">
      {{ props.totalPrice.toLocaleString()
      }}<span :class="$style.commonCurrency">원</span>
    </div>
    <button type="button" :class="$style.btn" @click="moveOrderPage()">
      <!-- @click="recipientForm ? payment() : moveOrderPage()" -->
      구매하기
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
// { totalProductsPrice, totalDelivery, totalPrice }
const props = defineProps({
  totalProductsPrice: {
    type: Number,
    required: true,
  },
  totalDelivery: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  // recipientForm: {
  //   type: Object,
  //   required: true,
  // },
});
// console.log(recipientForm);
const router = useRouter();
// const payment = () => {};

const moveOrderPage = () => {
  console.log(props.totalProductsPrice);
  if (props.totalProductsPrice === 0) {
    return alert("구매하실 상품의 체크박스를 체크해주세요.");
  }
  router.push({ path: "/order", query: { from: "basket" } });
};
</script>

<style src="@/assets/css/common/PaymentInfo.css" module></style>
