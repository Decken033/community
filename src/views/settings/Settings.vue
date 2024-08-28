<script setup lang="ts">
import {
  searchQuery,
  orderMode,
  page,
  paginatedItems,
  handlePageChange,
  handleTabClick,
  search,
} from '@/js/global.ts';

import {ref} from 'vue';
import {useCommonTranslations} from '@/lang/i18nhelper';
import {useI18n} from 'vue-i18n';
import postbox from "@/views/PostBox/Postbox.vue"
import { ElIcon, ElButton, ElMenu, ElMenuItem, ElContainer, ElHeader, ElMain } from 'element-plus'
import { User, Key, Download, Close } from '@element-plus/icons-vue'

const translations = useCommonTranslations();
const {t, locale} = useI18n({useScope: "global"});
const selectedLanguage = ref('zh')
const changeLanguage = () => {
  locale.value = selectedLanguage.value
}

//main
const activeIndex = ref('1');
const searchQuery = ref('');
const password = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const goToPage = (path) => {
  window.location.href = path;
};

const search = () => {
  console.log(`Searching for: ${searchQuery.value}`);
  // Add search logic here
};

const uploadLocal = () => {
  ElMessage.success('头像已上传至本地');
};

const uploadQiniu = () => {
  ElMessage.success('头像已上传至七牛云');
};

const changePassword = () => {
  if (password.value.newPassword !== password.value.confirmPassword) {
    ElMessage.error('两次输入的密码不一致!');
    return;
  }
  ElMessage.success('密码已修改');
};

const handlePreview = (file) => {
  console.log(file);
};

const handleRemove = (file) => {
  console.log(file);
};

const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg';
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    ElMessage.error('上传头像图片只能是 JPG 格式!');
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!');
  }
  return isJPG && isLt2M;
};

const uploadData = {
  token: 'your-upload-token',
  key: 'your-file-key'
};

// account-menu
const showAccountInfo = () => {
  console.log('Account info clicked')
}

const downloadData = () => {
  console.log('Download data clicked')
}

const deactivateAccount = () => {
  console.log('Deactivate account clicked')
}


</script>

<template>
  <el-container>
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
          <a href="/" class="redirection" style="font-weight: bold">视频聊天</a>
        </el-menu-item>

      </el-menu>

    </el-aside>

    <!-- 内容 -->
    <el-main>


      <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#fff"
          text-color="#545c64"
          active-text-color="#ffd04b">
        <el-menu-item index="1">Your account</el-menu-item>
        <el-menu-item index="2">Monetization</el-menu-item>
        <el-menu-item index="3">Premium</el-menu-item>
        <el-menu-item index="4">Security and account access</el-menu-item>
        <el-menu-item index="5">Privacy and safety</el-menu-item>
        <el-menu-item index="6">Notifications</el-menu-item>
        <el-menu-item index="7">Accessibility, display, and languages</el-menu-item>
        <el-menu-item index="8">Additional resources</el-menu-item>
        <el-menu-item index="9">Help Center</el-menu-item>
      </el-menu>

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


<!--        <el-menu class="account-menu">-->
<!--          <el-menu-item>-->
<!--            <el-icon><el-icon-user /></el-icon>-->
<!--            <span>Account information</span>-->
<!--            <el-button type="text" @click="showAccountInfo">See your account information like your phone number and email address.</el-button>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item>-->
<!--            <el-icon><el-icon-key /></el-icon>-->
<!--            <span>Change your password</span>-->
<!--            <el-button type="text" @click="changePassword">Change your password at any time.</el-button>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item>-->
<!--            <el-icon><el-icon-download /></el-icon>-->
<!--            <span>Download an archive of your data</span>-->
<!--            <el-button type="text" @click="downloadData">Get insights into the type of information stored for your account.</el-button>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item>-->
<!--            <el-icon><el-icon-close /></el-icon>-->
<!--            <span>Deactivate your account</span>-->
<!--            <el-button type="text" @click="deactivateAccount">Find out how you can deactivate your account.</el-button>-->
<!--          </el-menu-item>-->
<!--        </el-menu>-->



              <el-container class="main-container">
                <!-- 上传头像 -->
        <!--        <h6 class="text-left text-info border-bottom pb-2">上传头像</h6>-->

                <!-- 上传到本地 -->
                <el-form class="main-form1" @submit.prevent="uploadLocal">
                  <el-form-item label="选择头像" label-width="100px">
                    <el-upload
                        class="upload-demo"
                        action="/user/upload"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-upload="beforeAvatarUpload"
                    >
                      <el-button size="small" type="primary">选择一张图片</el-button>
                    </el-upload>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="info" native-type="submit">立即上传</el-button>
                  </el-form-item>
                </el-form>


                <!-- 修改密码 -->

                <el-form class="main-form3" @submit.prevent="changePassword">
                  <el-form-item label="原密码" label-width="100px">
                    <el-input v-model="password.oldPassword" type="password" placeholder="请输入原始密码!" required></el-input>
                  </el-form-item>
                  <el-form-item label="新密码" label-width="100px">
                    <el-input v-model="password.newPassword" type="password" placeholder="请输入新的密码!" required></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" label-width="100px">
                    <el-input v-model="password.confirmPassword" type="password" placeholder="再次输入新密码!" required></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="info" class="el-sub-menu" native-type="submit">立即保存</el-button>
                  </el-form-item>
                </el-form>
              </el-container>

      </div>


    </el-aside>
  </el-container>
</template>

<style scoped>
@import "@/css/views/Settings.css";
</style>
