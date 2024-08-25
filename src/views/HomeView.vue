<script setup lang="ts">
import { computed, ref } from 'vue';
import axios from 'axios';
import { useCommonTranslations } from '@/lang/i18nhelper';

const translations = useCommonTranslations();
import { onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import {useRouter} from "vue-router";


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


// 分页信息
const page = ref({
  current: 1, // 当前页码
  pageSize: 3, // 每页显示条数
  total: posts.value.length, // 总条数
});

//使用 computed 属性计算当前页需要显示的数据
const paginatedItems = computed(() => {
  const start = (page.value.current - 1) * page.value.pageSize;
  const end = start + page.value.pageSize;
  return posts.value.slice(start, end);
});


// 处理分页变化
const handlePageChange = (newPage: number) => {
  page.value.current = newPage;
  // 在这里你可以根据新的页码请求数据

  // 示例 API 请求
  // const response = await fetch(`/api/items?page=${newPage}&pageSize=${page.value.pageSize}`);
  // const data = await response.json();

  // posts.value = data.items;
  // page.value.total = data.total;
};

// 定义 handleTabClick 函数
const handleTabClick = (tab: { label: string; name: string }) => {
  console.log(`当前选中的标签: ${tab.label}`);
};

// 搜索功能
const router = useRouter();
const search = () => {
  console.log('Search query:', searchQuery.value);
  if (searchQuery.value.trim()) {
    // 使用 router.push 进行路由导航
    router.push({ name: 'search', query: { keyword: searchQuery.value } });
  }
};

const { t, locale } = useI18n({ useScope: "global" });
const selectedLanguage = ref('zh')
const changeLanguage = () => {
  locale.value = selectedLanguage.value
}


</script>

<template>
  <el-container>
    <!-- 头部 -->
<!--    <el-header>-->
<!--      &lt;!&ndash; 导航 &ndash;&gt;-->
<!--      <el-menu class="el-menu-demo" type="flex">-->
<!--        &lt;!&ndash; 首页 &ndash;&gt;-->
<!--&lt;!&ndash;        <el-menu-item index="1">&ndash;&gt;-->
<!--&lt;!&ndash;          <router-link to="/">{{ translations.home }}</router-link>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-menu-item>&ndash;&gt;-->

<!--&lt;!&ndash;        &lt;!&ndash; 消息 &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;        <el-menu-item index="2">&ndash;&gt;-->
<!--&lt;!&ndash;          <router-link to="/letter">{{ translations.news }}</router-link>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-badge :value="12" class="item" />&ndash;&gt;-->
<!--&lt;!&ndash;        </el-menu-item>&ndash;&gt;-->

<!--&lt;!&ndash;        &lt;!&ndash; 注册 &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;        <el-menu-item index="3">&ndash;&gt;-->
<!--&lt;!&ndash;          <router-link to="/register">{{ translations.register }}</router-link>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-menu-item>&ndash;&gt;-->

<!--&lt;!&ndash;        &lt;!&ndash; 登录 &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;        <el-menu-item index="4">&ndash;&gt;-->
<!--&lt;!&ndash;          <router-link to="/login">{{ translations.login }}</router-link>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-menu-item>&ndash;&gt;-->

<!--&lt;!&ndash;        &lt;!&ndash; 个人主页 &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;        <el-menu-item index="5">&ndash;&gt;-->
<!--&lt;!&ndash;          <router-link to="/profile">{{ translations.profile }}</router-link>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-menu-item>&ndash;&gt;-->

<!--&lt;!&ndash;        &lt;!&ndash; 账号设置 &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;        <el-menu-item index="6">&ndash;&gt;-->
<!--&lt;!&ndash;          <router-link to="/settings">{{ translations.settings }}</router-link>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-menu-item>&ndash;&gt;-->

<!--&lt;!&ndash;        &lt;!&ndash; 视频聊天 &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;        <el-menu-item index="7">&ndash;&gt;-->
<!--&lt;!&ndash;          <router-link to="/settings">视频聊天</router-link>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-menu-item>&ndash;&gt;-->

<!--        &lt;!&ndash; 搜索 &ndash;&gt;-->
<!--        <el-menu-item index="8">-->
<!--          <el-input v-model="searchQuery" @keyup.enter="search" style="width: 200px;"/>-->
<!--          <el-button @click="search" type="primary">{{ translations.search }}</el-button>-->
<!--&lt;!&ndash;          <p>当前搜索关键字: {{ searchQuery }}</p>&ndash;&gt;-->
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

   <el-aside class="leftsidebar">
     <el-menu  type="flex" class="el-menu-demo">
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

     </el-menu>

   </el-aside>

    <!-- 内容 -->
    <el-main>
      <!-- 筛选条件 -->

      <!--TODO-->
      <!-- 发布弹出框 -->
      <el-dialog title="新帖发布" :visible.sync="isPublishModalVisible" width="100%">
        <el-form :model="form">
          <el-form-item label="标题">
            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="正文">
            <el-input type="textarea" v-model="form.content" placeholder="请输入正文" rows="15"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isPublishModalVisible = false">取消</el-button>
          <el-button type="primary" @click="publishPost">发布</el-button>
        </div>
      </el-dialog>


      <el-tabs v-model="orderMode" @tab-click="handleTabClick">
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
      <el-pagination v-if="page.total > 0" :current-page="page.current" :page-size="page.pageSize" :total="page.total"
        @current-change="handlePageChange">
      </el-pagination>




    </el-main>
    <el-aside class="rightsidebar">
      <div class="search-bar">
      <el-input v-model="searchQuery" @keyup.enter="search" style="width: 200px;"/>
      <el-button @click="search" type="primary">{{ translations.search }}</el-button>
<!--      <p>当前搜索关键字: {{ searchQuery }}</p> 应该改为placeholder-->
        </div>
    </el-aside>
  </el-container>
</template>

<style scoped>
.el-header {
  background-color: #f0f0f0;
}
.rightsidebar{
  width:30%;
}

.el-container {
  background-color: white;
  width:100%;
  height: 100%;
}
.search-bar{
  height:10%;
}
.el-main {
  background-color: rgb(244, 247, 236);
  padding-top: 0px;
  width:40%;
  height:100%;
  //transform: translateX(-30%)；
}

.leftsidebar {
  display: flex;
  width: 30%;
  height: 100%;
  //transform: translateX(10%);
}
.el-menu-demo {
  display: flex;
  //justify-content: space-between;
  //align-items: center;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 0;
  transform: translateX(50%);
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





.post-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.post-content {
  margin-left: 10px;
}

.post-title {
  font-weight: bold;
  font-size: 1.2em;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}

.post-stats {
  display: flex;
  gap: 10px;
}

.float-right {
  float: right;
}
</style>
