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
const activeTab = ref("0");
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

import recommendbar from "@/components/recommendbar.vue"
</script>


<style scoped>
@import "@/css/views/profile.css";
</style>
  