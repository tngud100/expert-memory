<template>
  <div :class="$style.tableContainer">
    <div :class="$style.tableHeader" v-if="type !== 'faq'">
      <div
        v-for="(column, index) in columns"
        :key="index"
        :style="[
          {
            width: column.width,
            paddingLeft: column.paddingLeft,
          },
        ]"
      >
        {{ column.label }}
      </div>
    </div>
    <div
      :class="$style.tableBody"
      :style="{
        borderTop: type == 'faq' && !isMobile ? 'solid 1px #CFCFCF' : '',
      }"
    >
      <div v-for="(row, rowIndex) in rows" :key="rowIndex">
        <div
          :class="[$style.tableRow, row.isClicked ? $style.isClicked : '']"
          @click="handleRowClick(rowIndex)"
        >
          <div
            v-for="(column, colIndex) in columns"
            :key="colIndex"
            :style="[
              {
                width: column.width,
                textAlign: column.textAlign,
                paddingLeft: column.paddingLeft,
              },
            ]"
          >
            <span
              v-if="type == 'faq' && colIndex === 0"
              :class="$style.QnAMark"
              :style="{ fontSize: isMobile ? '16px' : '18px' }"
              >Q</span
            >
            {{ row[column.field] }}
            <Icondownload
              v-if="column.label === '제목' && type == 'download'"
            />
            <IconUpArrow
              v-if="
                row.content?.comment &&
                colIndex === columns.length - 1 &&
                !row.isClicked &&
                !isMobile
              "
            />
            <IconDownArrow
              v-if="
                row.content?.comment &&
                colIndex === columns.length - 1 &&
                row.isClicked &&
                !isMobile
              "
            />
          </div>
        </div>
        <div
          v-if="row.isClicked && row.content?.text"
          :class="$style.contentBox"
        >
          {{ row.content.text }}
        </div>

        <div
          v-if="row.isClicked && row.content?.comment"
          :class="[$style.contentBox, $style.comment]"
          :style="{
            minHeight: isMobile ? '60px' : '80px',
            padding: isMobile ? '20px 0' : '23px 0',
          }"
        >
          <span
            v-if="type == 'faq'"
            :style="{
              width: `${columns[0].width}`,
              paddingRight: isMobile ? '' : '21px',
              fontSize: isMobile ? '16px' : '18px',
            }"
            :class="$style.QnAMark"
            >A</span
          >
          <div v-html="row.content.comment"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import IconUpArrow from "#/icons/IconUpArrow.vue";
import IconDownArrow from "#/icons/IconDownArrow.vue";
import Icondownload from "#/icons/IconFileDownload.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  columns: Array,
  rows: Array,
  type: String,
  isMobile: Boolean,
});

const emits = defineEmits(["row-click"]);

const handleRowClick = (index) => {
  if (props.rows[index].linkTo) {
    router.push(props.rows[index].linkTo + "/" + props.rows[index].num);
  } else {
    emits("row-click", index);
  }
};
</script>

<style src="@/assets/css/common/CustomBoardTable.css" module></style>
