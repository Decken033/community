<template>
  <div class="menu-container ">
    <el-menu type="flex">
      <!-- 首页 -->
      <el-menu-item index="1">
        <!--         <router-link to="/">{{ translations.home }}</router-link>-->
        <a @click="navigateToHome" class="redirection" style="font-weight: bold">{{ translations.home }}</a>
      </el-menu-item>

      <!-- 视频聊天 -->
      <el-menu-item index="3">
        <a @click="navigateToVideoChat" class="redirection" style="font-weight: bold">{{ translations.videochat }}</a>
      </el-menu-item>

      <!-- 随机匹配 -->
      <el-menu-item index="4">
        <a @click="navigateToRandomMatch" class="redirection" style="font-weight: bold">{{ translations.match }}</a>
      </el-menu-item>

      <!-- 消息 -->
      <el-menu-item index="4">
        <!--         <router-link to="/letter">{{ translations.news }}</router-link>-->
        <a @click="navigateToLetter" class="redirection" style="font-weight: bold">{{ translations.news }}</a>
        <el-badge v-if="letterUnreadCount != 0" :value="letterUnreadCount" class="badge badge-danger"></el-badge>
<!--        <el-badge :value="0"  class="item"/>-->
      </el-menu-item>


      <!-- 个人主页 -->
      <el-menu-item index="7">
        <!--         <router-link to="/profile">{{ translations.profile }}</router-link>-->
        <a @click="navigateToProfile" class="redirection" style="font-weight: bold">{{ translations.profile }}</a>
      </el-menu-item>

      <!-- 账号设置 -->
      <el-menu-item index="8">
        <!--         <router-link to="/settings">{{ translations.settings }}</router-link>-->
        <a @click="navigateToSettings" class="redirection" style="font-weight: bold">{{ translations.settings }}</a>
      </el-menu-item>

      <el-sub-menu>
        <template #title>
          <a style="font-weight: bold;">{{ translations.user }}</a>
        </template>
        <!-- 注册 -->
        <el-menu-item index="1">
          <!--         <router-link to="/register">{{ translations.register }}</router-link>-->
          <a @click="navigateToRegister" class="redirection" style="font-weight: bold">{{ translations.register }}</a>
        </el-menu-item>

        <!-- 登录 -->
        <el-menu-item index="2">
          <!--         <router-link to="/login">{{ translations.login }}</router-link>-->
          <a @click="navigateToLogin" v-if=!hasLogin class="redirection"
             style="font-weight: bold">{{ translations.login }}</a>
          <a @click="navigateToLogout" v-if=hasLogin class="redirection"
             style="font-weight: bold">{{ translations.logout }}</a>
        </el-menu-item>
      </el-sub-menu>


    </el-menu>
  </div>
</template>

<script setup lang="ts">
import router from "@/router/index";
import {useCommonTranslations} from '@/lang/i18nhelper';
import {onMounted, ref} from "vue";

const translations = useCommonTranslations();
const navigateToHome = () => {
  router.push('/');
};
const navigateToLetter = () => {
  router.push('/letter');
};
const navigateToRegister = () => {
  router.push('/register');
};
const navigateToLogin = () => {
  router.push('/login');
};
const navigateToLogout = () => {
  handleLogout();
  localStorage.clear();
  window.location.reload();
}
const navigateToProfile = () => {
  router.push('/profile');
};
const navigateToSettings = () => {
  router.push('/settings');
};
const navigateToVideoChat = () => {
  router.push('/chatroom');
};
const navigateToRandomMatch = () => {
  router.push('/match');
};

const hasLogin = ref(false);
const judgeLogin = () => {
  if (localStorage.getItem('ticket') != null) {
    hasLogin.value = true;
    console.log( localStorage.getItem('ticket'));
  } else {
    hasLogin.value = false;

  }

}
import api from '@/api/api'
import axios from 'axios'

const handleLogout = async () => {
  try {
    const response = await axios.get(api.user.logout, {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}
onMounted(() => {
  judgeLogin();
});
</script>


<style scoped>
.menu-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-left: auto;
}


</style>