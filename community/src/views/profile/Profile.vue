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
          <el-tab-pane label="个人信息" name='0'>
            <div class="profile-card">
              <el-row>
                <el-col :span="4">
                  <el-avatar :src=user.headerImg size="large"></el-avatar>
                </el-col>
                <el-col :span="20">
                  <h5 class="profile-username">
                    <span>{{ user.username }}</span>
                  </h5>
                  <div class="profile-meta">
                    <span>注册于 <i>{{ formatDate(user.createTime) }}</i></span>
                  </div>
                  <el-button @click="toggleFollow()" v-if="!hasFollowed">
                    {{ "关注" }}
                  </el-button>
                  <el-button @click="toggleUnfollow()" v-if="hasFollowed">
                    {{ "取消关注" }}
                  </el-button>
                  <div class="profile-stats">
                    <span>关注了 <router-link :to="followeesUrl">{{ followeeCount }}</router-link> 人</span>
                    <span class="ml-4">关注者 <router-link :to="followersUrl">{{
                        followerCount
                      }}</router-link> 人</span>
                    <span class="ml-4">获得了 <i class="text-danger">{{ likeCount }}</i> 个赞</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>

          <!-- 我的帖子选项卡 -->
          <el-tab-pane label="我的帖子" name='1'>
            <div v-for="item in discussPosts" :key="item.id" class="post-item">
              <div class="post-content">
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
                  <el-button class="delete" @click="deletePost(item.post.id)">删帖</el-button>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <!-- 回复内容选项卡 -->
          <el-tab-pane label="我的回复" name='2'>
            <div v-for="item in comments" :key="item.id" class="comment-item">
              <div class="comment-content">
                <a>{{ item.comment.content }}</a>
                <div class="comment-meta">
                  <span class="comment-author">{{ item.user.username }}</span>
                  <span class="comment-author">{{ item.user.username }}</span>
                  <span class="comment-time">{{ translations.publishtime }} {{
                      formatDate(item.comment.createTime)
                    }}</span>
                </div>
                <div class="comment-stats">
                  <el-tag>{{ translations.like }} {{ item.likeCount }}</el-tag>
                  <el-tag>{{ translations.reply }} {{ item.replyCount }}</el-tag>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <!-- 其他选项卡 -->
          <el-tab-pane label="其他内容" name="other">
            <!--            <div>-->
            <!--              <h2>其他内容</h2>-->
            <!--              <p>这里是“其他内容”选项卡中的内容。</p>-->
            <!--              &lt;!&ndash; 你可以根据需要添加更多的选项卡和内容 &ndash;&gt;-->
            <!--            </div>-->
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
        <div>
          <recommendbar></recommendbar>
        </div>
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
import {formatDate} from "@/js/global";

//个人信息部分
const {t, locale} = useI18n();
const followeeCount = ref(0);
const followerCount = ref(0);
const likeCount = ref(0);
const searchQuery = ref('');
const selectedLanguage = ref('zh');
const activeTab = ref('info');
const translations = useCommonTranslations();
const comments = ref([]);
const discussPosts = ref([]);
const user = ref('');
const hasFollowed = ref(false);




onMounted(() => {
  fetchUserProfile();
});

import api from "@/api/api.ts"
import router from "@/router";

const loadData = (response) => {
  user.value = response.data.loginUser;
  discussPosts.value = response.data.discussPosts;
  comments.value = response.data.comments;
  hasFollowed.value = response.data.hasFollowed;
  followeeCount.value = response.data.followeeCount;
  followerCount.value = response.data.followerCount;
  likeCount.value = response.data.likeCount;
}

const fetchUserProfile = async () => {
  try {
    const userId = localStorage.getItem('userId');
    const response = await axios.get(api.profile.user + `${userId}`, {
      params: {
        ticket: localStorage.getItem('ticket'),
      }
    });
    console.log('Fetched posts:', response);
    loadData(response);
  } catch (error) {
    console.error('获取用户资料时出错:', error);
  }
};

const formData = ref(new FormData());

const loadFormData = () => {
  formData.value.append("entityType", 3);
  formData.value.append("entityId", user.value.id);
}
//关注
const toggleFollow = async () => {
  loadFormData();
  try {
    const response = await fetch(api.follow.follow + "?ticket=" + localStorage.getItem("ticket"), {
      method: 'POST',
      body: formData.value,
    });
    hasFollowed.value = true;

  } catch (error) {
    console.error('关注时出错:', error);
  }
}

const toggleUnfollow = async () => {
  loadFormData();
  try {
    const response = await fetch(api.follow.unfollow + "?ticket=" + localStorage.getItem("ticket"), {
      method: 'POST',
      body: formData.value,
    });
    hasFollowed.value = false;

  } catch (error) {
    console.error('关注时出错:', error);
  }
}


const deletePost= async (postId: number) => {
  const form = ref(new FormData());
  form.value.append("id", postId);
  const response = await fetch(api.discuss.delete + "?ticket=" + localStorage.getItem("ticket"), {
    method: 'POST',
    body: form.value
  });
  console.log(response);
  const data = await response.json();
  ElMessage.success("删帖成功");
  fetchUserProfile();
}

const search = () => {
  console.log('Search query:', searchQuery.value);
};

const changeLanguage = (value: any) => {
  locale.value = value;
};

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
import recommendbar from "@/components/recommendbar.vue"
</script>


<style scoped>
@import "@/css/views/profile.css";
</style>
  