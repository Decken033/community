<template>
  <el-container>
    <el-aside class="leftsidebar">
      <Leftsidebar></Leftsidebar>
    </el-aside>

    <el-main>
      <div>
        <el-card class="comment-box">
          <div class="comment-content">
            <!--            帖子的内容-->
            <div class="post-content">
              <el-avatar :src="user.headerImg" class="post-avatar"></el-avatar>
              <div><span class="post-title">{{ post.title }}</span></div>
              <div><span class="post-title">{{ post.content }}</span></div>

              <div class="post-meta">
                <span class="post-author">{{ user.username }}</span>
                <span class="post-time">{{ translations.publishtime }} {{ formatDate(post.createTime) }}</span>
              </div>
              <div class="post-stats">
                <el-button>{{ translations.like }} {{ likeCount }}</el-button>
                <el-button>{{ translations.reply }} {{ post.commentCount }}</el-button>
              </div>
            </div>


            <!--            帖子的评论-->
            <div v-for="item in comments" :key="item.id" class="comment-item">
              <el-avatar :src="item.user.headerImg"/>
              <div class="comment-meta">
                <span class="comment-author">{{ item.user.username }}</span>
                <span class="badge badge-secondary float-right floor">
                    {{  }}
                </span>
              </div>
              <div>
                <p>{{ item.comment.content }}</p>
              </div>
              <div class="comment-stats">
                <span class="comment-time">发布于 {{ formatDate(item.comment.createTime) }}</span>
                <el-button>{{ translations.like }} {{ item.likecount }}</el-button>
                <el-button>{{ translations.reply }} {{ item.replyCount }}</el-button>
              </div>

              <div class="comment-actions">
                <el-button type="text" @click="reply">回复</el-button>
                <el-button type="text" @click="edit">编辑</el-button>
                <el-button type="text" @click="deleteComment">删除</el-button>
              </div>
<!--              <div v-for="reply in item."-->
            </div>

          </div>
        </el-card>

<!--        <el-collapse v-model="activeNames">-->
<!--          <el-collapse-item title="1条回复" name="1">-->
<!--            <div v-for="(reply, index) in replies" :key="index" class="reply-item">-->
<!--              <el-avatar :src="reply.userAvatar"/>-->
<!--              <p>{{ reply.content }}</p>-->
<!--              <el-button type="text" @click="replyTo(reply.id)">回复</el-button>-->
<!--            </div>-->
<!--          </el-collapse-item>-->
<!--        </el-collapse>-->

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
import {useCommonTranslations} from '@/lang/i18nhelper';
import Leftsidebar from "@/components/Leftsidebar.vue";
import recommendbar from "@/components/recommendbar.vue";
import axios from "axios";
import {formatDate} from "@/js/global";

const replies = ref([]);
const newReply = ref('');
const isReplying = ref(false);
const activeNames = ref([]);
const user = ref('');


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
const post = ref('');
const likecount = ref('');

import {useRoute} from 'vue-router';
import {useI18n} from "vue-i18n";

const discussPostId = ref('');
const getpostid = () => {
  const route = useRoute();
  discussPostId.value = route.params.id.toString();
};


const loadData = (data: any) => {
  user.value = data.user;
  post.value = data.post;
  comments.value = data.comments;
  likecount.value = data.likeCount;
}

const fetchdetail = async () => {
  try {
    getpostid();
    const response = await axios.get(`http://localhost:8080/community/discuss/detail/${discussPostId.value}`, {});
    loadData(response.data);


    // discussPosts.value = response.data.disscussPosts;


    // page.value.total = response.data.Page.total;
    // page.value.current = response.data.Page.current;
    // page.value.pageSize = response.data.Page.pageSize;
    // start.value = (page.value.current - 1) * page.value.pageSize;
    // if (start.value + page.value.pageSize > page.value.total) {
    //   end.value = page.value.total;
    // } else {
    //   end.value = start.value + page.value.pageSize;
    // }

  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

onMounted(() => {
  fetchdetail();
});

const translations = useCommonTranslations();
const {locale} = useI18n({useScope: "global"});
const selectedLanguage = ref('zh');
const changeLanguage = () => {
  locale.value = selectedLanguage.value;
};

</script>/


<style>

</style>/