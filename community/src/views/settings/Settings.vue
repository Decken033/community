<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useCommonTranslations} from '@/lang/i18nhelper';
import {useI18n} from 'vue-i18n';
import {ElButton, ElContainer, ElMain, ElMessage} from 'element-plus'
import axios from 'axios';
import api from '@/api/api';
import defaultAvatar from '@/images/logo.jpg';
import leftsidebar from "@/components/Leftsidebar.vue";
import Leftsidebar from "@/components/Leftsidebar.vue";
import router from "@/router/index";

const translations = useCommonTranslations();
const {t, locale} = useI18n({useScope: "global"});
const selectedLanguage = ref('zh')
const changeLanguage = () => {
  locale.value = selectedLanguage.value
}


//搜索
const searchQuery = ref('');
const search = () => {
  console.log(`Searching for: ${searchQuery.value}`);
};


//修改密码
const password = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});


const changePassword = async () => {
  // 检查新密码和确认密码是否一致
  if (password.value.newPassword !== password.value.confirmPassword) {
    ElMessage.error('两次输入的密码不一致!');
    return;
  }

  try {
    // 发送请求到后端API
    const response = await axios.post(api.user.changepassword, {
      old_password: password.value.oldPassword,
      new_password: password.value.newPassword,
    });

    // 根据后端的响应处理
    if (response.data.msg) {
      ElMessage.success(response.data.msg);
      router.push('/'); // 导航到主页
    } else {
      // 如果返回失败信息，处理并显示错误消息
      if (response.data.oldMsg) {
        ElMessage.error(response.data.oldMsg);
      }
      if (response.data.newMsg) {
        ElMessage.error(response.data.newMsg);
      }
      router.push('/settings'); // 导航到settings页面
    }
  } catch (error) {
    // 处理请求失败的情况
    ElMessage.error('服务器错误，请稍后再试');
  }
};


//上传图片
const avatarUrl = ref('');
const selectedFile = ref(null);
const imageSelected = ref(false); // 是否已选择图片的标志


// 获取初始头像数据
onMounted(async () => {
  avatarUrl.value = localStorage.getItem("headerImg");
  try {
    if(localStorage.getItem("headerImg") != null){
      avatarUrl.value = localStorage.getItem("headerImg");
    } else {
      avatarUrl.value = defaultAvatar;
    }
  } catch (error) {
    avatarUrl.value = defaultAvatar;
  }
});


// 处理选择的文件
const handleFileChange = (file: any) => {
  const isImage = file.raw.type.startsWith('image/');
  if (isImage) {
    const reader = new FileReader();
    reader.readAsDataURL(file.raw);

    reader.onload = () => {
      avatarUrl.value = reader.result.toString();  // Base64 string
      selectedFile.value = file.raw;
      imageSelected.value = true;
    };

    reader.onerror = () => {
      ElMessage.error('文件读取失败');
    };
  } else {
    ElMessage.error('请选择有效的图片文件');
  }
};


// 上传前的校验
const beforeAvatarUpload = (file: any) => {
  console.log('beforeAvatarUpload:', file);
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    ElMessage.error('上传的文件必须是图片!');
    return false;
  }
  return true;
};


const myUserId = localStorage.getItem('userId');

// 立即上传图片
async function UploadImageNow() {
  console.log('Uploading image now...');
  if (!selectedFile.value) {
    ElMessage.error('请先选择一张图片!');
    return;
  }

  try {
    // 将图片编码为Base64字符串
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile.value);

    reader.onload = async () => {
      const base64Data = reader.result;


      // 获取图片类型
      const imageType = selectedFile.value.type;

      // 构建请求体
      const payload = {
        headerImage: base64Data,
        imageType: imageType,
        userId: myUserId, // 用户 ID
      };

      const response = await fetch("http://localhost:8080/community/upload", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),  // 发送 JSON 格式的 Base64 数据
      });

      if (response.ok) {
        const data = await response.json();
        avatarUrl.value = data.avatarUrl; // 更新头像 URL
        ElMessage.success('头像上传成功!');
      } else {
        ElMessage.error('上传失败，请重试!');
      }
    };

    reader.onerror = () => {
      ElMessage.error('文件读取失败');
    };
  } catch (error) {
    ElMessage.error('上传过程中出现错误: ' + error.message);
  }
}


//修改昵称
const nickname = ref('');
const changeNickname = async () => {
  try {

    const response = await axios.post(api.user.changenickname, {
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
      <Leftsidebar></Leftsidebar>
    </el-aside>

    <!-- 内容 -->
    <el-main>
      <el-container class="main-container">


        <el-form class="form-changenickname" @submit.prevent="changeNickname">
          <el-form-item :label="translations.nickname.value" label-width="100px">
            <el-input v-model="nickname" :placeholder="translations.enterNickname.value" required></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="el-sub-menu" native-type="submit"> {{ translations.uploadnow }}</el-button>
          </el-form-item>
        </el-form>

        <!-- 修改密码 -->
        <el-form class="main-form3" @submit.prevent="changePassword">
          <el-form-item :label="translations.originalPassword.value" label-width="100px">
            <el-input
                v-model="password.oldPassword"
                type="password"
                :placeholder="translations.enterPassword.value"
                required
            ></el-input>
          </el-form-item>
          <el-form-item :label="translations.newPassword.value" label-width="100px">
            <el-input
                v-model="password.newPassword"
                type="password"
                :placeholder="translations.enterNewPassword.value"
                required
            ></el-input>
          </el-form-item>
          <el-form-item :label="translations.enterConfirmPassword.value" label-width="100px">
            <el-input
                v-model="password.confirmPassword"
                type="password"
                :placeholder="translations.enterConfirmPassword.value"
                required
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="info" class="el-sub-menu" native-type="submit">
              {{ translations.uploadnow }}
            </el-button>
          </el-form-item>
        </el-form>

        <!--        <el-form class="main-form3" @submit.prevent="changePassword">-->
        <!--          <el-form-item :label=translations.originalPassword.value label-width="100px">-->
        <!--            <el-input v-model="password.oldPassword" type="password" :placeholder=translations.enterPassword.value required></el-input>-->
        <!--          </el-form-item>-->
        <!--          <el-form-item :label=translations.newPassword.value label-width="100px">-->
        <!--            <el-input v-model="password.newPassword" type="password" :placeholder=translations.enterNewPassword.value required></el-input>-->
        <!--          </el-form-item>-->
        <!--          <el-form-item :label=translations.enterConfirmPassword.value label-width="100px">-->
        <!--            <el-input v-model="password.confirmPassword" type="password" :placeholder=translations.enterConfirmPassword.value-->
        <!--                      required></el-input>-->
        <!--          </el-form-item>-->
        <!--          <el-form-item>-->
        <!--            <el-button type="info" class="el-sub-menu" native-type="submit">{{translations.uploadnow}}</el-button>-->
        <!--          </el-form-item>-->
        <!--        </el-form>-->

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

        <div>
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
              {{ translations.seletcAvatar }}
            </el-button>
          </el-upload>
          <el-form-item>
            <el-button
                type="primary"
                class="uploadnow"
                native-type="submit"
                :disabled="!imageSelected"
                @click="UploadImageNow"
            >
              {{ translations.uploadnow }}
            </el-button>
          </el-form-item>

        </div>


      </div>


    </el-aside>
  </el-container>
</template>

<style scoped>
@import "@/css/views/Settings.css";
</style>
