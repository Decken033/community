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

      <div v-for="post in discussPosts" :key="post.id" class="post-item">
<!--        <el-avatar :src="`data:image/png;base64,${user.avatar}`" class="post-avatar"></el-avatar>-->
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




//最新，最热
const orderMode = ref('0');
const page = ref({
  current: 1,
  pageSize: 6,
  total: 10
});
const start=ref(0);
const end=ref(1);
const discussPosts = ref([]);
const title = ref('');
const likeCount = ref(1);
const commentCount = ref(1);

const fetchPosts = async (orderModeValue) => {
  try {
    const response = await axios.get('/index', {
      params: { orderMode: orderModeValue }
    });
    const data = await response.json();
    page.value.total = data.Page.rows;
    page.value.current = data.Page.current;
    page.value.pageSize = data.Page.limit;
    start.value = (page.value.current - 1) * page.value.pageSize;
    if (start.value + page.value.pageSize  > page.value.total){
      end.value = page.value.total;
    }else{
      end.value = start.value + page.value.pageSize;
    }

    likeCount.value = data.likeCount;
    commentCount.value = data.commentCount;
    title.value = data.title;
    discussPosts.value = data.discussPosts;


  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};


const handleTabClick = (tab) => {
  console.log('Tab clicked:', tab.name);
  orderMode.value = tab.name;
  fetchPosts(orderMode.value);
};




//切换语言，侧边栏
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

</script>
<style scoped>
@import "@/css/views/HomeView.css";


</style>
