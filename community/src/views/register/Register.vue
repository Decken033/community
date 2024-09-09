<template>

  <el-container>
    <!-- 头部 -->

    <!-- 侧边栏 -->
    <el-aside>
      <img src="@/images/background4.jpg"  class="background-image" />
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
            <el-input v-model="form.email" type="email" class="form-input-email"
                      placeholder="请输入您的邮箱"></el-input>
            <el-button class="send-code-btn" @click="sendEmail">发送验证码</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleSubmit" class="button">立即注册</el-button>
          <a @click="handleBack">
            <el-button class="button">返回首页</el-button>
          </a>

        </el-form-item>
      </el-form>


    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {ElMessage} from 'element-plus';


const form = ref({
  username: '',
  password: '',
  code: '',
  rememberMe: false,
});
//加入返回按钮
const kaptchaSrc = ref('/kaptcha');





const loginForm = ref('');

const refreshKaptcha = () => {
  kaptchaSrc.value = `/kaptcha?${new Date().getTime()}`;
};

const handleSubmit = () => {
  loginForm.value.validate((valid: any) => {
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



//页面跳转返回
import router from "@/router/index.ts";
const handleBack = () => {
  router.push('/');
};


//翻译
import {useCommonTranslations} from '@/lang/i18nhelper';
import {useI18n} from 'vue-i18n';
const translations = useCommonTranslations();
const {t, locale} = useI18n({useScope: "global"});
const selectedLanguage = ref('zh');
const changeLanguage = () => {
  locale.value = selectedLanguage.value;
};


//密码规则
const rules = {
  username: [
    {required: true, message: t('message.enterUsername'), trigger: 'blur'},
  ],
  password: [
    {required: true, message: t('message.enterPassword'), trigger: 'blur'},
    {min: 8, message: t('message.passwordLength'), trigger: 'blur'},
  ],
  code: [
    {required: true, message: t('message.enterCode'), trigger: 'blur'},
  ],
};
</script>


<style scoped>
@import "@/css/views/Register.css";

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 图片自适应容器 */
  z-index: -1; /* 放在最底层 */
}
</style>