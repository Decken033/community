<template>
  <el-tabs v-model="activeTab">
    <!-- 推荐关注 Tab -->
    <el-tab-pane label="推荐关注" name="recommend">
      <div class="recommended-section">
        <ul>
          <li v-for="user in recommendedUsers" :key="user.id">
            <img :src="user.avatar" :alt="`用户${user.name}的头像`" class="avatar">
            <div class="user-info">
              <span class="user-name">{{ user.name }}</span>
              <p class="user-post">{{ user.latestPost }}</p> <!-- 显示用户的最新帖子内容 -->
              <button>关注</button>
            </div>
          </li>
        </ul>
      </div>
    </el-tab-pane>

    <!-- 其他内容 Tab -->
    <el-tab-pane label="其他内容" name="other">
      <div>其他内容...</div>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import avatar1 from '@/images/avatar1.jpg';
import avatar2 from '@/images/avatar2.jpg';
import avatar3 from '@/images/avatar3.jpg';
import avatar4 from '@/images/avatar4.jpg';
import avatar5 from '@/images/avatar5.jpg';
import avatar6 from '@/images/avatar6.jpg';


const activeTab = ref('recommend');

const recommendedUsers = ref([
  {
    id: 1,
    name: '用户名1',
    avatar: avatar1,
    latestPost: '这是用户1的最新帖子内容。',
  },
  {
    id: 2,
    name: '用户名2',
    avatar: avatar2,
    latestPost: '用户2分享了他们的想法和经验。',
  },
  {
    id: 3,
    name: '用户名3',
    avatar: avatar3,
    latestPost: '用户3发布了一篇新文章。',
  },
  {
    id: 4,
    name: '用户名4',
    avatar: avatar4,
    latestPost: '用户4分享了一些有趣的内容。',
  },
  {
    id: 5,
    name: '用户名5',
    avatar: avatar5,
    latestPost: '用户5发布了一些照片。',
  },
  {
    id: 6,
    name: '用户名6',
    avatar: avatar6,
    latestPost: '用户6发布了一些新的视频。',
  },
]);
</script>

<style scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}


.recommended-section ul {
  list-style: none;
  padding: 0;
}

.recommended-section li {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: bold;
}

.user-post {
  margin: 5px 0;
  color: #666;
}

.recommended-section button {
  align-self: flex-start;
  margin-top: 10px;
}
</style>
