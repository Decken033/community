<script setup lang="ts">
import { computed, ref } from 'vue';
import axios from 'axios';
import { useCommonTranslations } from '@/lang/i18nhelper';

const translations = useCommonTranslations();
import { onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';



// 动态设置 rem 基准值
const setRem = () => {
  const baseSize = window.innerWidth / 100; // 1rem = 视窗宽度的 1/100
  document.documentElement.style.fontSize = `${baseSize}px`;
};

// 组件挂载时设置 rem，并监听窗口大小变化
onMounted(() => {
  setRem();
  window.addEventListener('resize', setRem);
});

// 在组件卸载前移除监听器
onBeforeUnmount(() => {
  window.removeEventListener('resize', setRem);
});

// 表单数据
const form = ref({
  username: '',
  password: '',
  code: '',
  rememberMe: false,
  title: '', // 发布表单中的标题
  content: '', // 发布表单中的正文
});

const searchQuery = ref('');

// 定义 orderMode 的类型并初始化
const orderMode = ref<string | number>('0'); // 初始值为 '0'

// 帖子列表数据
const posts = ref([
  { id: 1, title: '1备战春招，面试刷题跟他复习，一个月全搞定！', userAvatar: '/path/to/avatar.png', author: '寒江雪', createTime: '2024-08-19', likeCount: 11, commentCount: 7 },
  { id: 1, title: '2备战春招，面试刷题跟他复习，一个月全搞定！', userAvatar: '/path/to/avatar.png', author: '寒江雪', createTime: '2024-08-19', likeCount: 11, commentCount: 7 },
  { id: 1, title: '3备战春招，面试刷题跟他复习，一个月全搞定！', userAvatar: '/path/to/avatar.png', author: '寒江雪', createTime: '2024-08-19', likeCount: 11, commentCount: 7 },
  { id: 1, title: '4备战春招，面试刷题跟他复习，一个月全搞定！', userAvatar: '/path/to/avatar.png', author: '寒江雪', createTime: '2024-08-19', likeCount: 11, commentCount: 7 },
  { id: 1, title: '5备战春招，面试刷题跟他复习，一个月全搞定！', userAvatar: '/path/to/avatar.png', author: '寒江雪', createTime: '2024-08-19', likeCount: 11, commentCount: 7 },
  { id: 1, title: '6备战春招，面试刷题跟他复习，一个月全搞定！', userAvatar: '/path/to/avatar.png', author: '寒江雪', createTime: '2024-08-19', likeCount: 11, commentCount: 7 },
  { id: 1, title: '7备战春招，面试刷题跟他复习，一个月全搞定！', userAvatar: '/path/to/avatar.png', author: '寒江雪', createTime: '2024-08-19', likeCount: 11, commentCount: 7 },
  { id: 1, title: '8备战春招，面试刷题跟他复习，一个月全搞定！', userAvatar: '/path/to/avatar.png', author: '寒江雪', createTime: '2024-08-19', likeCount: 11, commentCount: 7 },
  { id: 1, title: '9备战春招，面试刷题跟他复习，一个月全搞定！', userAvatar: '/path/to/avatar.png', author: '寒江雪', createTime: '2024-08-19', likeCount: 11, commentCount: 7 },

  // 添加更多帖子
]);



// 发布弹出框的显示状态
const isPublishModalVisible = ref(false);

// 打开发布弹出框
const openPublishModal = () => {
  isPublishModalVisible.value = true;
};

// 发布帖子
const publishPost = () => {
  axios.post('/posts', {
    title: form.value.title,
    content: form.value.content,
  }).then(response => {
    console.log('发布成功');
    isPublishModalVisible.value = false;
  }).catch(error => {
    console.error('发布失败:', error);
  });
};




//使用 computed 属性计算当前页需要显示的数据
const paginatedItems = computed(() => {
  const start = (page.value.current - 1) * page.value.pageSize;
  const end = start + page.value.pageSize;
  return posts.value.slice(start, end);
});



// 定义 handleTabClick 函数
const handleTabClick = (tab: { label: string; name: string }) => {
  console.log(`当前选中的标签: ${tab.label}`);
};

// 搜索功能
const search = () => {
  console.log('Search query:', searchQuery.value);
};
const { t, locale } = useI18n({ useScope: "global" });
const selectedLanguage = ref('zh')
const changeLanguage = () => {
  locale.value = selectedLanguage.value
}
// const searchPlaceHolder = computed(() =>
//  t('message.search')
// )


interface User {
  id: number;
  username: string;
  headerUrl: string;
}

interface UserFollow {
  user: User;
  followTime: Date;
  hasFollowed: boolean;
}

const users = ref<UserFollow[]>([
  { user: { id: 1, username: 'User1', headerUrl: 'http://example.com/avatar1.png' }, followTime: new Date(), hasFollowed: true },
  { user: { id: 2, username: 'User2', headerUrl: 'http://example.com/avatar2.png' }, followTime: new Date(), hasFollowed: false },
  // Add more users as needed
]);

const page = ref({
  current: 1,
  pageSize: 5,
  total: users.value.length,
});

const paginatedUsers = computed(() => {
  const start = (page.value.current - 1) * page.value.pageSize;
  const end = start + page.value.pageSize;
  return users.value.slice(start, end);
});

const handlePageChange = (newPage: number) => {
  page.value.current = newPage;
};

const toggleFollow = (userFollow: UserFollow) => {
  userFollow.hasFollowed = !userFollow.hasFollowed;
  ElMessage.success(userFollow.hasFollowed ? 'Followed' : 'Unfollowed');
};

import { useRoute } from 'vue-router';

const route = useRoute();
const userId = route.params.id;
</script>

<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <!-- 导航 -->
      <el-menu class="el-menu-demo" type="flex">
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
          <router-link to="/settings">{{ translations.settings }}</router-link>
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
      <div>
        <el-button type="primary">
          <router-link :to="`/followee/${userId}`">{{ translations.followees.value }}</router-link>
        </el-button>
        <el-button type="success">
          <router-link :to="`/follower/${userId}`">{{ translations.followers.value }}</router-link>
        </el-button>
      </div>

      <div class="user-cards">
        <el-row :gutter="20">
          <el-col v-for="userFollow in paginatedUsers" :key="userFollow.user.id" :span="8">
            <el-card>
              <div class="user-card">
                <el-avatar :src="userFollow.user.headerUrl" class="user-avatar"></el-avatar>
                <div class="user-info">
                  <h3>{{ userFollow.user.username }}</h3>
                  <p>Follow Time: {{ userFollow.followTime }}</p>
                  <el-button @click="toggleFollow(userFollow)">
                    {{ userFollow.hasFollowed ? 'Unfollow' : 'Follow' }}
                  </el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-pagination
            v-if="page.total > 0"
            :current-page="page.current"
            :page-size="page.pageSize"
            :total="page.total"
            @current-change="handlePageChange"
        />
      </div>
    </el-main>

  </el-container>
</template>

<style>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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

.user-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.user-card {
  display: flex;
  align-items: center;
}

.user-avatar {
  margin-right: 20px;
}

.user-info {
  flex: 1;
}

.user-info h3 {
  margin: 0;
  font-size: 1.2em;
}

.user-info p {
  margin: 5px 0;
  color: #888;
}
/* Optional: Add custom styles for the buttons if needed */
.el-button {
  margin-right: 2%;
}

.router-link-active {
  color: white; /* Ensure the text color is visible on the button */
}


</style>
