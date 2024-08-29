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
      <el-row>
        <el-col :span="16">
          <h6>
            <b class="square"></b>
            来自 <i class="text-success">{{ target.username }}</i> 的私信
          </h6>
        </el-col>
        <el-col :span="8" class="text-right">
          <el-button type="secondary" size="small" @click="back">返回</el-button>
          <el-button type="primary" size="small" @click="showSendModal">给TA私信</el-button>
        </el-col>
      </el-row>
      <el-aside class="topsidebar">
        <postbox></postbox>

      </el-aside>
      <!-- 弹出框 -->
      <el-dialog :visible.sync="sendModalVisible" title="发私信">
        <el-form>
          <el-form-item label="发给：">
            <el-input v-model="target.username" readonly></el-input>
          </el-form-item>
          <el-form-item label="内容：">
            <el-input type="textarea" v-model="messageContent" rows="10"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="sendModalVisible = false">取消</el-button>
          <el-button type="primary" @click="sendMessage">发送</el-button>
        </template>
      </el-dialog>

      <!-- 提示框 -->
      <el-dialog :visible.sync="hintModalVisible" title="提示">
        <span>发送完毕!</span>
      </el-dialog>
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

<script setup>
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import {ElMessage} from 'element-plus';
import axios from 'axios';
import {useCommonTranslations} from '@/lang/i18nhelper';
import {useI18n} from 'vue-i18n';
import postbox from "@/views/PostBox/LetterdetailBox.vue";

const translations = useCommonTranslations();
const {t, locale} = useI18n({useScope: "global"});
const selectedLanguage = ref('zh')
const changeLanguage = () => {
  locale.value = selectedLanguage.value
}

const searchQuery = ref('');
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

onMounted(() => {
  // 根据 id 从模拟数据中选择用户
  const user = mockUsers.find(user => user.id === id);
  if (user) {
    target.value = user;
  } else {
    // 处理未找到的情况
    target.value.username = '未知用户';
  }
});

const search = () => {
  console.log('Searching for:', searchQuery.value);
};

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
@import "@/css/views/letter.css";
</style>