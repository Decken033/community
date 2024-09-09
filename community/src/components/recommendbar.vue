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
    name: '李明',
    avatar: avatar1,
    latestPost: '刚刚写完一篇关于人工智能的文章，感觉收获很大。欢迎大家留言交流！',
  },
  {
    id: 2,
    name: '王晓婷',
    avatar: avatar2,
    latestPost: '今天带孩子去公园玩了一下午，生活中的小幸福就是如此简单。',
  },
  {
    id: 3,
    name: '张强',
    avatar: avatar3,
    latestPost: '工作了一整天，晚上终于能抽空去健身房锻炼，保持健康真的很重要！',
  },
  {
    id: 4,
    name: '刘丽娜',
    avatar: avatar4,
    latestPost: '最近尝试了一个新的摄影风格，效果出乎意料，大家可以去看看我的最新作品。',
  },
  {
    id: 5,
    name: '陈建国',
    avatar: avatar5,
    latestPost: '参加了一次线下行业交流活动，结识了很多有趣的人，未来值得期待！',
  },
  {
    id: 6,
    name: '赵雪',
    avatar: avatar6,
    latestPost: '最近在学习烘焙，今天尝试了第一次做蛋糕，虽然卖相一般，但味道还不错。',
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


.topsidebar {
  width: 80%;
  margin-top: 5px;
  height: auto;

}

.el-header {
  background-color: #f0f0f0;
}

.el-container {
  background-color: white;
  width: 100%;
  height: 100%;
}

.search-bar {
  height: 10%;
  margin-right: auto;
}

.el-main {
  //background-color: rgb(244, 247, 236);
  background-color: white;
  padding-top: 0px;
  width: 40%;
  height: 100%;
  flex-grow: 1;
}

.el-main::-webkit-scrollbar {
  display: none; /* 对 Chrome, Safari 有效 */
}

.el-menu {
  margin-left: auto; /* 自动推到右侧 */
}

.el-menu-item:hover {
  background-color: white;
}

.leftsidebar {
  display: flex;
  width: 25%;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
}

.rightsidebar {
  display: flex;
  width: 35%;
  height: 100%;
}

.el-menu-demo {
  display: flex;
  //justify-content: space-between;
  //align-items: center;
  flex-direction: column;
  width: 30%;
  margin: 0;
  padding: 0;
  transform: translateX(0);
}

.el-tabs {
  width: 300px;
  max-width: 100%;

  margin-top: auto;
  margin-bottom: auto;

  padding-top: 0;
  padding: 0px;
  height: auto;
}


.selectbar{
  margin-left: 20px;
  width: 80px;
}


/*main中最新最热的内容*/
.post-item {
  display: flex;
  align-items: flex-start;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.post-avatar {
  width: 50px;
  height: 50px;
  margin-right: 15px;
  border-radius: 50%;
  background-color: #e0e0e0;
}

.link-avatar:hover {
  background-color: white;
}

.post-title:hover {
  background-color: white;
}

.post-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.post-content:hover {
  background-color: white;
}
.post-title {
  font-weight: bold;
  color: #333;
  text-decoration: none;
  margin-bottom: 5px;
  margin-left: 0px;
}

.post-title:hover {
  color: #409eff; /* 鼠标悬停时的颜色 */
}

.post-meta {
  display: flex;
  align-items: center;
  color: #999;
  font-size: 14px;
  margin-bottom: 5px; /* 在作者和时间信息下方添加间距 */
}
.post-meta:hover{
  background-color: white ;
}
.post-author {
  margin-right: 10px;
  font-weight: bold;
  color: #666;
}
.post-author:hover{
  background-color: white;
}
.post-time {
  color: #999;
}
.link-user:hover{
  background-color: white;
}
.post-stats {
  display: flex;
  align-items: center;
  margin-top: 5px; /* 使统计信息与meta信息有一定的间隔 */
}

.post-stats .el-tag {
  margin-left: 5px;
  font-size: 12px;
}



</style>
