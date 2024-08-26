<template>
  <div class="tweet-box">
    <el-input
        type="textarea"
        v-model="tweetContent"
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
      <el-button type="primary" :disabled="!tweetContent" @click="postTweet">
        Post
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElInput, ElButton, ElIcon } from 'element-plus';

// 这里导入Element Plus中已有的图标
import { Picture, VideoCamera, Calendar, Location } from '@element-plus/icons-vue';

const tweetContent = ref('');

const postTweet = () => {
  if (tweetContent.value) {
    console.log('Tweet content:', tweetContent.value);
    tweetContent.value = '';  // 清空输入框内容
  }
};
</script>

<style scoped>
.tweet-box {
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  //margin-top:50px;
  justify-content: center;
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
