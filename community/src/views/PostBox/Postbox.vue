<template>
  <div class="tweet-box">
    <el-input
        type="textarea"
        v-model="comment"
        placeholder="What is happening?!"
        rows="3"
        maxlength="280"
        show-word-limit
    ></el-input>
    <div class="tweet-actions">
      <div class="icons">
        <el-icon><Picture></Picture></el-icon>
        <el-icon><video-camera></video-camera></el-icon>
        <el-icon><calendar></calendar></el-icon>
        <el-icon><location></location></el-icon>
      </div>
      <el-button type="primary" :disabled="!comment" @click="postTweet">
        Post
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElInput, ElButton, ElIcon } from 'element-plus';
import axios  from "axios";
// import api from "@/api/api.ts";


// 这里导入Element Plus中已有的图标
import { Picture, VideoCamera, Calendar, Location } from '@element-plus/icons-vue';



//发布推文
const comment = ref('');

async function postTweet() {

    //暂时假设讨论帖id为1
    const discussPostId = 1;
    try {
      const res = await axios.post(`http://localhost:8080/comment/add/${discussPostId}`, {
        comment: comment.value,
      });
    if (res.data.RESULT_CODE === 0) {
      alert('评论发布成功');
    } else {
      alert('评论发布失败');
    }
  } catch (error) {
    console.error('Error:', error);
    alert(`请求失败: ${error.response?.data?.message || '未知错误'}`);
  }
}






</script>

<style scoped>
.tweet-box {
  max-width: 600px;
  margin: 0 auto;
}

.el-input__inner {
  background-color: #192734;
  color: #fff;
  border: none;
}

.el-input__inner::placeholder {
  color: #8899a6;
}

.tweet-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.icons {
  display: flex;
  gap: 16px;
  color: #1DA1F2;
}

.el-button--primary {
  background-color: #1DA1F2;
  border-color: #1DA1F2;
}

.el-button--primary.is-disabled {
  background-color: #1da1f280; /* 禁用时的颜色 */
  border-color: #1da1f280;
}
</style>
