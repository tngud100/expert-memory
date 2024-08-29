<template>
  <div :class="$style.listContainer">
    <div :class="$style.titleBox">
      <ul :class="[$style.list, $style.title]">
        <li
          v-for="(column, index) in listTitle"
          :key="index"
          :style="{ width: column.width, textAlign: column.align }"
        >
          {{ column.title }}
        </li>
      </ul>
    </div>
    <div :class="$style.listBox">
      <div
        v-for="(list, index) in listItem"
        :key="index"
        :class="$style.content"
        @click="handleClick(list)"
      >
        <ul :class="$style.list">
          <li
            v-for="(column, colIndex) in listTitle"
            :key="colIndex"
            :style="{ width: column.width, textAlign: column.align }"
          >
            <template v-if="column.field === 'id'">
              {{ index + 1 }}
            </template>
            <template v-else-if="column.field === 'img'">
              <img
                v-if="list.img"
                :src="list.img"
                alt="productImg"
                :class="$style.img"
              />
            </template>
            <template v-else-if="column.field === 'active'">
              <button
                @click.stop="activeBtn(list.active, list.id)"
                :class="$style.activeBtn"
              >
                {{ list.active }}
              </button>
            </template>
            <template v-else-if="column.field === 'title'">
              <div :style="{ textAlign: column.childAlign }">
                {{ list[column.field] }}
              </div>
            </template>
            <template v-else>
              {{ list[column.field] }}
            </template>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  listTitle: Array,
  listItem: Array,
  boardIdx: Number,
});

const emit = defineEmits(["itemSelected", "deleteItem"]);

const handleClick = (item) => {
  emit("itemSelected", item);
  document.body.style.overflow = "hidden";
};

const activeBtn = (active, item) => {
  if (active === "삭제") {
    emit("deleteItem", item);
  }
};
</script>

<style src="@/assets/css/adminBoard/BoardList.css" module></style>
