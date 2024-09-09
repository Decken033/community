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
            <span class="post-time">{{ translations.publishtime }} {{ formatDate(item.post.createTime) }}</span>
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
import {onMounted, ref} from 'vue';
import axios from 'axios';
import {useCommonTranslations} from '@/lang/i18nhelper';
import {useI18n} from 'vue-i18n';
import postbox from "@/views/PostBox/Postbox.vue"
import Leftsidebar from "@/components/Leftsidebar.vue";
import recommendbar from "@/components/recommendbar.vue";
import {formatDate} from "@/js/global";
import api from "@/api/api";
import router from "@/router";

const loadData = (data: any) => {
  discussPosts.value = data.disscussPosts;
  page.value.total = data.Page.total;
  page.value.current = data.Page.current;
  page.value.pageSize = data.Page.pageSize;
  start.value = (page.value.current - 1) * page.value.pageSize;
  if (start.value + page.value.pageSize > page.value.total) {
    end.value = page.value.total;
  } else {
    end.value = start.value + page.value.pageSize;
  }
}

const searchQuery = ref('');
const search = () => {
  console.log('Search query:', searchQuery.value);
  if (searchQuery.value.trim()) {
    // 使用 router.push 进行路由导航
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

const fetchPosts = async (orderModeValue: number) => {
  try {
    const response = await axios.get(api.home.index, {
      params: {
        orderMode: orderModeValue,
        ticket: localStorage.getItem('ticket'),
      },
    });
    loadData(response.data);

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

const handlePageChange = (newPage: any) => {
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


</script>

<style scoped>
@import "@/css/views/HomeView.css";
</style>
