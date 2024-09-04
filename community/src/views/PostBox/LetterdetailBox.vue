<template>
    <div>www</div>

    <el-input
        v-model="tweetTitle"
        placeholder="Enter your title"
        rows="2"
        maxlength="100"
        show-word-limit
    ></el-input>

    <el-input
        type="textarea"
        v-model="tweetContent"
        placeholder="What is happening?!"
        rows="3"
        maxlength="280"
        show-word-limit
    ></el-input>

    <input
        type="file"
        ref="fileInput"
        @change="handleFileUpload"
        accept="image/*"
        style="display: none;"
    />

    <div v-if="imageData" class="image-preview">
      <img :src="imageData" alt="Image preview" />
    </div>

    <div class="tweet-actions">
      <div class="icons">
        <el-icon @click="addPicture"><Picture /></el-icon>
        <el-icon @click="recordVideo"><VideoCamera /></el-icon>
        <el-icon @click="selectDate"><Calendar /></el-icon>
        <el-icon @click="addLocation"><Location /></el-icon>
      </div>
      <el-button type="primary" :disabled="!tweetTitle || !tweetContent" @click="postTweet">
        Post
      </el-button>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { ElInput, ElButton, ElIcon } from 'element-plus';
import { Picture, VideoCamera, Calendar, Location } from '@element-plus/icons-vue';

const tweetContent = ref('');
const imageData = ref(null);  // Store image data here
const tweetTitle = ref('');


const postTweet = () => {
  if (tweetContent.value) {
    console.log('Tweet content:', tweetContent.value);
    if (imageData.value) {
      console.log('Attached image:', imageData.value);
    }
    tweetContent.value = '';  // 清空输入框内容
    imageData.value = null;   // 清空图片数据
  }
};

const addPicture = () => {
  console.log('Add picture');
  // Trigger file input click
  const fileInput = document.querySelector('input[type="file"]');
  fileInput.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageData.value = e.target.result;  // Get base64 data of the image
    };
    reader.readAsDataURL(file);
  }
};
</script>

<style scoped>
.tweet-box {
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  height: 100%;
  width: 100%;
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

.image-preview {
  margin-top: 8px;
}

.image-preview img {
  max-width: 100%;
  border-radius: 8px;
}
</style>
