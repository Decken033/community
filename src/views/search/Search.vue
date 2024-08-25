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
          <el-badge :value="12" class="item"/>
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
          <el-input v-model="searchQuery" @keyup.enter="search"/>
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

    <el-main>
      <el-list>
        <el-list-item v-for="(map, index) in searchResults" :key="index">
          <el-avatar :src="map.user.headerUrl" class="mr-4" size="50"></el-avatar>
          <div class="media-body">
            <h6 class="mt-0 mb-3">
              <router-link :to="detailPath(map.post.id)" class="post-title">
                <span v-html="map.post.title"></span>
              </router-link>
            </h6>
            <div class="mb-3">
              <!-- 文章内容 -->
            </div>
            <div class="text-muted font-size-12">
              <u class="mr-3">{{ map.user.username }}</u>
              发布于 <b>{{ map.post.createTime }}</b>
              <ul class="d-inline float-right">
                <li class="d-inline ml-2">赞 <i>{{ map.likeCount }}</i></li>
                <li class="d-inline ml-2">|</li>
                <li class="d-inline ml-2">回复 <i>{{ map.commentCount }}</i></li>
              </ul>
            </div>
          </div>
        </el-list-item>
      </el-list>
    </el-main>
  </el-container>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCommonTranslations } from '@/lang/i18nhelper';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const translations = useCommonTranslations();

    const setRem = () => {
      const baseSize = window.innerWidth / 100; // 1rem = 视窗宽度的 1/100
      document.documentElement.style.fontSize = `${baseSize}px`;
    };

    onMounted(() => {
      setRem();
      window.addEventListener('resize', setRem);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', setRem);
    });

    const form = ref({
      username: '',
      password: '',
      code: '',
      rememberMe: false,
      title: '',
      content: '',
    });

    const orderMode = ref('0');
    const isPublishModalVisible = ref(false);

    const openPublishModal = () => {
      isPublishModalVisible.value = true;
    };

    const publishPost = () => {
      // 模拟发布帖子
      console.log('发布成功');
      isPublishModalVisible.value = false;
    };

    const posts = ref([
      {
        post: {
          id: 1,
          title: '1备战春招，面试刷题跟他复习，一个月全搞定！',
          content: '这是第一篇帖子的内容。',
          createTime: '2024-08-19 12:00:00'
        },
        user: {
          id: 1,
          username: '寒江雪',
          headerUrl: '/path/to/avatar.png'
        },
        likeCount: 11,
        commentCount: 7
      },
      {
        post: {
          id: 2,
          title: '2如何快速提升算法能力',
          content: '这是第二篇帖子的内容。',
          createTime: '2024-08-20 13:00:00'
        },
        user: {
          id: 2,
          username: '青山',
          headerUrl: '/path/to/avatar2.png'
        },
        likeCount: 15,
        commentCount: 10
      },
      {
        post: {
          id: 3,
          title: '3前端开发最佳实践',
          content: '这是第三篇帖子的内容。',
          createTime: '2024-08-21 14:30:00'
        },
        user: {
          id: 3,
          username: '北风',
          headerUrl: '/path/to/avatar3.png'
        },
        likeCount: 9,
        commentCount: 5
      },
      {
        post: {
          id: 4,
          title: '4深入理解JavaScript异步编程',
          content: '这是第四篇帖子的内容。',
          createTime: '2024-08-22 15:45:00'
        },
        user: {
          id: 4,
          username: '东海',
          headerUrl: '/path/to/avatar4.png'
        },
        likeCount: 20,
        commentCount: 12
      },
      {
        post: {
          id: 5,
          title: '5Spring Boot 实战',
          content: '这是第五篇帖子的内容。',
          createTime: '2024-08-23 16:10:00'
        },
        user: {
          id: 5,
          username: '南山',
          headerUrl: '/path/to/avatar5.png'
        },
        likeCount: 7,
        commentCount: 3
      },
      {
        post: {
          id: 6,
          title: '6数据库设计的艺术',
          content: '这是第六篇帖子的内容。',
          createTime: '2024-08-24 17:20:00'
        },
        user: {
          id: 6,
          username: '西风',
          headerUrl: '/path/to/avatar6.png'
        },
        likeCount: 13,
        commentCount: 8
      }
    ]);


    const page = ref({
      current: 1,
      pageSize: 10,
      total: posts.value.length,
    });

    const paginatedItems = computed(() => {
      const start = (page.value.current - 1) * page.value.pageSize;
      const end = start + page.value.pageSize;
      return posts.value.slice(start, end);
    });

    const handlePageChange = (newPage) => {
      page.value.current = newPage;
    };

    const { t, locale } = useI18n({ useScope: 'global' });
    const selectedLanguage = ref('zh');
    const changeLanguage = () => {
      locale.value = selectedLanguage.value;
    };

    const detailPath = (id) => {
      return `/discuss/detail/${id}`;
    };

    const route = useRoute();
    const searchQuery = ref(route.query.keyword || '');
    const searchResults = ref([]);

    const fetchSearchResults = () => {
      const query = searchQuery.value.trim().toLowerCase();  // 去除空格并小写化
      searchResults.value = posts.value.filter(item =>
          item.post.title.toLowerCase().includes(query) ||
          item.post.content.toLowerCase().includes(query) ||
          item.user.username.toLowerCase().includes(query)
      );
    };


    //使用 axios 向后端 API 发送 GET 请求
    // const fetchSearchResults = async () => {
    //   try {
    //     const response = await axios.get('/api/search', {
    //       params: { query: searchQuery.value },
    //     });
    //     searchResults.value = response.data.discussPosts;
    //   } catch (error) {
    //     console.error('搜索失败:', error);
    //   }
    // };

    onMounted(() => {
      if (searchQuery.value) {
        fetchSearchResults();  // 页面加载时执行搜索
      }
    });

    const router = useRouter();
    const search = () => {
      if (searchQuery.value.trim()) {
        router.push({ name: 'search', query: { keyword: searchQuery.value } });
        fetchSearchResults();  // 更新搜索结果
      }
    };

    return {
      translations,
      searchQuery,
      openPublishModal,
      publishPost,
      form,
      isPublishModalVisible,
      orderMode,
      posts,
      page,
      paginatedItems,
      handlePageChange,
      search,
      t,
      locale,
      selectedLanguage,
      changeLanguage,
      detailPath,
      fetchSearchResults,
      searchResults,
    };
  },
};
</script>

<style scoped>
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
</style>
