<template>
  <el-container>
    <el-aside class="leftsidebar">
        <Leftsidebar></Leftsidebar>
    </el-aside>

    <!-- 内容 -->
    <el-main>
      <!--      发帖-->
      <el-aside class="topsidebar">
        <postbox></postbox>

      </el-aside>

      <el-tabs v-model="orderMode" @tab-click="handleTabClick" class="tabs">
        <!-- <p>{{ translations.hottest }}</p>
        <p>{{ translations.latest }}</p> -->

        <!-- <el-tab-pane :label="translations.hottest" name="0"></el-tab-pane>
        <el-tab-pane :label="translations.latest" name="1"></el-tab-pane> -->
        <el-tab-pane :label="translations.hottest.value" name="0"></el-tab-pane>
        <el-tab-pane :label="translations.latest.value" name="1"></el-tab-pane>
      </el-tabs>

      <!-- 帖子列表 -->
      <div v-for="post in paginatedItems" :key="post.id" class="post-item">
        <el-avatar :src="post.userAvatar"></el-avatar>
        <div class="post-content">
          <el-link :href="`/discuss/detail/${post.id}`" class="post-title">{{ post.title }}</el-link>
          <div class="post-meta">
            <span>{{ post.author }}</span> {{translations.publishtime}} {{ post.createTime }}
            <div class="post-stats">
              <el-tag>{{ translations.like }} {{ post.likeCount }}</el-tag>
              <el-tag>{{ translations.reply }} {{ post.commentCount }}</el-tag>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <el-pagination class="page"
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
        <!--      <p>当前搜索关键字: {{ searchQuery }}</p> 应该改为placeholder-->

        <el-select v-model="selectedLanguage" @change="changeLanguage" placeholder="Select Language" class="selectbar">
          <el-option label="English" value="en"></el-option>
          <el-option label="中文" value="zh"></el-option>
          <el-option label="Español" value="sp"></el-option>
        </el-select>
      </div>


    </el-aside>
  </el-container>
</template>
<script setup lang="ts">
import {
  orderMode,
  page,
  paginatedItems,
  handlePageChange,
  handleTabClick,
} from '@/js/global.ts';

const searchQuery = ref('');
import router from "@/router/index.ts";
const search = () => {
  console.log('Search query:', searchQuery.value);
  if (searchQuery.value.trim()) {
    // 使用 router.push 进行路由导航
    router.push({name: 'search', query: {keyword: searchQuery.value}});
  }
};

import {ref} from 'vue';
import {useCommonTranslations} from '@/lang/i18nhelper';
import {useI18n} from 'vue-i18n';
import postbox from "@/views/PostBox/Postbox.vue"
import Leftsidebar  from "@/components/Leftsidebar.vue";
const translations = useCommonTranslations();
const {t, locale} = useI18n({useScope: "global"});
const selectedLanguage = ref('zh')
const changeLanguage = () => {
  locale.value = selectedLanguage.value
}
</script>
<style scoped>
@import "@/css/views/HomeView.css";
</style>
