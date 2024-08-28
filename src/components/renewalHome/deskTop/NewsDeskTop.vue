<template>
  <div :class="$style.wrapper" ref="news">
    <div :class="$style.newsBox">
      <div :class="$style.header">
        <div :class="$style.title">공지사항</div>
        <router-link to="/board/notice" :class="$style.more"
          >더보기 +</router-link
        >
      </div>
      <div :class="$style.list">
        <div
          v-for="item in filterNewsItem"
          :key="item.idx"
          :class="$style.listItem"
          @click="linkTo(item.idx)"
        >
          <div :class="$style.title">
            <span :class="$style.category">[{{ item.category }}]</span>
            {{ item.title }}
          </div>
          <div :class="$style.date">{{ item.date }}</div>
        </div>
      </div>
    </div>
    <div :class="$style.contactBox" ref="contact">
      <div :class="$style.box">
        <p :class="$style.callName">고객센터</p>
        <p :class="$style.callNum">051-000-0000</p>
        <div :class="$style.detail">
          <p>운영 시간 : 09:00 ~ 18:00</p>
          <p>점심시간 : 12:00 ~ 13:00</p>
          <p>주말 및 공휴일 휴무</p>
        </div>
        <div :class="$style.btnBox">
          <router-link to="/board/faq" :class="$style.btn"
            >자주묻는 질문</router-link
          >
          <router-link to="/board/download" :class="$style.btn"
            >자료실</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { fadeInElements } from "@/utils/gsapUtils.js";
import { boardGetDataAPI } from "@/api/BoardGetDataAPI.js";

const { getNoticeList } = boardGetDataAPI();

const router = useRouter();

const news = ref(null);
const contact = ref(null);

const newsList = ref([]);

const filterNewsItem = computed(() => {
  return newsList.value.slice(0, 3);
});

const linkTo = (idx) => {
  router.push("/board/notice/" + idx);
};

const fetchData = async () => {
  newsList.value = [];
  const data = await getNoticeList();
  data.forEach((item) => {
    newsList.value.push({
      idx: item.notices_id,
      category: "공지",
      title: item.title,
      date: item.regdate.slice(0, 10),
    });
  });
};

onMounted(() => {
  fetchData();
  fadeInElements(news.value, [news.value], null, 50);
});
</script>

<style src="@/assets/css/renewalHome/deskTop/NewsDeskTop.css" module></style>
