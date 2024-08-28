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
          <a href="/letter" class="redirection"  style="font-weight: bold">{{ translations.news }}</a>
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
      <!-- 筛选条件 -->

      <!--TODO-->
      <!-- 发布弹出框 -->

      <!--      <el-button @click="openPublishModal">发布新帖</el-button>-->

      <!--      &lt;!&ndash; 弹出框 &ndash;&gt;-->
      <!--      <el-dialog title="新帖发布" :visible.sync="isPublishModalVisible" width="100%">-->
      <!--        <el-form>-->
      <!--          <el-form-item label="标题">-->
      <!--            <el-input placeholder="请输入标题"></el-input>-->
      <!--          </el-form-item>-->
      <!--          <el-form-item label="正文">-->
      <!--            <el-input type="textarea" placeholder="请输入正文" rows="15"></el-input>-->
      <!--          </el-form-item>-->
      <!--        </el-form>-->
      <!--        <div slot="footer" class="dialog-footer">-->
      <!--          <el-button @click="isPublishModalVisible = false">取消</el-button>-->
      <!--          <el-button type="primary" @click="publishPost">发布</el-button>-->
      <!--        </div>-->
      <!--      </el-dialog>-->

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
            <span>{{ post.author }}</span> 发布于 {{ post.createTime }}
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

<style>
/* 添加任何额外的样式 */
@import "@/css/views/HomeView.css";
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

import {searchQuery,
  orderMode,
  page,
  paginatedItems,
  handlePageChange,
  handleTabClick,
  search,} from '@/js/global.ts';

</script>


