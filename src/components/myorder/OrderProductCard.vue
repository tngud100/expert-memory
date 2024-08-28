<template>
  <div>
    <div
      :class="$style.date"
      v-if="
        props.data.orderState === 0 ||
        props.data.orderState === 1 ||
        props.data.orderState === 2
      "
    >
      <div><IconListItem />&nbsp;{{ props.data.date }}</div>
      <button :class="$style.detailOrder">
        주문 상세&nbsp;<IconRightArrow />
      </button>
    </div>
    <div v-else :class="$style.orderInfo">
      <div :class="$style.applyDate">
        {{ headerState }} 접수일: {{ eventDate }} |
      </div>
      <div :class="$style.changeInfo">
        &nbsp;주문일:{{ props.data.date }} | 주문번호: {{ props.data.orderNum }}
      </div>
    </div>
  </div>
  <div :class="$style.cardWrapper">
    <div :class="$style.header">
      <div :class="$style.processBox">
        {{ headerProcess }}
        <div
          v-if="
            props.data.orderState !== 3 &&
            props.data.orderState !== 6 &&
            props.data.orderState !== 9
          "
        >
          &nbsp;-&nbsp;
          {{
            props.data.orderState === 0 ||
            props.data.orderState === 1 ||
            props.data.orderState === 2
              ? expectMonthDate
              : props.data.eventFinishDate
          }}
          ({{ daysOfWeek }}) {{ deliverComment }}
        </div>
      </div>
    </div>
    <div :class="$style.upperCard">
      <div :class="$style.productBox">
        <div :class="$style.imgBox">
          <img :src="props.data.imgSrc" alt="product" :class="$style.img" />
        </div>
        <div :class="$style.infoBox">
          <span :class="$style.productName">{{ props.data.productName }}</span>
          <span :class="$style.productPrice"
            >{{ props.data.productPrice.toLocaleString() }}원</span
          >
          <span :class="$style.deliverPrice"
            >배송비 {{ props.data.deliveryPrice.toLocaleString() }}원</span
          >
        </div>
      </div>
      <div :class="$style.btnBox">
        <button
          v-if="
            props.data.orderState === 0 ||
            props.data.orderState === 1 ||
            props.data.orderState === 2
          "
          :class="$style.btn"
        >
          배송 조회
        </button>
        <button v-if="props.data.orderState === 0" :class="$style.btn">
          주문 취소
        </button>
        <button
          v-if="props.data.orderState === 1 || props.data.orderState === 2"
          :class="$style.btn"
        >
          교환/반품
        </button>
        <button
          v-if="props.data.orderState === 1 || props.data.orderState === 2"
          :class="$style.btn"
          @click="$emit('writeReview')"
        >
          리뷰 작성
        </button>
      </div>
    </div>
    <div :class="$style.detailOption">
      <div
        v-for="(detail, index) in props.data.productDetail"
        :key="index"
        :class="$style.OptionBox"
      >
        <span :class="$style.option"
          >{{ detail.detailOption }} : {{ detail.detailName }}</span
        >
        <span
          >{{ detail.detailPrice.toLocaleString() }}원 /
          {{ detail.detailCount }}개</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import IconListItem from "#/icons/IconListItem.vue";
import IconRightArrow from "#/icons/IconRightArrow.vue";

const $emit = defineEmits(["writeReview"]);
const props = defineProps({
  data: Object,
});

const headerProcess = computed(() => {
  if (props.data.orderState === 0) {
    return "배송 준비";
  } else if (props.data.orderState === 1) {
    return "배송 중";
  } else if (props.data.orderState === 2) {
    return "배송 완료";
  } else if (props.data.orderState === 3) {
    return "취소 처리 중";
  } else if (props.data.orderState === 4) {
    return "취소 거부";
  } else if (props.data.orderState === 5) {
    return "취소 완료";
  } else if (props.data.orderState === 6) {
    return "교환 처리 중";
  } else if (props.data.orderState === 7) {
    return "교환 거부";
  } else if (props.data.orderState === 8) {
    return "교환 완료";
  } else if (props.data.orderState === 9) {
    return "반품 처리 중";
  } else if (props.data.orderState === 10) {
    return "반품 거부";
  } else if (props.data.orderState === 11) {
    return "반품 완료";
  }
});
const headerState = computed(() => {
  if (props.data.orderState >= 3 && props.data.orderState <= 5) {
    return "취소";
  } else if (props.data.orderState >= 6 && props.data.orderState <= 8) {
    return "교환";
  } else if (props.data.orderState >= 9 && props.data.orderState <= 11) {
    return "반품";
  }
});

const deliverComment = computed(() => {
  if (props.data.orderState === 0) {
    return "도착 예정";
  } else if (props.data.orderState === 1) {
    return "도착 예정";
  } else if (props.data.orderState === 2) {
    return "도착 완료";
  }
});

const eventDate = computed(() => {
  if (props.data.orderState >= 3 && props.data.orderState <= 5) {
    return props.data.cancelDate;
  } else if (props.data.orderState >= 6 && props.data.orderState <= 8) {
    return props.data.changeDate;
  } else if (props.data.orderState >= 9 && props.data.orderState <= 11) {
    return props.data.refunDate;
  }
});

const daysOfWeek = computed(() => {
  let originalDate = null;
  if (props.data.orderState >= 0 && props.data.orderState <= 2) {
    originalDate = props.data.expectDeliveryDate;
  } else {
    originalDate = props.data.eventFinishDate;
  }

  if (originalDate) {
    const [year, month, day] = originalDate.split(".");
    const date = new Date(year, month - 1, day); // JavaScript에서 월은 0부터 시작
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    return dayNames[date.getDay()];
  }
});
const expectMonthDate = computed(() => {
  return props.data.expectDeliveryDate.slice(5);
});
</script>

<style src="@/assets/css/myorder/OrderProductCard.css" module></style>
