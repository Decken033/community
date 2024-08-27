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
      <img src="@/images/logo.jpg" class="logo">
      <el-form :model="form" :rules="rules" ref="registerForm" label-width="80px" class="mt-5">
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" class="form-input" placeholder="请输入您的账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" class="form-input"
                    placeholder="请输入您的密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" class="form-input"
                    placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <div class="email-wrapper">
            <el-input v-model="form.email" type="email" class="form-input-email" placeholder="请输入您的邮箱"></el-input>
            <el-button  class="send-code-btn" @click="sendEmail">发送验证码</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">立即注册</el-button>
          <a href="/">
            <el-button type="primary">返回首页</el-button>
          </a>

        </el-form-item>
      </el-form>


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
