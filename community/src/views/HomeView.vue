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
        <el-tab-pane :label="translations.hottest.value" name="0"></el-tab-pane>
        <el-tab-pane :label="translations.latest.value" name="1"></el-tab-pane>
      </el-tabs>

      <div v-for="post in paginatedItems" :key="post.id" class="post-item">
        <el-avatar :src="post.userAvatar" class="post-avatar"></el-avatar>
        <div class="post-content">
          <router-link :to="`/discuss/detail/${post.id}`" class="post-title">{{ post.title }}</router-link>
          <div class="post-meta">
            <span class="post-author">{{ post.author }}</span>
            <span class="post-time">{{ translations.publishtime }} {{ post.createTime }}</span>
          </div>
          <div class="post-stats">
            <el-tag>{{ translations.like }} {{ post.likeCount }}</el-tag>
            <el-tag>{{ translations.reply }} {{ post.commentCount }}</el-tag>
          </div>
        </div>
      </div>

<!--      <el-tabs v-model="orderMode" @tab-click="handleTabClick" class="tabs">-->
<!--        <el-tab-pane :label="translations.hottest.value" name="0">-->
<!--          <div  v-for="post in hottestPosts" :key="post.id" class="post-item">-->
<!--            <el-avatar :src="post.userAvatar" class="post-avatar"></el-avatar>-->
<!--            <div class="post-content">-->
<!--              <router-link :to="`/discuss/detail/${post.id}`" class="post-title">{{ post.title }}</router-link>-->
<!--              <div class="post-meta">-->
<!--                <span class="post-author">{{ post.author }}</span>-->
<!--                <span class="post-time">{{ translations.publishtime }} {{ post.createTime }}</span>-->
<!--              </div>-->
<!--              <div class="post-stats">-->
<!--                <el-tag>{{ translations.like }} {{ post.likeCount }}</el-tag>-->
<!--                <el-tag>{{ translations.reply }} {{ post.commentCount }}</el-tag>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-tab-pane>-->
<!--        <el-tab-pane :label="translations.latest.value" name="1">-->
<!--          <div v-for="post in latestPosts" :key="post.id" class="post-item">-->
<!--            <el-avatar :src="post.userAvatar" class="post-avatar"></el-avatar>-->
<!--            <div class="post-content">-->
<!--              <router-link :to="`/discuss/detail/${post.id}`" class="post-title">{{ post.title }}</router-link>-->
<!--              <div class="post-meta">-->
<!--                <span class="post-author">{{ post.author }}</span>-->
<!--                <span class="post-time">{{ translations.publishtime }} {{ post.createTime }}</span>-->
<!--              </div>-->
<!--              <div class="post-stats">-->
<!--                <el-tag>{{ translations.like }} {{ post.likeCount }}</el-tag>-->
<!--                <el-tag>{{ translations.reply }} {{ post.commentCount }}</el-tag>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-tab-pane>-->
<!--      </el-tabs>-->

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

        <div>
          <recommendbar></recommendbar>
        </div>
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
  handleTabClick, posts,
} from '@/js/global.ts';
//搜索
const searchQuery = ref('');
import router from "@/router/index.ts";

const search = () => {
  console.log('Search query:', searchQuery.value);
  if (searchQuery.value.trim()) {
    // 使用 router.push 进行路由导航
    router.push({name: 'search', query: {keyword: searchQuery.value}});
  }
};

import {computed, ref} from 'vue';
import {useCommonTranslations} from '@/lang/i18nhelper';
import {useI18n} from 'vue-i18n';
import postbox from "@/views/PostBox/Postbox.vue"
import Leftsidebar from "@/components/Leftsidebar.vue";
import recommendbar from "@/components/recommendbar.vue";

const translations = useCommonTranslations();
const {t, locale} = useI18n({useScope: "global"});
const selectedLanguage = ref('zh')
const changeLanguage = () => {
  locale.value = selectedLanguage.value
}

//
// //posts前后端交互
// import { onMounted } from 'vue';
//
// // 获取帖子列表数据
// const  posts2 = ref([]);
// onMounted(async () => {
//   try {
//     const response = await fetch('/api/getPostsData');
//     const data = await response.json();
//     posts2.value = data;
//   } catch (error) {
//     console.error('Error fetching posts data:', error);
//   }
// });
//
//
//
// // 分页信息
// const page = ref({
//   current: 1, // 当前页码
//   pageSize: 6, // 每页显示条数
//   total: posts2.value.length, // 总条数
// });
//
// //使用 computed 属性计算当前页需要显示的数据
// const paginatedItems = computed(() => {
//   const start = (page.value.current - 1) * page.value.pageSize;
//   const end = start + page.value.pageSize;
//   return posts2.value.slice(start, end);
// });
//
//
// // 处理分页变化
// const handlePageChange = (newPage: number) => {
//   page.value.current = newPage;
// };
//
// // 定义 handleTabClick 函数
// const handleTabClick = (tab: { label: string; name: string }) => {
//   console.log(`当前选中的标签: ${tab.label}`);
// };
//
//
// const hottestPosts = computed(() => {
//
//   const start = (page.value.current - 1) * page.value.pageSize;
//   const end = start + page.value.pageSize;
//   return posts.value.slice(start, end);
// });


</script>
<style scoped>
@import "@/css/views/HomeView.css";


</style>
