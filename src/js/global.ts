import axios from 'axios';
import {onMounted, onBeforeUnmount, computed, ref} from 'vue';
import {useRouter} from "vue-router";
// 动态设置 rem 基准值
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

// 帖子列表数据
const posts = ref([
    {
        id: 1,
        title: '1备战春招，面试刷题跟他复习，一个月全搞定！',
        userAvatar: '/path/to/avatar.png',
        author: '寒江雪',
        createTime: '2024-08-19',
        likeCount: 11,
        commentCount: 7
    },
    {
        id: 1,
        title: '2备战春招，面试刷题跟他复习，一个月全搞定！',
        userAvatar: '/path/to/avatar.png',
        author: '寒江雪',
        createTime: '2024-08-19',
        likeCount: 11,
        commentCount: 7
    },
    {
        id: 1,
        title: '3备战春招，面试刷题跟他复习，一个月全搞定！',
        userAvatar: '/path/to/avatar.png',
        author: '寒江雪',
        createTime: '2024-08-19',
        likeCount: 11,
        commentCount: 7
    },
    {
        id: 1,
        title: '4备战春招，面试刷题跟他复习，一个月全搞定！',
        userAvatar: '/path/to/avatar.png',
        author: '寒江雪',
        createTime: '2024-08-19',
        likeCount: 11,
        commentCount: 7
    },
    {
        id: 1,
        title: '5备战春招，面试刷题跟他复习，一个月全搞定！',
        userAvatar: '/path/to/avatar.png',
        author: '寒江雪',
        createTime: '2024-08-19',
        likeCount: 11,
        commentCount: 7
    },
    {
        id: 1,
        title: '6备战春招，面试刷题跟他复习，一个月全搞定！',
        userAvatar: '/path/to/avatar.png',
        author: '寒江雪',
        createTime: '2024-08-19',
        likeCount: 11,
        commentCount: 7
    },
    {
        id: 1,
        title: '7备战春招，面试刷题跟他复习，一个月全搞定！',
        userAvatar: '/path/to/avatar.png',
        author: '寒江雪',
        createTime: '2024-08-19',
        likeCount: 11,
        commentCount: 7
    },
    {
        id: 1,
        title: '8备战春招，面试刷题跟他复习，一个月全搞定！',
        userAvatar: '/path/to/avatar.png',
        author: '寒江雪',
        createTime: '2024-08-19',
        likeCount: 11,
        commentCount: 7
    },
    {
        id: 1,
        title: '9备战春招，面试刷题跟他复习，一个月全搞定！',
        userAvatar: '/path/to/avatar.png',
        author: '寒江雪',
        createTime: '2024-08-19',
        likeCount: 11,
        commentCount: 7
    },

    // 添加更多帖子
]);


// 发布弹出框的显示状态
const isPublishModalVisible = ref(false);

// 打开发布弹出框
const openPublishModal = () => {
    isPublishModalVisible.value = true;
};

// 发布帖子
const publishPost = () => {
    axios.post('/posts', {
        title: form.value.title,
        content: form.value.content,
    }).then(response => {
        console.log('发布成功');
        isPublishModalVisible.value = false;
    }).catch(error => {
        console.error('发布失败:', error);
    });
};


// 分页信息
const page = ref({
    current: 1, // 当前页码
    pageSize: 6, // 每页显示条数
    total: posts.value.length, // 总条数
});

//使用 computed 属性计算当前页需要显示的数据
const paginatedItems = computed(() => {
    const start = (page.value.current - 1) * page.value.pageSize;
    const end = start + page.value.pageSize;
    return posts.value.slice(start, end);
});


// 处理分页变化
const handlePageChange = (newPage: number) => {
    page.value.current = newPage;
    // 在这里你可以根据新的页码请求数据

    // 示例 API 请求
    // const response = await fetch(`/api/items?page=${newPage}&pageSize=${page.value.pageSize}`);
    // const data = await response.json();

    // posts.value = data.items;
    // page.value.total = data.total;
};

// 定义 handleTabClick 函数
const handleTabClick = (tab: { label: string; name: string }) => {
    console.log(`当前选中的标签: ${tab.label}`);
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
    openPublishModal,
    publishPost,
    page,
    paginatedItems,
    handlePageChange,
    handleTabClick,
    search,
}