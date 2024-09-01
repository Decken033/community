import axios from 'axios';
import {onMounted, onBeforeUnmount, computed, ref} from 'vue';
import {useRouter} from "vue-router";
// 动态设置 rem 基准
const setRem = () => {
    const baseSize = window.innerWidth / 100; // 1rem = 视窗宽度的 1/100
    document.documentElement.style.fontSize = `${baseSize}px`;
};

// 组件挂载时设置 rem，并监听窗口大小变化
onMounted(() => {
    setRem();
    window.addEventListener('resize', setRem);
});

// 在组件卸载前移除监听器
onBeforeUnmount(() => {
    window.removeEventListener('resize', setRem);
});

// 表单数据
const form = ref({
    username: '',
    password: '',
    code: '',
    rememberMe: false,
    title: '', // 发布表单中的标题
    content: '', // 发布表单中的正文
});

const searchQuery = ref('');

// 定义 orderMode 的类型并初始化
const orderMode = ref<string | number>('0'); // 初始值为 '0'

// 发布弹出框的显示状态
const isPublishModalVisible = ref(false);

// 打开发布弹出框
const openPublishModal = () => {
    isPublishModalVisible.value = true;
};

const conversations = ref([
    {
        conversationId: '1',
        target: {
            headerUrl: 'https://example.com/avatar1.jpg',
            username: 'User1'
        },
        content: 'Hello, how are you?',
        createTime: '2023-10-01 10:00:00',
        unreadCount: 2,
        letterCount: 5
    },
    {
        conversationId: '2',
        target: {
            headerUrl: 'https://example.com/avatar2.jpg',
            username: 'User2'
        },
        content: 'Are you coming to the meeting?',
        createTime: '2023-10-02 11:00:00',
        unreadCount: 0,
        letterCount: 3
    },
    {
        conversationId: '3',
        target: {
            headerUrl: 'https://example.com/avatar3.jpg',
            username: 'User3'
        },
        content: 'Please review the document.',
        createTime: '2023-10-03 12:00:00',
        unreadCount: 1,
        letterCount: 7
    },
    {
        conversationId: '4',
        target: {
            headerUrl: 'https://example.com/avatar4.jpg',
            username: 'User4'
        },
        content: 'Can we reschedule our meeting?',
        createTime: '2023-10-04 13:00:00',
        unreadCount: 3,
        letterCount: 4
    },
    {
        conversationId: '5',
        target: {
            headerUrl: 'https://example.com/avatar5.jpg',
            username: 'User5'
        },
        content: 'Happy Birthday!',
        createTime: '2023-10-05 14:00:00',
        unreadCount: 0,
        letterCount: 2
    },
    {
        conversationId: '6',
        target: {
            headerUrl: 'https://example.com/avatar6.jpg',
            username: 'User6'
        },
        content: 'Let\'s catch up soon.',
        createTime: '2023-10-06 15:00:00',
        unreadCount: 1,
        letterCount: 6
    },
    {
        conversationId: '7',
        target: {
            headerUrl: 'https://example.com/avatar7.jpg',
            username: 'User7'
        },
        content: 'I have sent the documents.',
        createTime: '2023-10-07 16:00:00',
        unreadCount: 2,
        letterCount: 8
    },
    {
        conversationId: '8',
        target: {
            headerUrl: 'https://example.com/avatar8.jpg',
            username: 'User8'
        },
        content: 'Thank you for your help.',
        createTime: '2023-10-08 17:00:00',
        unreadCount: 0,
        letterCount: 1
    },
    {
        conversationId: '9',
        target: {
            headerUrl: 'https://example.com/avatar9.jpg',
            username: 'User9'
        },
        content: 'Can you review my code?',
        createTime: '2023-10-09 18:00:00',
        unreadCount: 4,
        letterCount: 9
    },
    {
        conversationId: '10',
        target: {
            headerUrl: 'https://example.com/avatar10.jpg',
            username: 'User10'
        },
        content: 'Let\'s have a meeting tomorrow.',
        createTime: '2023-10-10 19:00:00',
        unreadCount: 1,
        letterCount: 3
    }
]);

// Mock data for page
const page = ref({
    current: 1, // Current page number
    pageSize: 6, // Number of items per page
    total: 10 // Total number of items
});

// 定义 handleTabClick 函数
const handleTabClick = (tab: { label: string; name: string }) => {
    console.log(`当前选中的标签: ${tab.label}`);
};

//使用 computed 属性计算当前页需要显示的数据
const paginatedItems = computed(() => {
    const start = (page.value.current - 1) * page.value.pageSize;
    const end = start + page.value.pageSize;
    return conversations.value.slice(start, end);
});


// 处理分页变化
const handlePageChange = (newPage: number) => {
    page.value.current = newPage;
};


// 搜索功能
const router = useRouter();
const search = () => {
    console.log('Search query:', searchQuery.value);
    if (searchQuery.value.trim()) {
        // 使用 router.push 进行路由导航
        router.push({name: 'search', query: {keyword: searchQuery.value}});
    }
};


export {
    setRem,
    form,
    searchQuery,
    orderMode,
    posts,
    isPublishModalVisible,
    page,
    paginatedItems,
    handlePageChange,
    handleTabClick,
    search,
    conversations,
}