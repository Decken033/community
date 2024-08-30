<template>
    <el-container>
      <!-- 头部 -->
      <el-header>
      <!-- 导航 -->
      <el-menu class="el-menu-demo" mode="horizontal">
        <!-- 首页 -->
        <el-menu-item index="1">
          <router-link to="/">{{ translations.home }}</router-link>
        </el-menu-item>

        <!-- 消息 -->
        <el-menu-item index="2">
          <router-link to="/letter">{{ translations.news }}</router-link>
          <el-badge :value="12" class="item" />
        </el-menu-item>

        <!-- 注册 -->
        <el-menu-item index="3">
          <router-link to="/register">{{ translations.register }}</router-link>
        </el-menu-item>

        <!-- 登录 -->
        <el-menu-item index="4">
          <router-link to="/login">{{ translations.login }}</router-link>
        </el-menu-item>

        <!-- 个人主页 -->
        <el-menu-item index="5">
          <router-link to="/profile">{{ translations.profile }}</router-link>
        </el-menu-item>

        <!-- 账号设置 -->
        <el-menu-item index="6">
          <router-link to="/settings">{{ translations.accountSettings }}</router-link>
        </el-menu-item>

        <!-- 视频聊天 -->
        <el-menu-item index="7">
          <router-link to="/settings">视频聊天</router-link>
        </el-menu-item>

        <!-- 搜索 -->
        <el-menu-item index="8">
          <el-input v-model="searchQuery" @keyup.enter="search" />
          <el-button @click="search" type="primary">{{ translations.search }}</el-button>
        </el-menu-item>

        <el-menu-item index="9">
          <el-button type="primary" class="float-right" @click="openPublishModal">{{ translations.publish }}</el-button>
        </el-menu-item>

        <el-menu-item index="10">
          <el-select v-model="selectedLanguage" @change="changeLanguage" placeholder="Select Language">
            <el-option label="English" value="en"></el-option>
            <el-option label="中文" value="zh"></el-option>
            <el-option label="Español" value="sp"></el-option>
          </el-select>
        </el-menu-item>
      </el-menu>


    </el-header>
      
      <!-- 内容 -->
      <el-main>
        <div class="container">
          <!-- 选项 -->
          <el-tabs v-model="activeTab">
            <el-tab-pane label="个人信息" name="info">
              <!-- 个人信息 -->
              <el-row class="mt-5">
                <el-col :span="4">
                  <el-avatar src="http://images.nowcoder.com/head/1t.png" size="large"></el-avatar>
                </el-col>
                <el-col :span="20">
                  <h5 class="mt-0 text-warning">
                    <span>{{ user.username }}</span>
                    <el-button :type="hasFollowed ? 'default' : 'primary'" class="float-right" @click="toggleFollow">{{ hasFollowed ? '已关注' : '关注TA' }}</el-button>
                  </h5>
                  <div class="text-muted mt-3">
                    <span>注册于 <i class="text-muted">{{ formattedCreateTime }}</i></span>
                  </div>
                  <div class="text-muted mt-3 mb-5">
                    <span>关注了 <router-link :to="followeesUrl">{{ followeeCount }}</router-link> 人</span>
                    <span class="ml-4">关注者 <router-link :to="followersUrl">{{ followerCount }}</router-link> 人</span>
                    <span class="ml-4">获得了 <i class="text-danger">{{ likeCount }}</i> 个赞</span>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="我的帖子" name="posts">
              <!-- 我的帖子内容 -->
            </el-tab-pane>
            <el-tab-pane label="我的回复" name="replies">
              <!-- 我的回复内容 -->
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-main>



    </el-container>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import { useI18n } from 'vue-i18n';
  import { useCommonTranslations } from '@/lang/i18nhelper';


  export default {
    setup() {
      const { t, locale } = useI18n();
      const user = {
        id: 1,
        username: 'nowcoder',
        headerUrl: 'http://images.nowcoder.com/head/1t.png',
        createTime: new Date(),
      };
      const followeeCount = 5;
      const followerCount = 123;
      const likeCount = 87;
      const hasFollowed = false;
      const searchQuery = ref('');
      const selectedLanguage = ref('zh');
      const activeTab = ref('info');
      const translations = useCommonTranslations();
      const formattedCreateTime = computed(() => {
        return new Intl.DateTimeFormat('zh-CN', { dateStyle: 'full', timeStyle: 'short' }).format(user.createTime);
      });
  
      const search = () => {
        console.log('Search query:', searchQuery.value);
      };
  
      const changeLanguage = (value) => {
        locale.value = value;
      };
  
      const toggleFollow = () => {
        // Toggle follow logic
        console.log('Toggled follow');
      };
      // 增加根据id生成路径
      const followeesUrl = computed(() => `/followee/${user.id}`);
      const followersUrl = computed(() => `/follower/${user.id}`);
      return {
        user,
        followeeCount,
        followerCount,
        likeCount,
        hasFollowed,
        searchQuery,
        selectedLanguage,
        activeTab,
        formattedCreateTime,
        search,
        changeLanguage,
        toggleFollow,
        translations,
        followeesUrl,
        followersUrl,
      };

    },
  };
  </script>

.el-header {
    background-color: #f0f0f0;
  }
  
  .el-container {
    background-color: rgb(230, 124, 18);
  }
  
  .el-main {
    background-color: rgb(244, 247, 236);
    padding-top: 0px;
  }
  
  
  .el-menu-demo {
    /* display: flex; */
    justify-content: space-between;
    /* align-items: center; */
    /* width: 100%; */
  }
  
  .el-tabs {
    width: 300px;
    max-width: 100%;
    margin-top: auto;
    margin-bottom: auto;
    padding-top: 0;
    padding: 0px;
    height: auto;
  }


  
  <style scoped>
  .bg-dark {
    background-color: #343a40 !important;
  }
  
  .sticky-top {
    position: sticky;
    top: 0;
    z-index: 1020;
  }
  
  .search-input {
    margin-right: 8px;
  }
  </style>
  