<template>
  <el-container>
    <!-- 头部 -->
    <div class="leftsidebar">
      <leftsidebar></leftsidebar>
    </div>




    <!-- 内容 -->
    <el-main>
      <div class="container">
            <el-tabs v-model="activeTab">
              <el-tab-pane label="个人信息" name=0>
                  <div class="profile-card">
                    <el-row>
                      <el-col :span="4">
<!--                        <el-avatar :src="`data:image/png;base64,${user.avatar}`" size="large"></el-avatar>-->
                      </el-col>
                      <el-col :span="20">
                        <h5 class="profile-username">
                          <span>{{ user.username }}</span>
                        </h5>
                        <div class="profile-meta">
                          <span>注册于 <i>{{ formattedCreateTime }}</i></span>
                        </div>
<!--                        <el-button @click="toggleFollow(userFollow)">-->
<!--                          {{ userFollow.hasFollowed ? 'Unfollow' : 'Follow' }}-->
<!--                        </el-button>-->
                        <div class="profile-stats">
                          <span>关注了 <router-link :to="followeesUrl">{{ followeeCount }}</router-link> 人</span>
                          <span class="ml-4">关注者 <router-link :to="followersUrl">{{ followerCount }}</router-link> 人</span>
                          <span class="ml-4">获得了 <i class="text-danger">{{ likeCount }}</i> 个赞</span>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
              </el-tab-pane>

              <!-- 我的帖子选项卡 -->
              <el-tab-pane label="我的帖子" name=1>
                <div v-for="item in discussPosts" :key="post.id" class="post-item">
                  <el-avatar :src="item.userAvatar" class="post-avatar"></el-avatar>
                  <div class="post-content">
                    <router-link :to="`/discuss/detail/${post.id}`" class="post-title">{{ item }}</router-link>
                    <div class="post-meta">
                      <span class="post-author">{{ item.author }}</span>
                      <span class="post-time">{{ translations.publishtime }} {{ item.createTime }}</span>
                    </div>
                    <div class="post-stats">
                      <el-tag>{{ translations.like }} {{ item.likeCount }}</el-tag>
                      <el-tag>{{ translations.reply }} {{ item.commentCount }}</el-tag>
                    </div>
                  </div>
                </div>
              </el-tab-pane>

              <!-- 回复内容选项卡 -->
              <el-tab-pane label="我的回复" name=2  >
                <div v-for="post in comments" :key="post.id" class="post-item">
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

              </el-tab-pane>

              <!-- 其他选项卡 -->
              <el-tab-pane label="其他内容" name="other">
                <div>
                  <h2>其他内容</h2>
                  <p>这里是“其他内容”选项卡中的内容。</p>
                  <!-- 你可以根据需要添加更多的选项卡和内容 -->
                </div>
              </el-tab-pane>
            </el-tabs>



      </div>
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

<script lang="ts" setup>
import {ref, computed} from 'vue';
import {useRoute} from 'vue-router';
import {ElMessage} from 'element-plus';
import {useI18n} from 'vue-i18n';
import {useCommonTranslations} from '@/lang/i18nhelper';
import leftsidebar from '@/components/Leftsidebar.vue';
import {onMounted} from "vue";
import axios from "axios";

//个人信息部分
const {t, locale} = useI18n();

const user = {
  id: 1,
  username: 'nowcoder',
  createTime: new Date(),
};
const followeeCount = 123;
const followerCount = 456;
const hasFollowed = ref(false);
const likeCount = 87;
const searchQuery = ref('');
const selectedLanguage = ref('zh');
const activeTab = ref('info');
const translations = useCommonTranslations();
const comments = ref([]);
const discussPosts = ref([]);

const orderMode = ref(0);


onMounted(() => {
  fetchUserProfile();
});
const fetchUserProfile = async () => {
  try {
    const userId = 5;
    const response = await axios.get(`/user/profile/${userId}`);

    console.log('Fetched posts:', response);



    // user.value = response.data.loginUser;
    // const data = await response
    //
    // likeCount.value = response.data.likeCount;
    // followeeCount.value = response.data.followeeCount;
    // followerCount.value = response.data.followerCount;
    // //hasFollowed.value = response.data.hasFollowed;
    //
    // discussPosts.value = data.discussPosts;
    // comments.value = data.comments;




  } catch (error) {
    console.error('获取用户资料时出错:', error);
  }
};

const handleTabClick = (tab) => {
  orderMode.value = tab.value;
  fetchPosts();
};

// onMounted(() => {
//   fetchUserProfile();
// });


const search = () => {
  console.log('Search query:', searchQuery.value);
};

const changeLanguage = (value) => {
  locale.value = value;
};


// 增加根据id生成路径
const followeesUrl = computed(() => `/followee/${user.id}`);
const followersUrl = computed(() => `/follower/${user.id}`);









//我的帖子部分
const posts = ref([
  {
    title: '备战春招，面试刷题跟他复习，一个月全搞定！',
    content: `金三银四的金三已经到了，你还沉浸在过年的喜悦中吗？
    如果是，那我要让你清醒一下了：目前大部分公司已经开启了内推，正式网申也将在3月份陆续开始，金三银四，春招的求职黄金时期已经来啦！！！
    再不准备，作为19应届生的你可能就找不到工作了。。。作为20届实习生的你可能就找不到实习了。。。
    现阶段时间紧，任务重，能做到短时间内快速提升的也就只有算法了，
    那么算法要怎么复习？重点在哪里？常见笔试面试算法题型和解题思路以及最优代码是怎样的？
    跟左程云老师学算法，不仅能解决以上所有问题，还能在短时间内得到最大程度的提升！！！`,
    likes: 11,
    publishedAt: '2019-04-15 10:10:10',
  },
  {
    title: '如何高效准备技术面试',
    content: `面试不仅仅是考察你的技术能力，也是对你问题解决能力的一个检验。为了更好地应对面试，建议大家在备战的时候，多做一些系统性的准备，包括算法、数据结构、系统设计等方面的知识。`,
    likes: 8,
    publishedAt: '2019-03-20 15:30:00',
  },
  {
    title: '春招求职攻略：从简历到面试',
    content: `金三银四，春招的求职黄金期已经来临。本文为大家整理了一份从简历制作到面试技巧的完整攻略，帮助应届生更好地准备春招。`,
    likes: 5,
    publishedAt: '2019-03-10 12:00:00',
  },
  {
    title: '算法复习：必刷的LeetCode经典题目',
    content: `在准备技术面试时，刷题是一个必不可少的环节。本文推荐了一些LeetCode上经典的算法题目，帮助大家在短时间内快速提升算法能力。`,
    likes: 20,
    publishedAt: '2019-02-28 09:45:00',
  },
  {
    title: '面试心态调整及注意事项',
    content: `在面试过程中，心态的好坏往往决定了面试的成败。本文将介绍一些调整心态的方法，并总结了面试时需要注意的事项，帮助大家在面试中发挥出最佳水平。`,
    likes: 15,
    publishedAt: '2019-01-22 08:30:00',
  }
])

const page = ref({
  current: 1,
  pageSize: 3,
  total: posts.value.length,
})

const paginatedPosts = computed(() => {
  const start = (page.value.current - 1) * page.value.pageSize
  const end = start + page.value.pageSize
  return posts.value.slice(start, end)
})

const handlePageChange = (newPage) => {
  page.value.current = newPage
  ElMessage.success({
    message: `切换到第 ${newPage} 页`,
    duration: 1000 // 显示时间调整1秒
  })
}




//我的回复
const replies = ref([
  {
    title: '备战春招，面试刷题跟他复习，一个月全搞定！',
    content: '顶顶顶!',
    repliedAt: '2019-04-15 10:10:10',
  },
  {
    title: '备战春招，面试刷题跟他复习，一个月全搞定！',
    content: '顶顶顶!',
    repliedAt: '2019-04-15 10:10:10',
  },
  // 其他回复...
  {
    title: '备战春招，面试刷题跟他复习，一个月全搞定！',
    content: '顶顶顶!',
    repliedAt: '2019-04-15 10:10:10',
  }
])


//根据当前页码和每页的条目数，计算并返回当前页面应显示的回复列表
const paginatedReplies = computed(() => {
  const start = (page.value.current - 1) * page.value.pageSize
  const end = start + page.value.pageSize
  return replies.value.slice(start, end)
})



</script>




<style scoped>
@import "@/css/views/profile.css";
</style>
  