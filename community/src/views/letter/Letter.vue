<template>
  <el-container>
    <el-aside class="leftsidebar">
      <Leftsidebar></Leftsidebar>
    </el-aside>
    <!-- 内容 -->
    <el-main>
      <el-tabs v-model="orderMode" @tab-click="handleTabClick" class="tabs">
        <el-tab-pane>
          <template #label>
            <router-link to="/letter" class="nav-link position-relative">
              {{ translations.friendmessage }}
              <el-badge v-if="letterUnreadCount != 0" :value="letterUnreadCount" class="badge badge-danger"></el-badge>
            </router-link>
          </template>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <router-link to="/notice" class="nav-link position-relative">
              {{ translations.notification }}
              <el-badge v-if="noticeUnreadCount != 0" :value="noticeUnreadCount" class="badge badge-danger"></el-badge>
            </router-link>
          </template>
        </el-tab-pane>
      </el-tabs>

      <!-- 私信列表 -->
      <div v-for="conversation in paginatedItems" :key="conversation.conversationId" class="conversation-card">
        <el-avatar :src="conversation.target.headerUrl" class="conversation-avatar"></el-avatar>
        <div class="conversation-content">
          <el-link :href="`/letter/detail/${conversation.conversationId}`" class="conversation-title">{{ conversation.content }}</el-link>
          <div class="conversation-meta">
            <span class="conversation-username">{{ conversation.target.username }}</span> {{ translations.publishtime }} {{ conversation.createTime }}
            <div class="conversation-stats">
              <el-tag v-if="conversation.unreadCount != 0" type="danger">{{translations.unreadCount}}{{ conversation.unreadCount }}</el-tag>
              <el-tag>{{ translations.letterCount }} {{ conversation.letterCount }}</el-tag>
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
import {ref} from "vue";
import router from "@/router/index.ts";


import {
  orderMode,
  page,
  paginatedItems,
  handlePageChange,
  handleTabClick,
} from '@/js/letter.ts';













//搜索调用
const searchQuery = ref('');
const search = () => {
  console.log('Search query:', searchQuery.value);
  if (searchQuery.value.trim()) {
    // 使用 router.push 进行路由导航
    router.push({name: 'search', query: {keyword: searchQuery.value}});
  }
};
//多语言支持
import {useCommonTranslations} from '@/lang/i18nhelper';
import {useI18n} from 'vue-i18n';
const translations = useCommonTranslations();
const {t, locale} = useI18n({useScope: "global"});
const selectedLanguage = ref('zh');
const changeLanguage = () => {
  locale.value = selectedLanguage.value
}
//样式
import Leftsidebar from "@/components/Leftsidebar.vue";
</script>


<style>
/* 添加任何额外的样式 */
@import "@/css/views/letter.css";
</style>

