<template>
  <div class="tweet-box">

    <el-input
        v-model="tweetTitle"
        placeholder="Enter your title"
        rows="2"
        maxlength="100"
        show-word-limit
    ></el-input>

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
        <el-icon>
          <Picture></Picture>
        </el-icon>
        <el-icon>
          <video-camera></video-camera>
        </el-icon>
        <el-icon>
          <calendar></calendar>
        </el-icon>
        <el-icon>
          <location></location>
        </el-icon>
      </div>
      <el-button type="primary" :disabled="!comment" @click="postDiscussion">
        Post
      </el-button>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {ElInput, ElButton, ElIcon} from 'element-plus';
import {Picture, VideoCamera, Calendar, Location} from '@element-plus/icons-vue';
import api from "@/api/api";


const tweetTitle = ref('');
const comment = ref('');
const resultCode = ref(0); // 0: Success, 403: Failure

// Function to post discussion
const postDiscussion = async () => {
  try {
    const formData = ref(new FormData())
    formData.value.append('title', tweetTitle.value);
    formData.value.append('content', comment.value);
    const response = await fetch(api.discuss.add, {
      method: 'POST',
      body: formData.value
    });

    const result = await response.json();

    // Handle the response
    if (result.RESULT_CODE == 0) {
      resultCode.value = 0; // Success
    } else if (result.RESULT_CODE == 403) {
      resultCode.value = 403; // Failure
    } else {
      resultCode.value = 404;
    }

    tweetTitle.value = "";
    comment.value = "";
  } catch (error) {
    console.error('Error posting discussion:', error);
    resultCode.value = 404; // Handle error case
  }
};
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
  background-color: #1da1f280; /* Disabled state color */
  border-color: #1da1f280;
}
</style>
