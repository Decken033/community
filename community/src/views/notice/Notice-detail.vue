<template>
  <el-container>
    <el-aside class="leftsidebar">
      <Leftsidebar></Leftsidebar>
    </el-aside>

    <!-- 内容  -->
    <el-main>
      <el-row :gutter="20">
        <el-col :span="24" v-for="(notice,index) in notices" :key="notice.entityId" v-show="isInRange(index)">
          <el-card shadow="hover" class="notice-item">
            <div class="header">
              <el-avatar :src="notice.fromUser.avatar" />
              <div class="header-info">
                <span class="username">{{ notice.fromUser.headerImg }}</span>
                <span class="username">{{ notice.fromUser.username }}</span>
                <span class="timestamp">{{ notice.notice.createTime }}</span>
              </div>
            </div>
            <div class="content">
              <p class="message">{{ notice.notice.message }}</p>
              <el-tag v-if="notice.entityType === 1" type="info">{{translations.post}}</el-tag>
              <el-tag v-if="notice.entityType === 2" type="success">{{translations.comment}}</el-tag>
              <el-tag v-if="notice.entityType === 3" type="warning">{{ translations.user }}</el-tag>
            </div>
            <div class="footer">

            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- 分页 -->
      <el-pagination class="page"
                     v-if="page.total > 0"
                     :current-page="page.current"
                     :page-size="page.pageSize"
                     :total="page.total"
                     layout="total, prev, pager, next, jumper"
                     @current-change="handlePageChange"
      >
      </el-pagination>
    </el-main>
    <el-aside class="rightsidebar">
      <div class="search-bar">
        <el-input v-model="searchQuery" @keyup.enter="search" style="width: 200px;"/>
        <el-button @click="search" type="primary">{{ translations.search }}</el-button>
        <el-select v-model="selectedLanguage" @change="changeLanguage" placeholder="Select Language" class="selectbar">
          <el-option label="English" value="en"></el-option>
          <el-option label="中文" value="zh"></el-option>
          <el-option label="Español" value="sp"></el-option>
        </el-select>
        <div>
          <recommendbar></recommendbar>
        </div>
      </div>
    </el-aside>
  </el-container>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import {onBeforeMount, onMounted, ref} from 'vue';
import router from '@/router/index.ts';

//分页信息
const page = ref({
  current: 1,
  pageSize: 6,
  total: 10
});
const notices = ref([]);
const start=ref(0);
const end=ref(1);
const isInRange = (index) =>{
  if(index<=end.value-1&&index>=start.value){
    return 1;
  }else{
    return 0;
  }
}
const handlePageChange = (newPage) => {
  page.value.current = newPage;
  start.value = (page.value.current - 1) * page.value.pageSize;
  if (start.value + page.value.pageSize  > page.value.total){
    end.value = page.value.total;
  }else{
    end.value = start.value + page.value.pageSize;
  }
};
const getNoticeDetail = async () => {
  console.log("dss");
  const response = await fetch(api.notice.detail);
  const data = await response.json();
  console.log(data.value);
  notices.value = data.notices;
  // console.log(notices.value);
  page.value.total = data.Page.rows;
  page.value.current = data.Page.current;
  page.value.pageSize = data.Page.limit;
  start.value = (page.value.current - 1) * page.value.pageSize;
  if (start.value + page.value.pageSize  > page.value.total){
    end.value = page.value.total;
  }else{
    end.value = start.value + page.value.pageSize;
  }
  // console.log(start);
  // console.log(end);

};










//获取当前路径参数
const noticeType = ref('');
const getNoticeType = () => {
  const route = useRoute();
  if(route.params.type === 'comment') {
    noticeType.value = 'comment';
  } else if(route.params.type === 'like') {
    noticeType.value = 'like';
  } else if(route.params.type === 'follow') {
    noticeType.value = 'follow';
  }
};
onMounted(() => {
  getNoticeDetail();
});
//搜索调用
const searchQuery = ref('');
const search = () => {
  console.log('Search query:', searchQuery.value);
  if (searchQuery.value.trim()) {
    // 使用 router.push 进行路由导航
    router.push({name: 'search', query: {keyword: searchQuery.value}});
  }
};
//多语言支持
import {useCommonTranslations} from '@/lang/i18nhelper';
import {useI18n} from 'vue-i18n';
const translations = useCommonTranslations();
const {t, locale} = useI18n({useScope: "global"});
const selectedLanguage = ref('zh');
const changeLanguage = () => {
  locale.value = selectedLanguage.value
}
//样式
import Leftsidebar from "@/components/Leftsidebar.vue";
import recommendbar from "@/components/recommendbar.vue";
import api from "@/api/api";
import * as console from "node:console";
</script>

<style>
@import "@/css/views/noticeDetail.css";
</style>