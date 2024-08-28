<template>
  <section :class="$style.wrapper">
    <div :class="$style.container">
      <img
        :src="productList.importedProduct"
        alt="상품 이미지"
        :class="$style.representImg"
      />
      <div :class="$style.detailImgWrapper">
        <img
          v-for="(item, index) in productList.importedProductDetailImg"
          :key="index"
          :src="item"
          alt="상품 상세 이미지"
          :class="$style.detailImg"
        />
      </div>
    </div>
    <!-- :productInfo="productInfo" -->
    <ProductInfo
      :productList="productList"
      :selectedProducts="selectedProducts"
      @selectedDetail="addProduct"
      @addCount="addCount"
      @subtractCount="subtractCount"
      @addShoppingBasket="addShoppingBasket"
      @deleteProduct="deleteProduct"
      v-if="productList.name"
    />
  </section>
</template>

<script setup>
import ProductInfo from "#/common/ProductInfo.vue";
import { useRouter } from "vue-router";
import { getProductAPI } from "@/api/ProductGetDataAPI.js";
import { computed, onMounted, ref } from "vue";

const { getProductDetailList, getProductVO } = getProductAPI();
const router = useRouter();

const productId = computed(() => router.currentRoute.value.query.productId);

const selectedProducts = ref([]);

const productList = ref({
  deliveryPrice: 3000,
});

const addProduct = (product) => {
  const isDuplicate = selectedProducts.value.some((productItem) =>
    isEqual(productItem.item, product.item)
  );

  if (isDuplicate) return;

  console.log("seleted", selectedProducts.value);
  console.log("product", product);

  // const totalPrice = product.item.reduce((total, item) => {
  //   total += item.detailPrice;
  //   return total;
  // }, 0);
  // console.log(totalPrice);

  selectedProducts.value.push({ ...product, count: 1 });
};

function isEqual(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return false;
  }

  if (arr1.length !== arr2.length) {
    return false;
  }

  const sortedArr1 = arr1
    .map((obj) => {
      const { detailId, ...rest } = obj; // id를 제외한 나머지 속성 추출
      return JSON.stringify(rest);
    })
    .sort();

  const sortedArr2 = arr2
    .map((obj) => {
      const { detailId, ...rest } = obj;
      return JSON.stringify(rest);
    })
    .sort();

  for (let i = 0; i < sortedArr1.length; i++) {
    console.log(sortedArr1[i], sortedArr2[i]);
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false;
    }
  }

  return true;
}

const addCount = ({ id }) => {
  selectedProducts.value = calcCount(id, 1);
  // console.log(selectedProducts.value);
};

const subtractCount = ({ id }) => {
  selectedProducts.value = calcCount(id, -1);
  // console.log(selectedProducts.value);
};

const deleteProduct = ({ id }) => {
  console.log(selectedProducts.value);
  selectedProducts.value = selectedProducts.value.filter(
    (product) => product.id !== id
  );
};

const calcCount = (id, calcUnit) => {
  return selectedProducts.value.map((selectProduct) => {
    if (selectProduct.id === id) {
      const count = selectProduct.count + calcUnit;
      const totalPrice =
        (selectProduct.totalPrice / selectProduct.count) * count;
      return {
        ...selectProduct,
        count,
        totalPrice,
        item: selectProduct.item.map((item) => {
          return {
            ...item,
            count: count,
          };
        }),
      };
    }
    return selectProduct;
  });
};

/// 현재 같은 아이템을 순서를 바꿔서 장바구니에 넣으면 중복으로 인식하지 않음 ///
const addShoppingBasket = () => {
  const parsedBaskets = JSON.parse(localStorage.getItem("shopping")) || [];
  const imgSrc = productList.value.importedProduct;

  const mergedBaskets = [...selectedProducts.value, ...parsedBaskets];
  const newBaskets = [];

  console.log(parsedBaskets, selectedProducts.value);

  mergedBaskets.forEach((beforeBasket) => {
    // 중복된 제품이 있는지 확인하는 조건을 설정합니다.
    const isDuplicate = newBaskets.some(
      (item) =>
        Array.isArray(item.item) &&
        Array.isArray(beforeBasket.item) &&
        beforeBasket.item.every(
          (subItem, idx) =>
            subItem &&
            beforeBasket.productName === item.productName &&
            subItem.categoryName[0] === item.item[idx]?.categoryName[0] &&
            subItem.detailName === item.item[idx]?.detailName
        )
    );
    console.log(isDuplicate);

    if (!isDuplicate) {
      beforeBasket.imgSrc
        ? newBaskets.push({ ...beforeBasket })
        : newBaskets.push({ ...beforeBasket, imgSrc: imgSrc });
    } else {
      // 중복된 제품이 있으면 해당 제품의 수량을 증가시킵니다.
      const existingItemIndex = newBaskets.findIndex((item) =>
        item.item.every(
          (subItem, index) =>
            subItem &&
            item.productName === beforeBasket.productName &&
            subItem.categoryName[0] ===
              beforeBasket.item[index]?.categoryName[0] &&
            subItem.detailName === beforeBasket.item[index]?.detailName
        )
      );
      // newBaskets[existingItemIndex].count = 0;
      console.log(newBaskets[existingItemIndex].item.map((item) => item.count));
      console.log(beforeBasket);
      newBaskets[existingItemIndex].count += beforeBasket.count;
      newBaskets[existingItemIndex].item.forEach((item, index) => {
        item.count += beforeBasket.item[index].count;
      });
    }
  });

  console.log("newBaskets:", newBaskets);

  localStorage.setItem("shopping", JSON.stringify(newBaskets));
  // 바구니 페이지로 이동
  router.push("/basket");
};

const getProductData = async () => {
  const [productVO, dataList] = await Promise.all([
    getProductVO(productId.value),
    getProductDetailList(productId.value),
  ]);

  if (!productList && !Array.isArray(productList.value)) {
    console.error("productList is not defined or not reactive");
    return;
  }
  productList.value = {
    ...productList.value,
    name: productVO[0].name,
    price: productVO[0].amount,
    importedProduct: productVO[0].representImg,
    importedProductDetailImg: productVO[0].descImg,
    detailProduct: [],
  };

  const detailProductPromises = dataList.value.map((data, i) => {
    return new Promise((resolve) => {
      productList.value.detailProduct.push({
        id: i,
        category: data.category,
        categoryDefault: data.default,
        detailName: data.name,
        detailPrice: data.amount,
        leftStock: data.stock - data.soldStock,
      });
      resolve();
    });
  });

  await Promise.all(detailProductPromises);

  console.log(productList.value);
};

onMounted(async () => {
  await getProductData();
});
</script>

<style src="@/assets/css/productDetail/Contents.css" module></style>
