<template>
  <div class="nk-container">
    <!-- 头部 -->
    <header class="bg-dark sticky-top">
      <div class="container">
        <!-- 导航 -->
        <el-menu class="el-menu-demo" mode="horizontal" background-color="#333" text-color="#fff"
          active-text-color="#ffd04b">
          <!-- 首页 -->
          <el-menu-item index="1">
            <router-link to="/">首页</router-link>
          </el-menu-item>

          <!-- 登录 -->
          <!-- <el-menu-item index="4">
            <router-link to="/login">登录</router-link>
          </el-menu-item> -->

          <!-- 个人主页>
          < <el-menu-item index="5">
            <router-link to="/profile">个人主页</router-link>
          </el-menu-item>

          <!--账号设置>-->
          <!-- <el-menu-item index="6">
            <router-link to="/settings">账号设置</router-link>
          </el-menu-item> --> -->

          <!--退出登录>-->
          <el-menu-item index="7">
            <router-link to="/">退出登录</router-link>
          </el-menu-item>

        </el-menu>
      </div>
    </header>

    <!-- 内容 -->
    <div class="main">
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
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const form = ref({
      username: '',
      password: '',
      code: '',
      rememberMe: false,
    });

    const kaptchaSrc = ref('/kaptcha'); // 假设你的验证码图片地址是这个

    const rules = {
      username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 8, message: '密码长度不能小于8位', trigger: 'blur' },
      ],
      code: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
      ],
    };

    const loginForm = ref(null);

    const refreshKaptcha = () => {
      // 刷新验证码
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
          // 可以在这里处理登录成功后的逻辑
        })
        .catch((error) => {
          console.error('登录失败:', error);
        });
    };

    return {
      form,
      rules,
      kaptchaSrc,
      loginForm,
      refreshKaptcha,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
/* 自定义样式 */
</style>
