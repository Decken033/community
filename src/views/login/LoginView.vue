<template>
  <div>
  </div>

  <el-container>
    <!-- 头部 -->

    <!-- 侧边栏 -->
    <el-aside >
      <div>
        <!-- <canvas></canvas> -->
        <!-- <h3>ParticleSidebar</h3>
        <h3>ParticleSidebar</h3>
        <h3>ParticleSidebar</h3>
        <h3>ParticleSidebar</h3>
        <ParticleSidebar /> -->
        <component :is="ParticleSidebar" />
      </div>
    </el-aside>

    <!-- 内容 -->
    <el-main>
      <div class="container pl-5 pr-5 pt-3 pb-3 mt-3 mb-3">
<!--        <h3 class="text-center text-info border-bottom pb-3">登录</h3>-->
        <img src="@/images/logo.jpg" class="logo">
        <el-form :model="form" :rules="rules" ref="loginForm" label-width="100px" >
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
                <img :src="kaptchaSrc" id="kaptcha" style="width: 100px; height: 40px;" />
                <a href="javascript:void(0);" @click="refreshKaptcha">刷新验证码</a>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="form.rememberMe">记住我</el-checkbox>
            <a href="forget.html" class="text1">忘记密码?</a>
            <a href="register.html" class="text2">注册账号</a>
          </el-form-item>
          <el-form-item>
<!--            修改样式加上返回按钮-->
            <el-button @click="handleSubmit" class="button">立即登录</el-button>
            <el-button @click="handleBack" class="button">返回首页</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import { useCommonTranslations } from '@/lang/i18nhelper';

import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
// import ParticleSidebar from '@/codepen/ParticleSidebar.vue';
import { defineAsyncComponent } from 'vue';

import { useRouter } from 'vue-router';

export default {

  setup() {

    // 定义异步组件particlesidebar
    const isLoaded = ref(false);
    const ParticleSidebar = defineAsyncComponent(() =>
      import('@/codepen/ParticleSidebar.vue').then((component) => {
        isLoaded.value = true;
        return component;
      })
    );

    const form = ref({
      username: '',
      password: '',
      code: '',
      rememberMe: false,
    });
    //加入返回按钮

    const router = useRouter();

    const handleBack = () => {
      // router.push('/');
      window.location.href = '/';
    };
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
      handleBack,
      ParticleSidebar,
    };
  },
};


</script>



<style scoped>
@import "@/css/views/Register.css";
</style>
