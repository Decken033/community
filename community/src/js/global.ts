import axios from 'axios';
import {onMounted, onBeforeUnmount, computed, ref} from 'vue';
import {useRouter} from "vue-router";
import avatar1 from '@/images/avatar1.jpg';
import avatar2 from '@/images/avatar2.jpg';
import avatar3 from '@/images/avatar3.jpg';
import avatar4 from '@/images/avatar4.jpg';
import avatar5 from '@/images/avatar5.jpg';
import avatar6 from '@/images/avatar6.jpg';

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



// 定义 orderMode 的类型并初始化
const orderMode = ref<string | number>('0'); // 初始值为 '0'


//前端模拟帖子数据
// 帖子列表数据
const posts = ref([

    {
        id: 1,
        title: '如何高效备战春招？分享面试刷题技巧，一个月轻松搞定！',
        userAvatar: avatar6,
        author: '寒江雪',
        createTime: '2024-08-19',
        likeCount: 23,
        commentCount: 10
    },
    {
        id: 2,
        title: '面试攻略：掌握这五个技巧，拿下大厂Offer！',
        userAvatar: avatar1,
        author: '青山白',
        createTime: '2024-08-20',
        likeCount: 30,
        commentCount: 15
    },
    {
        id: 3,
        title: '春招求职经验谈：我如何从零开始备考，成功拿下心仪工作',
        userAvatar: avatar3,
        author: '沧海月',
        createTime: '2024-08-21',
        likeCount: 18,
        commentCount: 12
    },
    {
        id: 4,
        title: '求职必读：一份完整的面试题库，助你轻松上岸！',
        userAvatar: avatar4,
        author: '寒江雪',
        createTime: '2024-08-22',
        likeCount: 40,
        commentCount: 22
    },
    {
        id: 5,
        title: '从刷题到面试：我的备考心得分享，助你成功上岸',
        userAvatar: avatar2,
        author: '白衣渡',
        createTime: '2024-08-23',
        likeCount: 29,
        commentCount: 14
    },
    {
        id: 6,
        title: '算法面试高频题目汇总，一起突破大厂面试',
        userAvatar: avatar5,
        author: '青山白',
        createTime: '2024-08-24',
        likeCount: 35,
        commentCount: 19
    },
    {
        id: 7,
        title: '找工作，不焦虑：如何科学规划备考时间？',
        userAvatar: '/path/to/avatar7.png',
        author: '沧海月',
        createTime: '2024-08-25',
        likeCount: 27,
        commentCount: 13
    },
    {
        id: 8,
        title: '求职季的避坑指南：从简历到面试的完整攻略',
        userAvatar: '/path/to/avatar8.png',
        author: '白衣渡',
        createTime: '2024-08-26',
        likeCount: 31,
        commentCount: 16
    },
    {
        id: 9,
        title: '春招刷题大作战：一份面试刷题计划助你高效复习',
        userAvatar: '/path/to/avatar9.png',
        author: '寒江雪',
        createTime: '2024-08-27',
        likeCount: 25,
        commentCount: 18
    },


]);

// 发布弹出框的显示状态
const isPublishModalVisible = ref(false);

// 打开发布弹出框
const openPublishModal = () => {
    isPublishModalVisible.value = true;
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
};

// 定义 handleTabClick 函数
const handleTabClick = (tab: { label: string; name: string }) => {
    console.log(`当前选中的标签: ${tab.label}`);
};

// 搜索功能

const formatDate = (timeStamp: number) => {
    const date = new Date(timeStamp);
    return date.toLocaleDateString();
}

export {
    setRem,
    form,
    orderMode,
    posts,
    isPublishModalVisible,
    openPublishModal,
    page,
    paginatedItems,
    handlePageChange,
    handleTabClick,
    formatDate,
}