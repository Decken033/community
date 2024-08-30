<template>
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
        <a href="/" class="redirection" style="font-weight: bold">{{translations.videochat}}</a>
      </el-menu-item>

    </el-menu>
</template>

<script setup lang="ts">
import {useRouter}  from "vue-router";
import {useCommonTranslations} from '@/lang/i18nhelper';
const translations = useCommonTranslations();
</script>


<style scoped>

</style>