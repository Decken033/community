<template>
  <el-container>
    <el-aside class="leftsidebar">
      <Leftsidebar></Leftsidebar>
    </el-aside>
    <!-- 内容 -->
    <el-main>
      <el-tabs class="tabs">
        <el-tab-pane>
          <template #label>
            <router-link to="/letter" class="nav-link position-relative">
              {{ translations.friendmessage }}
              <el-badge v-if="letterUnreadCount != 0" :value="letterUnreadCount" class="badge badge-danger"></el-badge>
            </router-link>
          </template>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <router-link to="/notice" class="nav-link position-relative">
              {{ translations.notification }}
              <el-badge v-if="noticeUnreadCount != 0" :value="noticeUnreadCount" class="badge badge-danger"></el-badge>
            </router-link>
          </template>
        </el-tab-pane>
      </el-tabs>

      <!-- 通知列表 -->
      <div>
        <!-- 评论类通知 -->
        <el-card v-if="commentNotice" class="media pb-3 pt-3 mb-3 border-bottom position-relative">
          <el-badge :value="commentNotice.unread != 0 ? commentNotice.unread : ''" class="badge badge-danger">
            <img src="http://static.nowcoder.com/images/head/reply.png" class="mr-4 user-header small-icon" alt="通知图标">
          </el-badge>
          <div class="media-body">
            <h6 class="mt-0 mb-3">
              <span>{{translations.comment}}</span>
              <span class="float-right text-muted font-size-12">
            {{ formatDate(commentNotice.message.createTime) }}
          </span>
            </h6>
            <div>
              <router-link :to="{ name: 'noticeDetail', params: { type: 'comment' }}">
                {{translations.user}} <i>{{ commentNotice.user.username }}</i> {{translations.comment}}
              </router-link>
              <ul class="d-inline font-size-12 float-right">
                <li class="d-inline ml-2">
                  <span class="text-primary">{{translations.all}} <i>{{ commentNotice.count }}</i> {{translations.conversations}}</span>
                </li>
              </ul>
            </div>
          </div>
        </el-card>

        <!-- 点赞类通知 -->
        <el-card v-if="likeNotice" class="media pb-3 pt-3 mb-3 border-bottom position-relative">
          <el-badge :value="likeNotice.unread != 0 ? likeNotice.unread : ''" class="badge badge-danger">
            <img src="http://static.nowcoder.com/images/head/like.png" class="mr-4 user-header small-icon" alt="通知图标">
          </el-badge>
          <div class="media-body">
            <h6 class="mt-0 mb-3">
              <span>{{translations.like}}</span>
              <span class="float-right text-muted font-size-12">
            {{ formatDate(likeNotice.message.createTime) }}
          </span>
            </h6>
            <div>
              <router-link :to="{ name: 'noticeDetail', params: { type: 'like' }}">
                {{translations.user}}<i>{{ likeNotice.user.username }}</i> {{translations.like}}
              </router-link>
              <ul class="d-inline font-size-12 float-right">
                <li class="d-inline ml-2">
                  <span class="text-primary">{{translations.all}} <i>{{ likeNotice.count }}</i> {{translations.conversations}}</span>
                </li>
              </ul>
            </div>
          </div>
        </el-card>

        <!-- 关注类通知 -->
        <el-card v-if="followNotice" class="media pb-3 pt-3 mb-3 border-bottom position-relative">
          <el-badge :value="followNotice.unread != 0 ? followNotice.unread : ''" class="badge badge-danger">
            <img src="http://static.nowcoder.com/images/head/follow.png" class="mr-4 user-header small-icon" alt="通知图标">
          </el-badge>
          <div class="media-body">
            <h6 class="mt-0 mb-3">
              <span>{{translations.follow}}</span>
              <span class="float-right text-muted font-size-12">
            {{ formatDate(followNotice.message.createTime) }}
          </span>
            </h6>
            <div>
              <router-link :to="{ name: 'noticeDetail', params: { type: 'follow' }}">
                {{translations.user}} <i>{{ followNotice.user.username }}</i> {{translations.follow}} ...
              </router-link>
              <ul class="d-inline font-size-12 float-right">
                <li class="d-inline ml-2">
                  <span class="text-primary">{{translations.all}}<i>{{ followNotice.count }}</i> {{translations.conversations}}</span>
                </li>
              </ul>
            </div>
          </div>
        </el-card>
      </div>


    </el-main>
    <el-aside class="rightsidebar">
      <div class="search-bar">
        <el-input v-model="searchQuery" @keyup.enter="search" style="width: 200px;"/>
        <el-button @click="search" type="primary">{{ translations.search }}</el-button>
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
import {computed, onMounted, ref} from "vue";
import router from "@/router/index.ts";
//notice信息
const letterUnreadCount = ref(5);
const noticeUnreadCount = ref(3);
const commentNotice = ref(null);
const likeNotice = ref(null);
const followNotice = ref(null);
const getNotice = async () => {
  const response = await fetch(api.notice.list);
  const data = await response.json();
  letterUnreadCount.value = data.letterUnreadCount;
  noticeUnreadCount.value = data.noticeUnreadCount;
  commentNotice.value = data.commentNotice;
  likeNotice.value = data.likeNotice;
  followNotice.value = data.followNotice;
};




onMounted(() => {
  getNotice();
});
function formatDate(date) {
  return date.toLocaleString();
}
// const commentNotice = {
//   message: {
//     createTime: new Date(),
//     unread: 2
//   },
//   user: {
//     username: 'JohnDoe'
//   },
//   entityType: 1,
//   entityId: 123,
//   postId: 456,
//   count: 5,
//   unread: 2
// };
//
// const likeNotice = {
//   message: {
//     createTime: new Date(),
//     unread: 1
//   },
//   user: {
//     username: 'JaneDoe'
//   },
//   entityType: 2,
//   entityId: 789,
//   postId: 101112,
//   count: 3,
//   unread: 1
// };
//
// const followNotice = {
//   message: {
//     createTime: new Date(),
//     unread: 0
//   },
//   user: {
//     username: 'AliceSmith'
//   },
//   entityType: 3,
//   entityId: 131415,
//   postId: 161718,
//   count: 1,
//   unread: 0
// };



//搜索调用
const searchQuery = ref('');
const search = () => {
  console.log('Search query:', searchQuery.value);
  if (searchQuery.value.trim()) {
    // 使用 router.push 进行路由导航
    router.push({name: 'search', query: {keyword: searchQuery.value}});
  }
};
//多语言支持
import {useCommonTranslations} from '@/lang/i18nhelper';
import {useI18n} from 'vue-i18n';
const translations = useCommonTranslations();
const {t, locale} = useI18n({useScope: "global"});
const selectedLanguage = ref('zh');
const changeLanguage = () => {
  locale.value = selectedLanguage.value
}
//样式
import Leftsidebar from "@/components/Leftsidebar.vue";
import recommendbar from "@/components/recommendbar.vue";
import api from "@/api/api";
</script>


<style>
/* 添加任何额外的样式 */
@import "@/css/views/notice.css";
</style>

