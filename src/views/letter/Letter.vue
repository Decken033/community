<template>
    <div id="app">
        <!-- 头部 -->
        <el-header class="bg-dark sticky-top">
            <div class="container">
                <!-- 导航 -->
                <el-menu class="el-menu-demo" mode="horizontal" background-color="#333" text-color="#fff"
                    active-text-color="#ffd04b">
                    <!-- 首页 -->
                    <el-menu-item index="1">
                        <router-link to="/">首页</router-link>
                    </el-menu-item>

                    <!-- 消息 -->
                    <el-menu-item index="2">
                        <router-link to="/letter">消息</router-link>
                        <el-badge :value="12" class="item" />
                    </el-menu-item>

                    <!-- 个人主页 -->
                    <el-menu-item index="5">
                        <router-link to="/profile">个人主页</router-link>
                    </el-menu-item>

                    <!-- 账号设置 -->
                    <el-menu-item index="6">
                        <router-link to="/settings">账号设置</router-link>
                    </el-menu-item>

                    <!-- 退出登录 -->
                    <el-menu-item index="7">
                        <router-link to="/login">退出登录</router-link>
                    </el-menu-item>

                    <!-- 搜索 -->
                    <el-menu-item index="8">
                        <el-input v-model="searchQuery" placeholder="搜索" @keyup.enter="search" />
                        <el-button @click="search" type="primary">搜索</el-button>
                    </el-menu-item>
                </el-menu>
            </div>
        </el-header>

        <!-- 内容 -->
        <el-container>
            <el-main>
                <div class="container">
                    <div class="position-relative">
                        <!-- 选项卡 -->
                        <el-tabs v-model="activeTab">
                            <el-tab-pane label="朋友私信" name="first">
                                朋友私信
                                <el-badge :value="letterUnreadCount" v-if="letterUnreadCount != 0" />
                            </el-tab-pane>
                            <el-tab-pane label="系统通知" name="second">
                                系统通知
                                <el-badge :value="noticeUnreadCount" v-if="noticeUnreadCount != 0" />
                            </el-tab-pane>
                        </el-tabs>
                        <el-button type="primary" size="small" class="position-absolute rt-0"
                            @click="showSendModal = true">发私信</el-button>
                    </div>

                    <!-- 私信列表 -->
                    <el-list class="border-bottom mb-3">
                        <el-list-item v-for="map in paginatedConversations" :key="map.conversation.conversationId"
                            class="border-bottom mb-3">
                            <el-badge :value="map.unreadCount" v-if="map.unreadCount != 0" />
                            <el-avatar :src="map.target.headerUrl" />
                            <div>
                                <h6 class="mt-0 mb-3">
                                    <span class="text-success">{{ map.target.username }}</span>
                                    <span class="float-right text-muted font-size-12">{{ map.conversation.createTime
                                        }}</span>
                                </h6>
                                <div>
                                    <router-link :to="'/letter/letterdetail/' + map.conversation.conversationId">
                                        {{ map.conversation.content }}
                                    </router-link>
                                    <ul class="d-inline font-size-12 float-right">
                                        <li class="d-inline ml-2">
                                            <a href="#" class="text-primary">共{{ map.letterCount }}条会话</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </el-list-item>
                    </el-list>

                    <!-- 分页 -->
                    <el-pagination background layout="prev, pager, next" :current-page="currentPage"
                        :page-size="pageSize" :total="total" @current-change="handleCurrentChange" class="mt-5" />
                </div>
            </el-main>
        </el-container>
        
        <!-- 发私信弹出框 -->
        <el-dialog title="发私信" v-model:visible="showSendModal" width="50%">
            <el-form>
                <el-form-item label="发给">
                    <el-input v-model="recipientName" />
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea" v-model="messageText" rows="10" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="showSendModal = false">取消</el-button>
                <el-button type="primary" @click="sendMessage">发送</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { ElMessage } from 'element-plus';
import { watch } from 'vue';


const activeTab = ref("first");
const letterUnreadCount = ref(3);
const noticeUnreadCount = ref(27);
const searchQuery = ref("");
const showSendModal = ref(false);
const recipientName = ref("");
const messageText = ref("");

const conversations = ref([
    {
        unreadCount: 3,
        target: {
            headerUrl: "http://images.nowcoder.com/head/1t.png",
            username: "落基山脉下的闲人",
        },
        conversation: {
            conversationId: 1,
            createTime: "2019-04-28 14:13:25",
            content: "米粉车, 你来吧!",
        },
        letterCount: 5,
    },
    {
        unreadCount: 0,
        target: {
            headerUrl: "http://images.nowcoder.com/head/2t.png",
            username: "风吹麦浪",
        },
        conversation: {
            conversationId: 2,
            createTime: "2020-06-15 08:45:12",
            content: "昨晚的比赛真精彩!",
        },
        letterCount: 8,
    },
    {
        unreadCount: 1,
        target: {
            headerUrl: "http://images.nowcoder.com/head/3t.png",
            username: "海上明月",
        },
        conversation: {
            conversationId: 3,
            createTime: "2021-09-10 21:34:08",
            content: "你明天有空吗？",
        },
        letterCount: 12,
    },
    {
        unreadCount: 2,
        target: {
            headerUrl: "http://images.nowcoder.com/head/4t.png",
            username: "星空下的遐想",
        },
        conversation: {
            conversationId: 4,
            createTime: "2022-12-01 15:22:50",
            content: "新年打算去哪里旅行？",
        },
        letterCount: 20,
    },
    {
        unreadCount: 4,
        target: {
            headerUrl: "http://images.nowcoder.com/head/5t.png",
            username: "清晨的阳光",
        },
        conversation: {
            conversationId: 5,
            createTime: "2023-07-07 10:11:00",
            content: "最近有新书推荐吗？",
        },
        letterCount: 7,
    }
]);

const search = () => {
    // 实现搜索逻辑
    console.log("Search query:", searchQuery.value);
};

const sendMessage = () => {
    // 实现发送消息的逻辑
    console.log("Sending message to:", recipientName.value);
    console.log("Message content:", messageText.value);
    showSendModal.value = false;
    ElMessage({
        message: "发送完毕!",
        type: "success",
    });
};

// 分页状态管理
const currentPage = ref(1);
const pageSize = ref(2);  // 每页显示条目数，假设每页2条
const total = ref(conversations.value.length);  // 总条目数

// 计算当前页的数据
const paginatedConversations = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return conversations.value.slice(start, end);
});

// 处理页码变化
const handleCurrentChange = (page) => {
    currentPage.value = page;
};

watch(conversations, (newVal) => {
  total.value = newVal.length;
});

</script>

<style>
/* 添加任何额外的样式 */
</style>
