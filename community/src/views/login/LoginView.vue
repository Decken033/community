<template>
  <el-container>
    <!-- 头部 -->

    <!-- 侧边栏 -->
    <el-aside>
<!--      <particlebar></particlebar>-->
    </el-aside>

    <!-- 内容 -->
    <el-main>
      <div class="container pl-5 pr-5 pt-3 pb-3 mt-3 mb-3">
        <!--        <h3 class="text-center text-info border-bottom pb-3">登录</h3>-->
        <img src="@/images/logo.jpg" class="logo">
        <el-form :model="form" :rules="rules" ref="loginForm" label-width="100px">
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
                <img :src="img" style="width: 100px; height: 40px;"/>
                <a @click="refreshKaptcha">刷新验证码</a>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="form.rememberMe">记住我</el-checkbox>
            <a @click="navigateToForget" class="text1">忘记密码?</a>
            <a @click="navigateToRegister" class="text1">立即注册</a>
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

<script setup lang="ts">
import {ref} from 'vue';



//验证码url
const img = ref('');
//验证码接口
import api from "@/api/api.ts";
import {ElMessage} from "element-plus";
const refreshKaptcha = async () => {
  const response = await fetch(api.user.verifycode);
  const blob = await response.blob();
  img.value = URL.createObjectURL(blob);
};




//登录接口
const form = ref({
  username: '',
  password: '',
  code: '',
  rememberMe: false,
});
const handleSubmit = async() => {
    const response = await fetch(api.user.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: form.value.username,
        password: form.value.password,
        code: form.value.code,
        rememberMe: form.value.rememberMe,
      }),
    });
    const data = await response.json();
    console.log(data);
    if(data.status==0){
      //正确
      router.push('/');
    }else if(data.status==1){
      //验证码错误
      ElMessage.error('验证码错误');
    }else{
      //账号密码错误
      ElMessage.error('账号密码错误');
    }
};




//加入返回按钮
import router from "@/router/index.ts";
const handleBack = () => {
  router.push('/');
};
const navigateToRegister = () => {
  router.push('/register');
};
const navigateToForget = () => {
  router.push('/forget');
};
</script>


<style scoped>
@import "@/css/views/Register.css";
</style>