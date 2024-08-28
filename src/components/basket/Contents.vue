<template>
  <section :class="$style.wrapper">
    <h3 :class="$style.title">장바구니</h3>
    <div v-if="!formmatedShoppingBaskets.length">
      <section :class="$style.notContentWrapper">
        <p :class="$style.notContentDesc">장바구니에 담은 상품이 없습니다.</p>
        <button type="button" :class="$style.continueBtn">쇼핑 계속하기</button>
      </section>
    </div>
    <div v-else :class="$style.contentWrapper">
      <div :class="$style.pickedWrapper">
        <header :class="$style.header">
          <div :class="$style.leftSide">
            <input
              type="checkbox"
              id="all"
              :checked="isAllCheck"
              @change="checkAllProduct"
            />
            <label for="all">상품 정보</label>
          </div>
          <div :class="$style.rightSide">
            <button type="button" :class="$style.commonBtn">
              품절상품삭제
            </button>
            <button
              type="button"
              :class="$style.commonBtn"
              @click="deleteCheckedProduct"
            >
              선택삭제
            </button>
          </div>
        </header>
        <div
          v-for="shoppingBasketId in formmatedShoppingBasketIds"
          :key="shoppingBasketId"
          :class="$style.pickedContentWrapper"
        >
          <ProductPicked
            v-if="
              formmatedShoppingBaskets.some(
                (shoppingBasket) =>
                  shoppingBasket.id === shoppingBasketId &&
                  shoppingBasket.isMultiIOption
              )
            "
            :key="shoppingBasketId"
            :class="$style.picked"
            :shoppingBasket="multiComputedBasket(shoppingBasketId)"
            @checkedProduct="checkProduct"
            @deletedProduct="deletProduct"
            @addedProduct="addProduct"
            @subtractedProduct="subtractProduct"
          />
          <div
            v-for="shoppingBasket in formmatedShoppingBaskets"
            :key="shoppingBasket.id"
            :class="$style.pickedContent"
          >
            <ProductPicked
              v-if="
                shoppingBasket.id === shoppingBasketId &&
                shoppingBasket.isMultiIOption
              "
              :class="$style.picked"
              :key="shoppingBasket.id"
              :shoppingBasket="shoppingBasket"
              @checkedProduct="checkProduct"
              @deletedProduct="deletProduct"
              @addedProduct="addProduct"
              @subtractedProduct="subtractProduct"
            />
            <ProductPicked
              v-if="
                shoppingBasket.id === shoppingBasketId &&
                !shoppingBasket.isMultiIOption
              "
              :class="$style.picked"
              :key="shoppingBasket.id"
              :shoppingBasket="shoppingBasket"
              @checkedProduct="checkProduct"
              @deletedProduct="deletProduct"
              @addedProduct="addProduct"
              @subtractedProduct="subtractProduct"
            />
          </div>
        </div>
      </div>
      <div :class="$style.paymentInfoWrapper">
        <PaymentInfo
          :totalProductsPrice="totalProductsPrice"
          :totalDelivery="totalDelivery"
          :totalPrice="totalPrice"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import ProductPicked from "#/common/ProductPicked.vue";
import PaymentInfo from "#/common/PaymentInfo.vue";

const shoppingBaskets = JSON.parse(localStorage.getItem("shopping")) || [];

if (!shoppingBaskets.length) {
  localStorage.setItem("shopping", JSON.stringify([]));
}

const formmatedShoppingBasketIds = ref(
  Array.from(
    new Set(shoppingBaskets.map((shoppingBasket) => shoppingBasket.id))
  )
);

const formmatedShoppingBaskets = ref(
  shoppingBaskets.flatMap((shoppingBasket) => {
    if (Array.isArray(shoppingBasket.item) && shoppingBasket.item.length > 1) {
      return shoppingBasket.item.map((item) => ({
        id: shoppingBasket.id,
        productName: shoppingBasket.productName,
        count: shoppingBasket.count,
        // totalPrice: shoppingBasket.totalPrice,
        item,
        imgSrc: shoppingBasket.imgSrc,
        isMultiIOption: true,
        isPicked: shoppingBasket.isPicked,
      }));
    } else {
      return {
        id: shoppingBasket.id,
        productName: shoppingBasket.productName,
        count: shoppingBasket.count,
        item: shoppingBasket.item[0],
        imgSrc: shoppingBasket.imgSrc,
        isMultiIOption: false,
        isPicked: shoppingBasket.isPicked,
      };
    }
  })
);
////// 만약 옵션이 여러개인 상품이 있을시에 대표상품의 데이터를 만들어서 배열로 저장 //////
const multiRepresentBasket = ref([]);
const findMultiRepresent = () => {
  shoppingBaskets.map((basketlist) => {
    // console.log("basketlist", basketlist);
    if (Array.isArray(basketlist.item) && basketlist.item.length > 1) {
      multiRepresentBasket.value.push({
        id: basketlist.id,
        productName: basketlist.productName,
        item: {
          detailId: basketlist.item.reduce((acc, item) => {
            return acc.concat(item.detailId);
          }, []),
          categoryName: basketlist.item.reduce((acc, item) => {
            return acc.concat(item.categoryName);
          }, []),
          detailName: basketlist.productName,
          detailPrice: basketlist.item.reduce((acc, item) => {
            return acc + item.detailPrice * item.count;
          }, 0),
        },
        imgSrc: basketlist.imgSrc,
        isMultiIOption: true,
        isPicked: basketlist.isPicked,
      });
    }
  });
};
findMultiRepresent();

const multiComputedBasket = (shoppingBasketId) => {
  return multiRepresentBasket.value.find(
    (shoppingBasket) => shoppingBasket.id === shoppingBasketId
  );
};

const isAllCheck = computed(() =>
  formmatedShoppingBaskets.value.every(
    (shoppingBasket) => shoppingBasket.isPicked
  )
);

const totalProductsPrice = computed(() =>
  formmatedShoppingBaskets.value.reduce(
    (acc, curr) =>
      curr.isPicked ? acc + curr.item.detailPrice * curr.item.count : acc,
    0
  )
);
const totalDelivery = computed(() => {
  const uniqueIds = new Set(
    // isPicked가 true인 상품의 id만 추출하여 중복을 제거한 후 Set으로 만듭니다.
    formmatedShoppingBaskets.value.map((basket) => {
      if (basket.isPicked) {
        return basket.id;
      }
    })
  );
  // return uniqueIds.size * 3000;
  return 3000;
});

const totalPrice = computed(
  () => totalProductsPrice.value + totalDelivery.value
);

const checkAllProduct = () => {
  formmatedShoppingBaskets.value = formmatedShoppingBaskets.value.map(
    (formmatedShoppingBasket) => {
      return {
        ...formmatedShoppingBasket,
        isPicked: !isAllCheck.value,
      };
    }
  );
  multiRepresentBasket.value = multiRepresentBasket.value.map(
    (multiRepresent) => {
      return {
        ...multiRepresent,
        isPicked: isAllCheck.value,
      };
    }
  );
  console.log(formmatedShoppingBaskets.value);
  storeShoppingBaksets(formmatedShoppingBaskets.value);
};

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
  storeShoppingBaksets(formmatedShoppingBaskets.value);
};

const deleteCheckedProduct = () => {
  formmatedShoppingBaskets.value = formmatedShoppingBaskets.value.filter(
    (formmatedShoppingBasket) => formmatedShoppingBasket.isPicked === false
  );
  storeShoppingBaksets(formmatedShoppingBaskets.value);
};

const deletProduct = (id) => {
  formmatedShoppingBaskets.value = formmatedShoppingBaskets.value.filter(
    (formmatedShoppingBasket) => formmatedShoppingBasket.id !== id
  );
  storeShoppingBaksets(formmatedShoppingBaskets.value);
};

// 장바구니 항목의 최근 가격을 계산하고 업데이트하는 함수
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

  // multiRepresentBasket 업데이트
  multiRepresentBasket.value = multiRepresentBasket.value.map(
    (multiRepresent) => {
      if (multiRepresent.item.detailId.includes(id)) {
        return {
          ...multiRepresent,
          item: {
            ...multiRepresent.item,
            detailPrice: isAdding
              ? multiRepresent.item.detailPrice + recentBasketPrice
              : multiRepresent.item.detailPrice - recentBasketPrice,
          },
        };
      } else {
        return multiRepresent;
      }
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

<style src="@/assets/css/basket/Contents.css" module></style>
