<template>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <el-menu class="el-menu-demo" mode="horizontal">
          <!-- 首页 -->
          <el-menu-item index="1">
            <router-link to="/">{{ translations.home }}</router-link>
          </el-menu-item>
  
          <!-- 消息 -->
          <el-menu-item index="2">
            <router-link to="/letter">{{ translations.news }}</router-link>
            <el-badge :value="12" class="item" />
          </el-menu-item>
  
          <!-- 个人主页 -->
          <el-menu-item index="5">
            <router-link to="/profile">{{ translations.profile }}</router-link>
          </el-menu-item>
  
          <!-- 视频聊天 -->
          <el-menu-item index="7">
            <router-link to="/settings">视频聊天</router-link>
          </el-menu-item>
  
          <!-- 发布按钮 -->
          <el-menu-item index="9">
            <el-button type="primary" class="float-right" @click="openPublishModal">
              {{ translations.publish }}
            </el-button>
          </el-menu-item>
  
          <!-- 语言选择 -->
          <el-menu-item index="10">
            <el-select v-model="selectedLanguage" @change="changeLanguage" placeholder="Select Language">
              <el-option label="English" value="en"></el-option>
              <el-option label="中文" value="zh"></el-option>
              <el-option label="Español" value="sp"></el-option>
            </el-select>
          </el-menu-item>
        </el-menu>
      </el-header>
  
      <!-- 内容 -->
      <el-main>
        <el-container class="p-5 mt-3 mb-3">
          <!-- 上传头像 -->
          <el-card>
            <h6 class="text-left text-info border-bottom pb-2">上传头像</h6>
            <!-- 上传到本地 -->
            <el-form :model="formData" ref="uploadForm" @submit.prevent="submitLocalForm">
              <el-form-item label="选择头像" prop="headerImage">
                <el-upload
                  class="upload-demo"
                  action=""
                  :http-request="handleLocalUpload"
                  :on-success="handleUploadSuccess"
                  :on-error="handleUploadError"
                  accept="image/*"
                  :file-list="fileList"
                >
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" native-type="submit">立即上传</el-button>
              </el-form-item>
            </el-form>
  
            <!-- 修改密码 -->
            <h6 class="text-left text-info border-bottom pb-2 mt-5">修改密码</h6>
            <el-form :model="passwordData" ref="passwordForm" @submit.prevent="submitPasswordForm">
              <el-form-item label="原密码" prop="oldPassword">
                <el-input
                  type="password"
                  v-model="passwordData.oldPassword"
                  placeholder="请输入原始密码!"
                ></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword">
                <el-input
                  type="password"
                  v-model="passwordData.newPassword"
                  placeholder="请输入新的密码!"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmPassword">
                <el-input
                  type="password"
                  v-model="passwordData.confirmPassword"
                  placeholder="再次输入新密码!"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" native-type="submit">立即保存</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-container>
      </el-main>
    </el-container>
  </template>

<script>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useCommonTranslations } from '@/lang/i18nhelper';
import { useI18n } from 'vue-i18n';


export default {
    setup() {
        const activeIndex = ref('1');

        const formData = reactive({
            headerImage: '',
        });

        const fileList = ref([]);

        const handleSelect = (key) => {
            console.log(`Selected: ${key}`);
        };

        const handleLocalUpload = (file) => {
            // Handle file upload logic
            console.log(file);
        };

        const handleUploadSuccess = (response, file) => {
            ElMessage.success('上传成功');
            console.log(response, file);
        };

        const handleUploadError = (err) => {
            ElMessage.error('上传失败');
            console.log(err);
        };

        const submitLocalForm = () => {
            console.log('Submitting local form');
        };

        const passwordData = reactive({
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        });

        const submitPasswordForm = () => {
            console.log('Submitting password form');
            if (passwordData.newPassword !== passwordData.confirmPassword) {
                ElMessage.error('两次输入的密码不一致!');
                return;
            }
            // Add form submission logic here
        };

        const translations = useCommonTranslations();

		const { t, locale } = useI18n({ useScope: "global" });
		const selectedLanguage = ref('zh');
		const changeLanguage = () => {
			locale.value = selectedLanguage.value;
		};

		const searchQuery = ref('');
		const search = () => {
			console.log('Search query:', searchQuery.value);
		};

        return {
            activeIndex,
            formData,
            fileList,
            passwordData,
            handleSelect,
            handleLocalUpload,
            handleUploadSuccess,
            handleUploadError,
            submitLocalForm,
            submitPasswordForm,
            translations,
            t,
            locale,
            selectedLanguage,
            changeLanguage,
            searchQuery,
            search,

        };
    },
};
</script>

<style >
.el-header {
  background-color: #f0f0f0;
}

.el-container {
  background-color: rgb(237, 247, 236);
}

.el-main {
  background-color: rgb(244, 247, 236);
  padding-top: 0px;
}


.el-menu-demo {
  /* display: flex; */
  justify-content: space-between;
  align-items: center;
  /* width: 100%; */
}

.el-tabs {
  width: 300px;
  max-width: 100%;
  margin-top: auto;
  margin-bottom: auto;
  padding-top: 0;
  padding: 0px;
  height: auto;
}
</style>