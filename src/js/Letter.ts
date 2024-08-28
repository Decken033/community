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

export {
    activeTab,
    letterUnreadCount,
    noticeUnreadCount,
    searchQuery,
    showSendModal,
    recipientName,
    messageText,
    conversations,
    search,
    sendMessage,
    paginatedConversations,
    currentPage,
    pageSize,
    total,
    handleCurrentChange,
}