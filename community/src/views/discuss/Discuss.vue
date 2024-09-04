<template>
  <el-container>
    <el-aside class="leftsidebar">
      <Leftsidebar></Leftsidebar>
    </el-aside>

    <el-main>
      <div>
        <el-card class="comment-box">
          <el-avatar :src="userAvatar"/>
          <div class="comment-content">
            <p>{{ comment }}</p>

<!--            帖子的内容-->
            <div v-for="item in discussPosts" :key="item.id" class="post-item">
              <div class="post-content">
                <el-avatar :src="item.user.headerImg" class="post-avatar"></el-avatar>
                <span class="post-title">{{ item.post.title }}</span>
                <span class="post-title">{{ item.post.content }}</span>

                <div class="post-meta">
                  <span class="post-author">{{ item.user.username }}</span>
                  <span class="post-time">{{ translations.publishtime }} {{ item.post.createTime }}</span>
                </div>
                <div class="post-stats">
                  <el-tag>{{ translations.like }} {{ item.likeCount }}</el-tag>
                  <el-tag>{{ translations.reply }} {{ item.post.commentCount }}</el-tag>
                </div>
              </div>
            </div>


<!--            帖子的评论-->
            <div v-for="item in comments" :key="item.id" class="comment-item">
              <el-avatar :src="item.userAvatar"/>
              <p>{{ item.content }}</p>
              <div class="comment-meta">
                <span class="comment-author">{{ item.username }}</span>
                <span class="comment-time">{{ item.createTime }}</span>
              </div>
              <div class="comment-stats">
                <el-tag>{{ translations.like }} {{ item.likeCount }}</el-tag>
                <el-tag>{{ translations.reply }} {{ item.replyCount }}</el-tag>
              </div>


            <div class="comment-actions">
              <el-button type="text" @click="reply">回复</el-button>
              <el-button type="text" @click="edit">编辑</el-button>
              <el-button type="text" @click="deleteComment">删除</el-button>
            </div>
          </div>

          </div>
        </el-card>

        <el-collapse v-model="activeNames">
          <el-collapse-item title="1条回复" name="1">
            <div v-for="(reply, index) in replies" :key="index" class="reply-item">
              <el-avatar :src="reply.userAvatar"/>
              <p>{{ reply.content }}</p>
              <el-button type="text" @click="replyTo(reply.id)">回复</el-button>
            </div>
          </el-collapse-item>
        </el-collapse>

        <el-input v-if="isReplying" v-model="newReply" placeholder="输入回复..."/>
        <el-button v-if="isReplying" @click="sendReply">发送</el-button>
      </div>
    </el-main>

    <el-aside class="rightsidebar">
      <recommendbar></recommendbar>
    </el-aside>

  </el-container>
</template>


<script setup lang="ts">
import {ref, onMounted} from 'vue';
import Leftsidebar from "@/components/Leftsidebar.vue";
import recommendbar from "@/components/recommendbar.vue";
import axios from "axios";
import {useRoute} from "vue-router";

const userAvatar = 'path/to/avatar';
const comment = 'This is a comment';
const replies = ref([]);
const newReply = ref('');
const isReplying = ref(false);
const activeNames = ref([]);

const reply = () => {
  isReplying.value = true;
};

const sendReply = () => {
  // logic to send reply
  isReplying.value = false;
};

const edit = () => {
  // logic to edit the comment
};

const deleteComment = () => {
  // logic to delete the comment
};


const discussPosts = ref([]);
const start = ref(0);
const end = ref(1);
const image = ref('');
const comments = ref([]);

import { useRoute } from 'vue-router';

const discussPostId = ref('');
const getpostid = () => {
  const route = useRoute();
  discussPostId.value = route.params.id;
};


const fetchdetail = async () => {
    getpostid();
    console.log(discussPostId.value);
    const response = await fetch(`http://localhost:8080/community/discuss/detail/${discussPostId.value}`);
    console.log("discussdetail");
    console.log('Fetched posts:', response);


    // discussPosts.value = response.data.disscussPosts;
    // comments.value = response.data.comments;


    // page.value.total = response.data.Page.total;
    // page.value.current = response.data.Page.current;
    // page.value.pageSize = response.data.Page.pageSize;
    // start.value = (page.value.current - 1) * page.value.pageSize;
    // if (start.value + page.value.pageSize > page.value.total) {
    //   end.value = page.value.total;
    // } else {
    //   end.value = start.value + page.value.pageSize;
    // }

};

onMounted(() => {
  fetchdetail();
});


</script>/


<style>

</style>/