<template>
  <section :class="$style.wrapper">
    <h3 :class="$style.title">주문결제</h3>
    <p :class="$style.desc">
      <span :class="$style.strong">주문/결제 ></span> 주문완료
    </p>
    <section :class="$style.innerWrapper">
      <div :class="$style.contentWrapper">
        <div :class="$style.pickedWrapper">
          <ProductPicked
            v-for="shoppingBasket in formmatedShoppingBaskets"
            type="order"
            :key="shoppingBasket.id"
            :shoppingBasket="shoppingBasket"
            @checkedProduct="checkProduct"
            @deletedProduct="deleteProduct"
            @addedProduct="addProduct"
            @subtractedProduct="subtractProduct"
          />
        </div>
        <div :class="$style.orderWrapper">
          <h4 :class="$style.orderTitle">주문자 정보</h4>
          <div :class="$style.orderTable">
            <div :class="$style.tableLeftCell">이름</div>
            <div :class="$style.tableRightCell">이형탁</div>
            <div :class="$style.tableLeftCell">이메일주소</div>
            <div :class="$style.tableRightCell">taklee2@naver.com</div>
            <div :class="$style.tableLeftCell">연락처</div>
            <div :class="$style.tableRightCell">010-0000-0000</div>
          </div>
        </div>
        <form>
          <div :class="$style.recipientWrapper">
            <h4 :class="$style.recipientTitle">수령자 정보</h4>
            <div :class="$style.recipientTable">
              <div :class="$style.tableLeftCell">배송지 선택</div>
              <div :class="$style.tableRightCell">
                <div :class="$style.recipientCheckboxesWrapper">
                  <div :class="$style.recipientCheckboxWrapper">
                    <input type="checkbox" id="1" />
                    <label for="1">기본 배송지</label>
                  </div>
                  <div :class="$style.recipientCheckboxWrapper">
                    <input type="checkbox" id="2" />
                    <label for="2">최근 배송지</label>
                  </div>
                  <div :class="$style.recipientCheckboxWrapper">
                    <input type="checkbox" id="3" />
                    <label for="3">신규 배송지</label>
                  </div>
                </div>
              </div>
              <div :class="$style.tableLeftCell">받는 분</div>
              <div :class="$style.tableRightCell">
                <div :class="$style.phoneNumberWrapper">
                  <input
                    :class="$style.phoneNumber"
                    placeholder="휴대폰번호 (필수)"
                    type="text"
                    :value="recipientForm.phone.number"
                  />
                  <!-- @input="handlePhoneNumberChange" -->
                  <button type="button" :class="$style.phoneNumberBtn">
                    인증번호 발송
                  </button>
                </div>
              </div>
              <div :class="$style.tableLeftCell">주소</div>
              <div :class="`${$style.tableRightCell} ${$style.addressWrapper}`">
                <div>
                  <Input
                    size="187px"
                    :value="recipientForm.address.zipCode"
                    type="text"
                    placeholder="주소"
                    :isReadOnly="true"
                  />
                  <button
                    type="button"
                    :class="`${$style.signupBtn} ${$style.duplicatedBtn}`"
                  >
                    우편번호
                  </button>
                </div>
                <div :class="$style.inputWrapper">
                  <Input
                    size="400px"
                    type="text"
                    :value="recipientForm.address.nomal"
                    placeholder="주소1"
                    :isReadOnly="true"
                  />
                  <Input
                    size="400px"
                    :value="recipientForm.address.detail"
                    type="text"
                    placeholder="주소2"
                  />
                </div>
              </div>
              <div :class="$style.tableLeftCell">연락처</div>
              <div :class="$style.tableRightCell">
                <div :class="$style.telWrapper">
                  <div :class="$style.dropDownWrapper">
                    <div>
                      <IconMediumDownArrow />
                    </div>
                  </div>
                  <Input
                    type="text"
                    :value="recipientForm.telNum1"
                    placeholder="TelNumber"
                    size="143px"
                  />
                  <Input
                    type="text"
                    :value="recipientForm.telNum2"
                    placeholder="TelNumber"
                    size="143px"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
        <div :class="$style.paymentMethodWrapper">
          <h4 :class="$style.paymentMethodTitle">결제 수단</h4>
          <div :class="$style.paymentMethodTable">
            <div :class="$style.paymentMethodCheckboxesWrapper">
              <div :class="$style.paymentMethodCheckboxWrapper">
                <input type="checkbox" id="4" />
                <label for="4">신용 카드</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaymentInfo
        :totalProductsPrice="totalProductsPrice"
        :totalDelivery="totalDelivery"
        :totalPrice="totalPrice"
        :recipientForm="recipientForm"
      />
    </section>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import Input from "#/common/Input.vue";
import ProductPicked from "#/common/ProductPicked.vue";
import PaymentInfo from "#/common/PaymentInfo.vue";
import IconMediumDownArrow from "#/icons/IconMediumDownArrow.vue";

const Router = useRouter();

const shoppingBaskets = JSON.parse(localStorage.getItem("shopping")) || [];

const formmatedShoppingBaskets = ref(
  shoppingBaskets.reduce((acc, shoppingBasket) => {
    if (shoppingBasket.isPicked) {
      if (shoppingBasket.item.length > 1) {
        return acc.concat(
          shoppingBasket.item.map((item) => ({
            id: shoppingBasket.id,
            productName: shoppingBasket.productName,
            count: shoppingBasket.count,
            item,
            imgSrc: shoppingBasket.imgSrc,
            isMultiIOption: true,
            isPicked: shoppingBasket.isPicked,
          }))
        );
      } else {
        acc.push({
          id: shoppingBasket.id,
          productName: shoppingBasket.productName,
          count: shoppingBasket.count,
          item: shoppingBasket.item[0],
          imgSrc: shoppingBasket.imgSrc,
          isMultiIOption: false,
          isPicked: shoppingBasket.isPicked,
        });
      }
    }
    return acc;
  }, [])
);

// console.log(formmatedShoppingBaskets.value);
if (Router.currentRoute.value.query.from === "productDetail") {
  formmatedShoppingBaskets.value = JSON.parse(
    Router.currentRoute.value.query.params
  );
}
// console.log(formmatedShoppingBaskets.value);

const recipientForm = ref({
  phone: {
    verify: false,
    number: "",
  },
  address: {
    zipCode: "",
    nomal: "",
    detail: "",
  },
  telNum1: "",
  telNum2: "",
});

// const handlePhoneNumberChange = (event) => {
//   phoneNumber.value = event.target.value;
// };

const totalProductsPrice = computed(() =>
  formmatedShoppingBaskets.value.reduce(
    (acc, curr) => acc + curr.item.detailPrice * curr.item.count,
    0
  )
);

const totalDelivery = computed(
  // () => formmatedShoppingBaskets.value.length * 3000
  () => 3000
);

const totalPrice = computed(
  () => totalProductsPrice.value + totalDelivery.value
);

const checkProduct = (id) => {
  formmatedShoppingBaskets.value = formmatedShoppingBaskets.value.map(
    (formmatedShoppingBasket) => {
      if (formmatedShoppingBasket.id === id) {
        return {
          ...formmatedShoppingBasket,
          isPicked: !formmatedShoppingBasket.isPicked,
        };
      }
      return formmatedShoppingBasket;
    }
  );
};

const deleteProduct = (id) => {
  formmatedShoppingBaskets.value = formmatedShoppingBaskets.value.filter(
    (formmatedShoppingBasket) => formmatedShoppingBasket.id !== id
  );
  storeShoppingBaksets(formmatedShoppingBaskets.value);
};

const calcRecentBasketPrice = (id, isAdding) => {
  const recentBasketPrice = formmatedShoppingBaskets.value.find(
    (basket) => basket.item.detailId === id
  ).item.detailPrice;

  formmatedShoppingBaskets.value = formmatedShoppingBaskets.value.map(
    (formmatedShoppingBasket) => {
      if (formmatedShoppingBasket.item.detailId === id) {
        const count = isAdding
          ? formmatedShoppingBasket.item.count + 1
          : formmatedShoppingBasket.item.count - 1;
        return {
          ...formmatedShoppingBasket,
          item: {
            ...formmatedShoppingBasket.item,
            count: count < 0 ? 0 : count,
          },
        };
      }
      return formmatedShoppingBasket;
    }
  );
  storeShoppingBaksets(formmatedShoppingBaskets.value);
};

const addProduct = (id) => {
  calcRecentBasketPrice(id, true);
};

const subtractProduct = (id) => {
  calcRecentBasketPrice(id, false);
};

const formmatshoppingBaskets = (shoppingBaskets) => {
  const formattedBaskets = shoppingBaskets.reduce((acc, shoppingBasket) => {
    const existingBasket = acc.find(
      (basket) => basket.id === shoppingBasket.id && basket.isMultiIOption
    );
    // console.log("formmat", shoppingBasket);
    if (existingBasket) {
      const newItem = Array.isArray(shoppingBasket.item)
        ? shoppingBasket.item
        : [shoppingBasket.item];
      existingBasket.item = existingBasket.item.concat(newItem); // 여기서 concat()을 사용하여 리스트로 추가합니다.
    } else {
      acc.push({
        id: shoppingBasket.id,
        productName: shoppingBasket.productName,
        count: shoppingBasket.count,
        // totalPrice: shoppingBasket.totalPrice,
        item: Array.isArray(shoppingBasket.item)
          ? shoppingBasket.item
          : [shoppingBasket.item],
        imgSrc: shoppingBasket.imgSrc,
        isMultiIOption: shoppingBasket.isMultiIOption,
        isPicked: shoppingBasket.isPicked,
      });
    }
    return acc;
  }, []);
  // console.log("formmated", formattedBaskets);
  return formattedBaskets;
};

const storeShoppingBaksets = (formmatBaskets) => {
  const recentBaskets = formmatshoppingBaskets(formmatBaskets);
  localStorage.setItem("shopping", JSON.stringify(recentBaskets));
};
</script>

<style src="@/assets/css/order/Contents.css" module></style>
