<template>
  <el-container>
    <el-aside class="leftsidebar">
      <Leftsidebar></Leftsidebar>
    </el-aside>

    <!-- 内容 -->
    <el-main>
      <!-- 发帖 -->
      <el-aside class="topsidebar">
        <postbox></postbox>
      </el-aside>

      <el-tabs v-model="orderMode" @tab-click="handleTabClick" class="tabs">
        <el-tab-pane :label="translations.hottest.value" name='0'></el-tab-pane>
        <el-tab-pane :label="translations.latest.value" name='1'></el-tab-pane>
      </el-tabs>

      <div v-for="item in discussPosts" :key="item.id" class="post-item">
        <div class="post-content">
          <el-avatar :src=item.user.headerImg class="post-avatar"></el-avatar>

          <router-link :to="{ name: 'discussDetail', params: { id: item.post.id }}" class="post-title">
            {{ item.post.title }}
          </router-link>
          <div class="post-meta">
            <span class="post-author">{{ item.user.username }}</span>
            <span class="post-time">{{ translations.publishtime }} {{ formateDate(item.post.createTime) }}</span>
          </div>
          <div class="post-stats">
            <el-tag>{{ translations.like }} {{ item.likeCount }}</el-tag>
            <el-tag>{{ translations.reply }} {{ item.post.commentCount }}</el-tag>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <el-pagination
          class="page"
          v-if="page.total > 0"
          :current-page="page.current"
          :page-size="page.pageSize"
          :total="page.total"
          layout="total, prev, pager, next, jumper"
          @current-change="handlePageChange"
      >
      </el-pagination>
    </el-main>

    <el-aside class="rightsidebar">
      <div class="search-bar">
        <el-input v-model="searchQuery" @keyup.enter="search" style="width: 200px;"/>
        <el-button @click="search" type="primary">{{ translations.search }}</el-button>

        <el-select
            v-model="selectedLanguage"
            @change="changeLanguage"
            placeholder="Select Language"
            class="selectbar"
        >
          <el-option label="English" value="en"></el-option>
          <el-option label="中文" value="zh"></el-option>
          <el-option label="Español" value="sp"></el-option>
        </el-select>

        <div>
          <recommendbar></recommendbar>
        </div>
      </div>
    </el-aside>
  </el-container>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import axios from 'axios';
import router from '@/router/index.ts';
import {useCommonTranslations} from '@/lang/i18nhelper';
import {DatetimeFormat, useI18n} from 'vue-i18n';
import postbox from "@/views/PostBox/Postbox.vue"
import Leftsidebar from "@/components/Leftsidebar.vue";
import recommendbar from "@/components/recommendbar.vue";

// 搜索
const searchQuery = ref('');

const search = () => {
  if (searchQuery.value.trim()) {
    router.push({name: 'search', query: {keyword: searchQuery.value}});
  }
};

// 最新，最热
const orderMode = ref(0);
const page = ref({
  current: 1,
  pageSize: 6,
  total: 10
});
const discussPosts = ref([]);
const start = ref(0);
const end = ref(1);

const fetchPosts = async (orderModeValue) => {
  try {
    const response = await axios.get('http://localhost:8080/community/index', {
      params: {
        orderMode: orderModeValue,
        ticket: localStorage.getItem('ticket'),
      },
    });
    console.log("123");
    console.log('Fetched posts:', response);

    // image.value= response.data.disscussPosts.user.headerImg;


    discussPosts.value = response.data.disscussPosts;

    page.value.total = response.data.Page.total;
    page.value.current = response.data.Page.current;
    page.value.pageSize = response.data.Page.pageSize;
    start.value = (page.value.current - 1) * page.value.pageSize;
    if (start.value + page.value.pageSize > page.value.total) {
      end.value = page.value.total;
    } else {
      end.value = start.value + page.value.pageSize;
    }

  } catch (error) {
    console.log('Error fetching posts:', error);
  }
};

const handleTabClick = () => {
  console.log(orderMode.value);
  fetchPosts(orderMode.value);
};


onMounted(() => {
  fetchPosts(orderMode.value);
});

const handlePageChange = (newPage) => {
  page.value.current = newPage;
  start.value = (page.value.current - 1) * page.value.pageSize;
  if (start.value + page.value.pageSize > page.value.total) {
    end.value = page.value.total;
  } else {
    end.value = start.value + page.value.pageSize;
  }
};


// 切换语言，侧边栏
const translations = useCommonTranslations();
const {locale} = useI18n({useScope: "global"});
const selectedLanguage = ref('zh');
const changeLanguage = () => {
  locale.value = selectedLanguage.value;
};

const formateDate = (timeStamp) => {
  const date = new Date(timeStamp);
  return date.toLocaleDateString();
}
</script>

<style scoped>
@import "@/css/views/HomeView.css";
</style>
