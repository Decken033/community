<template>
  <el-container>
    <el-aside class="leftsidebar">
      <el-menu type="flex">
        <!-- 首页 -->
        <el-menu-item index="1">
          <!--         <router-link to="/">{{ translations.home }}</router-link>-->
          <a href="/" class="redirection" style="font-weight: bold">{{ translations.home }}</a>
        </el-menu-item>

        <!-- 消息 -->
        <el-menu-item index="2">
          <!--         <router-link to="/letter">{{ translations.news }}</router-link>-->
          <a href="/letter" class="redirection" style="font-weight: bold">{{ translations.news }}</a>
          <el-badge :value="12" class="item"/>
        </el-menu-item>

        <!-- 注册 -->
        <el-menu-item index="3">
          <!--         <router-link to="/register">{{ translations.register }}</router-link>-->
          <a href="/register" class="redirection" style="font-weight: bold">{{ translations.register }}</a>
        </el-menu-item>

        <!-- 登录 -->
        <el-menu-item index="4">
          <!--         <router-link to="/login">{{ translations.login }}</router-link>-->
          <a href="/login" class="redirection" style="font-weight: bold">{{ translations.login }}</a>
        </el-menu-item>

        <!-- 个人主页 -->
        <el-menu-item index="5">
          <!--         <router-link to="/profile">{{ translations.profile }}</router-link>-->
          <a href="/profile" class="redirection" style="font-weight: bold">{{ translations.profile }}</a>
        </el-menu-item>

        <!-- 账号设置 -->
        <el-menu-item index="6">
          <!--         <router-link to="/settings">{{ translations.settings }}</router-link>-->
          <a href="/settings" class="redirection" style="font-weight: bold">{{ translations.settings }}</a>
        </el-menu-item>

        <!-- 视频聊天 -->
        <el-menu-item index="7">
          <!--         <router-link to="/settings">视频聊天</router-link>-->
          <a href="/" class="redirection" style="font-weight: bold">视频聊天</a>
        </el-menu-item>

      </el-menu>

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
              <el-tag v-if="conversation.unreadCount != 0" type="danger">{{ conversation.unreadCount }}</el-tag>
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

<style>
/* 添加任何额外的样式 */
@import "@/css/views/letter.css";
</style>

<script setup>
import {useCommonTranslations} from '@/lang/i18nhelper';
import {useI18n} from 'vue-i18n';
import {ref} from "vue";

const translations = useCommonTranslations();
const {t, locale} = useI18n({useScope: "global"});
const selectedLanguage = ref('zh')
const changeLanguage = () => {
  locale.value = selectedLanguage.value
}

import {
  searchQuery,
  orderMode,
  page,
  paginatedItems,
  handlePageChange,
  handleTabClick,
  search,
} from '@/js/letter.ts';
</script>


