<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <!-- 导航 -->
      <el-menu class="el-menu-demo">
        <!-- 首页 -->
        <el-menu-item index="1">
          <router-link to="/">{{ translations.home }}</router-link>
        </el-menu-item>

        <!-- 消息 -->
        <el-menu-item index="2">
          <router-link to="/letter">{{ translations.news }}</router-link>
          <el-badge :value="12" class="item" />
        </el-menu-item>

        <!-- 注册 -->
        <el-menu-item index="3">
          <router-link to="/register">{{ translations.register }}</router-link>
        </el-menu-item>

        <!-- 登录 -->
        <el-menu-item index="4">
          <router-link to="/login">{{ translations.login }}</router-link>
        </el-menu-item>

        <!-- 个人主页 -->
        <el-menu-item index="5">
          <router-link to="/profile">{{ translations.profile }}</router-link>
        </el-menu-item>

        <!-- 账号设置 -->
        <el-menu-item index="6">
          <router-link to="/settings">{{ translations.settings }}</router-link>
        </el-menu-item>

        <!-- 搜索 -->
        <el-menu-item index="7">
          <el-input v-model="searchQuery" @keyup.enter="search" />
          <el-button @click="search" type="primary">{{ translations.search }}</el-button>
        </el-menu-item>

        <el-menu-item index="8">
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
      <div class="container pl-5 pr-5 pt-3 pb-3 mt-3 mb-3">
        <h3 class="text-center text-info border-bottom pb-3">登录</h3>
        <el-form :model="form" :rules="rules" ref="loginForm" label-width="100px" class="mt-5">
          <el-form-item label="账号" prop="username">
            <el-input v-model="form.username" placeholder="请输入您的账号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入您的密码"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-row :gutter="20">
              <el-col :span="14">
                <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
              </el-col>
              <el-col :span="10">
                <img :src="kaptchaSrc" id="kaptcha" style="width: 250px; height: 40px;" />
                <a href="javascript:void(0);" @click="refreshKaptcha">刷新验证码</a>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="form.rememberMe">记住我</el-checkbox>
            <a href="forget.html" class="text-danger float-right">忘记密码?</a>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">立即登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

import { useCommonTranslations } from '@/lang/i18nhelper';

import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';





export default {
  setup() {
    const form = ref({
      username: '',
      password: '',
      code: '',
      rememberMe: false,
    });

    const kaptchaSrc = ref('/kaptcha');
    const translations = useCommonTranslations();

    const { t, locale } = useI18n({ useScope: "global" });
    const selectedLanguage = ref('zh');
    const changeLanguage = () => {
      locale.value = selectedLanguage.value;
    };

    const rules = {
      username: [
        { required: true, message: t('message.enterUsername'), trigger: 'blur' },
      ],
      password: [
        { required: true, message: t('message.enterPassword'), trigger: 'blur' },
        { min: 8, message: t('message.passwordLength'), trigger: 'blur' },
      ],
      code: [
        { required: true, message: t('message.enterCode'), trigger: 'blur' },
      ],
    };


    const loginForm = ref(null);

    const refreshKaptcha = () => {
      kaptchaSrc.value = `/kaptcha?${new Date().getTime()}`;
    };

    const handleSubmit = () => {
      loginForm.value.validate((valid) => {
        if (valid) {
          postData();
        } else {
          console.log('表单验证失败');
          return false;
        }
      });
    };

    const postData = () => {
      axios
        .post('/login', form.value)
        .then((response) => {
          console.log("登录成功");
          ElMessage.success(t('message.loginSuccess'));
        })
        .catch((error) => {
          console.error('登录失败:', error);
          ElMessage.error(t('message.loginFailed'));
        });
    };

    return {
      form,
      rules,
      kaptchaSrc,
      loginForm,
      refreshKaptcha,
      handleSubmit,
      translations,
      selectedLanguage,
      changeLanguage,
    };
  },
};

</script>



<style scoped>
.el-menu-demo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

}

.el-container {
  width: 100%;
  max-width: none;
  margin-top: 10px;
  background-color: rgb(230, 124, 18);
  display: flex;
  overflow: hidden;
  /* margin:1%; */

}

.el-main {
  width: 100%;
  max-width: none;
  background-color: rgb(244, 247, 236);
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;
}
</style>
