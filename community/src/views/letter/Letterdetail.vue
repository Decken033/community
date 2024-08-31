<template>
  <el-container>
    <!-- 头部 -->
    <el-aside class="leftsidebar">
      <el-menu type="flex">
        <!-- 首页 -->
        <el-menu-item index="1">
          <!--         <router-link to="/">{{ translations.home }}</router-link>-->
          <a href="/" class="redirection" style="font-weight: bold">{{ translations.home }}</a>
        </el-menu-item>

        <!-- 消息 -->
        <el-menu-item index="2">
          <!--         <router-link to="/letter">{{ translations.news }}</router-link>-->
          <a href="/letter" class="redirection" style="font-weight: bold">{{ translations.news }}</a>
          <el-badge :value="12" class="item"/>
        </el-menu-item>

        <!-- 注册 -->
        <el-menu-item index="3">
          <!--         <router-link to="/register">{{ translations.register }}</router-link>-->
          <a href="/register" class="redirection" style="font-weight: bold">{{ translations.register }}</a>
        </el-menu-item>

        <!-- 登录 -->
        <el-menu-item index="4">
          <!--         <router-link to="/login">{{ translations.login }}</router-link>-->
          <a href="/login" class="redirection" style="font-weight: bold">{{ translations.login }}</a>
        </el-menu-item>

        <!-- 个人主页 -->
        <el-menu-item index="5">
          <!--         <router-link to="/profile">{{ translations.profile }}</router-link>-->
          <a href="/profile" class="redirection" style="font-weight: bold">{{ translations.profile }}</a>
        </el-menu-item>

        <!-- 账号设置 -->
        <el-menu-item index="6">
          <!--         <router-link to="/settings">{{ translations.settings }}</router-link>-->
          <a href="/settings" class="redirection" style="font-weight: bold">{{ translations.settings }}</a>
        </el-menu-item>

        <!-- 视频聊天 -->
        <el-menu-item index="7">
          <!--         <router-link to="/settings">视频聊天</router-link>-->
          <a href="/" class="redirection" style="font-weight: bold">{{translations.videochat}}</a>
        </el-menu-item>

      </el-menu>

    </el-aside>

    <!-- 内容 -->
    <el-main>
      <el-tabs v-model="orderMode" @tab-click="handleTabClick" class="tabs">
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

      <!-- 私信列表 -->
      <div v-for="conversation in paginatedItems" :key="conversation.conversationId" class="conversation-card">
        <el-avatar :src="conversation.target.headerUrl" class="conversation-avatar"></el-avatar>
        <div class="conversation-content">
          <el-link :href="`/letter/detail/${conversation.conversationId}`" class="conversation-title">{{ conversation.content }}</el-link>
          <div class="conversation-meta">
            <span class="conversation-username">{{ conversation.target.username }}</span> {{ translations.publishtime }} {{ conversation.createTime }}
            <div class="conversation-stats">
              <el-tag v-if="conversation.unreadCount != 0" type="danger">{{translations.unreadCount}}{{ conversation.unreadCount }}</el-tag>
              <el-tag>{{ translations.letterCount }} {{ conversation.letterCount }}</el-tag>
            </div>
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
      </div>
      <el-row>
        <el-col :span="16">
          <h6>
            <b class="square"></b>
            {{translations.from}} <i class="text-success">{{ target.username }}</i> {{translations.privateMessage}}
          </h6>
        </el-col>
        <el-col :span="8" class="text-right">
          <el-button type="secondary" size="small" @click="back">{{translations.back}}</el-button>
          <el-button type="primary" size="small" @click="showSendModal">{{ translations.sendMessageTo }}</el-button>
        </el-col>
      </el-row>
      <div v-if="paginatedLetterItems.length">
        <div v-for="letter in paginatedLetterItems" :key="letter.letter.id" class="message">
          <p><strong>{{ letter.fromUser.username }}:</strong> {{ letter.letter.content }}</p>
        </div>
      </div>
      <el-aside class="topsidebar">
        <div class="tweet-box">
          <el-input
              type="textarea"
              v-model="tweetContent"
              placeholder="What is happening?!"
              rows="3"
              maxlength="280"
              show-word-limit
          ></el-input>
          <div class="tweet-actions">
            <el-button type="primary" :disabled="!tweetContent" @click="postTweet">
              Post
            </el-button>
          </div>
        </div>

      </el-aside>
      <!-- 弹出框 -->
<!--      <el-dialog :visible.sync="sendModalVisible" title="translations.send.value">-->
<!--        <el-form>-->
<!--          <el-form-item label="translations.sendTo.value">-->
<!--            <el-input v-model="target.username" readonly></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="translations.content.value">-->
<!--            <el-input type="textarea" v-model="messageContent" rows="10"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--        <template #footer>-->
<!--          <el-button @click="sendModalVisible = false">{{translations.cancel}}</el-button>-->
<!--          <el-button type="primary" @click="sendMessage">{{translations.send}}</el-button>-->
<!--        </template>-->
<!--      </el-dialog>-->

<!--      &lt;!&ndash; 提示框 &ndash;&gt;-->
<!--      <el-dialog :visible.sync="hintModalVisible" title="提示">-->
<!--        <span>发送完毕!</span>-->
<!--      </el-dialog>-->
    </el-aside>
  </el-container>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import {ElMessage} from 'element-plus';
import axios from 'axios';
import {useCommonTranslations} from '@/lang/i18nhelper';
import {useI18n} from 'vue-i18n';
import postbox from "@/views/PostBox/LetterdetailBox.vue";
import { ElInput, ElButton, ElIcon } from 'element-plus';
import fetchLetterDetail from '@/api/letterDetail';
// 这里导入Element Plus中已有的图标
import { Picture, VideoCamera, Calendar, Location } from '@element-plus/icons-vue';
import {
  searchQuery,
  orderMode,
  handleTabClick,
  search,page,paginatedItems,handlePageChange,
} from '@/js/letter.ts';
const tweetContent = ref('');

const postTweet = () => {
  if (tweetContent.value) {
    console.log('Tweet content:', tweetContent.value);
    tweetContent.value = '';  // 清空输入框内容
  }
};
const translations = useCommonTranslations();
const {t, locale} = useI18n({useScope: "global"});
const selectedLanguage = ref('zh')
const changeLanguage = () => {
  locale.value = selectedLanguage.value
}

const sendModalVisible = ref(false);
const hintModalVisible = ref(false);
const messageContent = ref('');


const route = useRoute();
const id = route.params.id;
const target = ref({username: ''});


const mockUsers = [
  {id: '1', username: '落基山脉下的闲人'},
  {id: '2', username: '风吹麦浪'},
  {id: '3', username: '海上明月'}
];


const mockLetters = [
  {
    letter: { id: '1', content: 'Hello, how are you?' },
    fromUser: { id: '1', username: 'User1' }
  },
  {
    letter: { id: '2', content: 'I am fine, thank you!' },
    fromUser: { id: '2', username: 'User2' }
  },
  // Add more mock letters as needed
];
const pageletter = ref({ current: 1, pageSize: 10, total: mockLetters.length });
const paginatedLetterItems = ref([]);

const handlePageChangeletter = (newPage) => {
  page.value.current = newPage;
  paginateLetters();
};
const paginateLetters = () => {
  const start = (page.value.current - 1) * page.value.pageSize;
  const end = start + page.value.pageSize;
  paginatedLetterItems.value = mockLetters.slice(start, end);
};
onMounted(() => {
      // 根据 id 从模拟数据中选择用户
      const user = mockUsers.find(user => user.id === id);
      if (user) {
        target.value = user;
      } else {
        // 处理未找到的情况
        target.value.username = '未知用户';
      }
    }
    // async () => {
    //   try {
    //     const data = await fetchLetterDetail(id);
    //     letters.value = data.letters;
    //     target.value = data.targetUser;
    //   } catch (error) {
    //     ElMessage.error('Failed to fetch messages');
    //   }
    // }
);
onMounted(    () => {
  paginateLetters();
})

const back = () => {
  console.log('Going back');
};

const showSendModal = () => {
  sendModalVisible.value = true;
};

const sendMessage = () => {
  console.log('Sending message:', messageContent.value);
  sendModalVisible.value = false;
  hintModalVisible.value = true;
  ElMessage.success('Message sent successfully!');
};



</script>

<style scoped>
/* Add any scoped styles here */
@import "@/css/views/letterdetail.css";
</style>