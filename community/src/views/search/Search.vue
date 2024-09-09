<template>
  <el-container>
    <el-aside class="leftsidebar">
      <Leftsidebar></Leftsidebar>
    </el-aside>
    <!-- 内容 -->
    <el-main>
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

<script lang="ts" setup>
import {useRoute} from "vue-router";
import axios from "axios";
import {onMounted, ref} from "vue";





//搜索帖子数据
const discussPosts = ref([]);
const start = ref(0);
const end = ref(1);
const page = ref({
  current: 1,
  pageSize: 6,
  total: 10
});
import api from "@/api/api"
// 发送搜索请求
const fetchSearch = async () => {
  const route = useRoute();
  const keyword = route.query.keyword;
  try {
    const response = await axios.get(api.search, {
      params: {
        keyword: keyword,
        ticket: localStorage.getItem('ticket')
      }
    });
    loadData(response.data);
    console.log(discussPosts.value);
  } catch (error) {
    console.log('Error fetching search results:', error);
  }
}
onMounted(() => {
  fetchSearch();
})
//加载数据封装
const loadData = (data: any) => {
  discussPosts.value = data.discussPosts;
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
const searchQuery = ref('');
const search = () => {
  console.log('Search query:', searchQuery.value);
  if (searchQuery.value.trim()) {
    // 使用 router.push 进行路由导航
    router.push({name: 'search', query: {keyword: searchQuery.value}});
  }
};
import {useCommonTranslations} from '@/lang/i18nhelper';
import {useI18n} from 'vue-i18n';
import postbox from "@/views/PostBox/Postbox.vue"
import Leftsidebar from "@/components/Leftsidebar.vue";
import recommendbar from "@/components/recommendbar.vue";
import {formatDate} from "@/js/global";
import router from "@/router";
</script>

<style scoped>
@import "@/css/views/search.css";
</style>
<!--<template>-->
<!--  <el-container>-->
<!--    &lt;!&ndash; 头部 &ndash;&gt;-->
<!--    <el-header>-->
<!--      &lt;!&ndash; 导航 &ndash;&gt;-->
<!--      <el-menu class="el-menu-demo" mode="horizontal">-->
<!--        &lt;!&ndash; 首页 &ndash;&gt;-->
<!--        <el-menu-item index="1">-->
<!--          <router-link to="/">{{ translations.home }}</router-link>-->
<!--        </el-menu-item>-->

<!--        &lt;!&ndash; 消息 &ndash;&gt;-->
<!--        <el-menu-item index="2">-->
<!--          <router-link to="/letter">{{ translations.news }}</router-link>-->
<!--          <el-badge :value="12" class="item"/>-->
<!--        </el-menu-item>-->

<!--        &lt;!&ndash; 注册 &ndash;&gt;-->
<!--        <el-menu-item index="3">-->
<!--          <router-link to="/register">{{ translations.register }}</router-link>-->
<!--        </el-menu-item>-->

<!--        &lt;!&ndash; 登录 &ndash;&gt;-->
<!--        <el-menu-item index="4">-->
<!--          <router-link to="/login">{{ translations.login }}</router-link>-->
<!--        </el-menu-item>-->

<!--        &lt;!&ndash; 个人主页 &ndash;&gt;-->
<!--        <el-menu-item index="5">-->
<!--          <router-link to="/profile">{{ translations.profile }}</router-link>-->
<!--        </el-menu-item>-->

<!--        &lt;!&ndash; 账号设置 &ndash;&gt;-->
<!--        <el-menu-item index="6">-->
<!--          <router-link to="/settings">{{ translations.settings }}</router-link>-->
<!--        </el-menu-item>-->

<!--        &lt;!&ndash; 视频聊天 &ndash;&gt;-->
<!--        <el-menu-item index="7">-->
<!--          <router-link to="/settings">{{translations.videochat}}</router-link>-->
<!--        </el-menu-item>-->

<!--        &lt;!&ndash; 搜索 &ndash;&gt;-->
<!--        <el-menu-item index="8">-->
<!--          <el-input v-model="searchQuery" @keyup.enter="search"/>-->
<!--          <el-button @click="search" type="primary">{{ translations.search }}</el-button>-->
<!--        </el-menu-item>-->

<!--        <el-menu-item index="9">-->
<!--          <el-button type="primary" class="float-right" @click="openPublishModal">{{ translations.publish }}</el-button>-->
<!--        </el-menu-item>-->

<!--        <el-menu-item index="10">-->
<!--          <el-select v-model="selectedLanguage" @change="changeLanguage" placeholder="Select Language">-->
<!--            <el-option label="English" value="en"></el-option>-->
<!--            <el-option label="中文" value="zh"></el-option>-->
<!--            <el-option label="Español" value="sp"></el-option>-->
<!--          </el-select>-->
<!--        </el-menu-item>-->
<!--      </el-menu>-->
<!--    </el-header>-->

<!--    <el-main>-->
<!--      <el-list>-->
<!--        <el-list-item v-for="(map, index) in searchResults" :key="index">-->
<!--          <el-avatar :src="map.user.headerUrl" class="mr-4" size="50"></el-avatar>-->
<!--          <div class="media-body">-->
<!--            <h6 class="mt-0 mb-3">-->
<!--              <router-link :to="detailPath(map.post.id)" class="post-title">-->
<!--                <span v-html="map.post.title"></span>-->
<!--              </router-link>-->
<!--            </h6>-->
<!--            <div class="mb-3">-->
<!--              &lt;!&ndash; 文章内容 &ndash;&gt;-->
<!--            </div>-->
<!--            <div class="text-muted font-size-12">-->
<!--              <u class="mr-3">{{ map.user.username }}</u>-->
<!--              发布于 <b>{{ map.post.createTime }}</b>-->
<!--              <ul class="d-inline float-right">-->
<!--                <li class="d-inline ml-2">赞 <i>{{ map.likeCount }}</i></li>-->
<!--                <li class="d-inline ml-2">|</li>-->
<!--                <li class="d-inline ml-2">回复 <i>{{ map.commentCount }}</i></li>-->
<!--              </ul>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-list-item>-->
<!--      </el-list>-->
<!--    </el-main>-->
<!--  </el-container>-->
<!--</template>-->

