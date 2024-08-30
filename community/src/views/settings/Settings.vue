<script setup lang="ts" >
import {
  searchQuery,
  orderMode,
  page,
  paginatedItems,
  handlePageChange,
  handleTabClick,
  search,
} from '@/js/global.ts';

import {ref, onMounted} from 'vue';
import {useCommonTranslations} from '@/lang/i18nhelper';
import {useI18n} from 'vue-i18n';
import postbox from "@/views/PostBox/Postbox.vue"
import {ElIcon, ElButton, ElMenu, ElMenuItem, ElContainer, ElHeader, ElMain} from 'element-plus'
import {User, Key, Download, Close} from '@element-plus/icons-vue'
import axios from 'axios';
import api from '@/api/api.ts';
import defaultAvatar from '@/images/logo.jpg';


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




//上传图片

const avatarUrl = ref('');
const selectedFile = ref(null);
const imageSelected = ref(false); // 是否已选择图片的标志


// 获取初始头像数据
onMounted(async () => {
  try {
    const response = await fetch(api.user.header); // API 返回头像 URL
    if (response.ok) {
      const data = await response.json();
      avatarUrl.value = data.avatarUrl || defaultAvatar;// 默认头像路径
    } else {
      avatarUrl.value = defaultAvatar;
    }
  } catch (error) {
    avatarUrl.value = defaultAvatar;
  }
});



// 处理选择的文件
const handleFileChange = (file) => {
  const isImage = file.raw.type.startsWith('image/');
  if (isImage) {
    avatarUrl.value = URL.createObjectURL(file.raw);
    selectedFile.value = file.raw;
    imageSelected.value = true;
  } else {
    ElMessage.error('请选择有效的图片文件');
  }
};

// 上传前的校验
const beforeAvatarUpload = (file) => {
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    ElMessage.error('上传的文件必须是图片!');
    return false;
  }
  return true;
};

//立即上传图片
async function uploadImagenow() {
  if (!selectedFile.value) {
    message.error('请先选择一张图片!');
    return;
  }

  const formData = new FormData();
  formData.append('headerImage', selectedFile.value);

  try {
    const response = await fetch(api.user.avatar, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      avatarUrl.value = data.avatarUrl; // 更新头像 URL
      message.success('头像上传成功!');
    } else {
      message.error('上传失败，请重试!');
    }
  } catch (error) {
    message.error('上传过程中出现错误!');
  }
}



//修改昵称
const nickname = ref('');
const changeNickname = async () => {
  try {
    // Assuming you have an API endpoint to update the nickname
    const response = await axios.post('/api/change-nickname', {
      nickname: nickname.value,
    });

    if (response.status === 200) {
      ElMessage.success('昵称已修改');
    } else {
      ElMessage.error('修改昵称失败');
    }
  } catch (error) {
    ElMessage.error('修改昵称时出错');
    console.error('Error changing nickname:', error);
  }
};

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
      <el-container class="main-container">


        <el-form class="form-changenickname" @submit.prevent="changeNickname">
          <el-form-item :label="translations.nickname.value" label-width="100px">
            <el-input v-model="nickname" :placeholder="translations.enterNickname.value" required></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="el-sub-menu" native-type="submit"> {{translations.uploadnow}}  </el-button>
          </el-form-item>
        </el-form>

        <!-- 修改密码 -->

        <el-form class="main-form3" @submit.prevent="changePassword">
          <el-form-item :label=translations.originalPassword.value label-width="100px">
            <el-input v-model="password.oldPassword" type="password" :placeholder=translations.enterPassword.value required></el-input>
          </el-form-item>
          <el-form-item :label=translations.newPassword.value label-width="100px">
            <el-input v-model="password.newPassword" type="password" :placeholder=translations.enterNewPassword.value required></el-input>
          </el-form-item>
          <el-form-item :label=translations.enterConfirmPassword.value label-width="100px">
            <el-input v-model="password.confirmPassword" type="password" :placeholder=translations.enterConfirmPassword.value
                      required></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="info" class="el-sub-menu" native-type="submit">{{translations.uploadnow}}</el-button>
          </el-form-item>
        </el-form>

      </el-container>

      <!--      <el-menu-->
      <!--          default-active="1"-->
      <!--          class="el-menu-vertical-demo"-->
      <!--          background-color="#fff"-->
      <!--          text-color="#545c64"-->
      <!--          active-text-color="#ffd04b">-->
      <!--        <el-menu-item index="1">Your account</el-menu-item>-->
      <!--        <el-menu-item index="2">Monetization</el-menu-item>-->
      <!--        <el-menu-item index="3">Premium</el-menu-item>-->
      <!--        <el-menu-item index="4">Security and account access</el-menu-item>-->
      <!--        <el-menu-item index="5">Privacy and safety</el-menu-item>-->
      <!--        <el-menu-item index="6">Notifications</el-menu-item>-->
      <!--        <el-menu-item index="7">Accessibility, display, and languages</el-menu-item>-->
      <!--        <el-menu-item index="8">Additional resources</el-menu-item>-->
      <!--        <el-menu-item index="9">Help Center</el-menu-item>-->
      <!--      </el-menu>-->

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


          <el-avatar :src="avatarUrl" size="large" shape="circle" icon="el-icon-user"/>

            <el-upload
                class="upload-demo"
                :show-file-list="false"
                :on-change="handleFileChange"
                :before-upload="beforeAvatarUpload"
            >
              <el-button
                  size="small" class="selectpicture"
                  type="primary"
              >
                {{ translations.seletcAvatar }}</el-button>
            </el-upload>
        <el-form-item>-->
            <el-button
                type="primary"
                class="uploadnow"
                native-type="submit"
                :disabled="!imageSelected"
                @click="uploadimagenow"
            >
              {{ translations.uploadnow }}</el-button>
          </el-form-item>-->
<!--        </el-form>-->
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


      </div>


    </el-aside>
  </el-container>
</template>

<style scoped>
@import "@/css/views/Settings.css";
</style>
