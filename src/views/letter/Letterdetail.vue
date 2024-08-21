<template>
    <div class="nk-container">
        <!-- 头部 -->
        <header class="bg-dark sticky-top">
            <div class="container">
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

                    <!-- 注册 -->
                    <el-menu-item index="3">
                        <router-link to="/register">注册</router-link>
                    </el-menu-item>

                    <!-- 登录 -->
                    <el-menu-item index="4">
                        <router-link to="/login">登录</router-link>
                    </el-menu-item>

                    <!--个人主页-->
                    <el-menu-item index="5">
                        <router-link to="/profile">个人主页</router-link>
                    </el-menu-item>

                    <!--账号设置-->
                    <el-menu-item index="6">
                        <router-link to="/settings">账号设置</router-link>
                    </el-menu-item>

                    <!--退出登录-->
                    <el-menu-item index="7">
                        <router-link to="/login">退出登录</router-link>
                    </el-menu-item>

                    <!-- 用户头像及下拉菜单 -->
                    <el-submenu index="5">
                        <template #title>
                            <img src="http://images.nowcoder.com/head/1t.png" class="rounded-circle"
                                style="width: 30px;" />
                        </template>
                        <el-menu-item index="5-1">
                            <router-link to="/profile">个人主页</router-link>
                        </el-menu-item>
                        <el-menu-item index="5-2">
                            <router-link to="/settings">账号设置</router-link>
                        </el-menu-item>
                        <el-menu-item index="5-3">
                            <router-link to="/login">退出登录</router-link>
                        </el-menu-item>
                        <el-divider />
                        <el-menu-item index="5-4" disabled>nowcoder</el-menu-item>
                    </el-submenu>

                    <!-- 搜索 -->
                    <el-menu-item index="6">
                        <el-input v-model="searchQuery" placeholder="搜索" @keyup.enter="search" />
                        <el-button @click="search" type="primary">搜索</el-button>
                    </el-menu-item>
                </el-menu>
            </div>
        </header>

        <!-- 内容 -->
        <div class="main">
            <div class="container">
                <div class="row">
                    <div class="col-8">
                        <h6>
                            <b class="square"></b>
                            来自 <i class="text-success">{{ target.username }}</i> 的私信
                        </h6>
                    </div>
                    <div class="col-4 text-right">
                        <button type="button" class="btn btn-secondary btn-sm" @click="back">返回</button>
                        <button type="button" class="btn btn-primary btn-sm" @click="showSendModal">给TA私信</button>
                    </div>
                </div>

                <!-- 弹出框 -->
                <el-dialog :visible.sync="sendModalVisible" title="发私信">
                    <el-form>
                        <el-form-item label="发给：">
                            <el-input v-model="target.username" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="内容：">
                            <el-input type="textarea" v-model="messageContent" rows="10"></el-input>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <el-button @click="sendModalVisible = false">取消</el-button>
                        <el-button type="primary" @click="sendMessage">发送</el-button>
                    </template>
                </el-dialog>

                <!-- 提示框 -->
                <el-dialog :visible.sync="hintModalVisible" title="提示">
                    <span>发送完毕!</span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import axios from 'axios';


export default {
    setup() {
        const searchQuery = ref('');
        const sendModalVisible = ref(false);
        const hintModalVisible = ref(false);
        const messageContent = ref('');


        const route = useRoute();
        const id = route.params.id;
        const target = ref({ username: '' });

        // onMounted(async () => {
        //     // 使用 id 进行 API 请求
        //     try {
        //         const response = await axios.get(`/api/users/${id}`);
        //         target.value = response.data; // 假设服务器返回的数据是用户对象
        //     } catch (error) {
        //         console.error('Failed to fetch user data:', error);
        //     }
        // });


        const mockUsers = [
      { id: '1', username: '落基山脉下的闲人' },
      { id: '2', username: '风吹麦浪' },
      { id: '3', username: '海上明月' }
    ];

    onMounted(() => {
      // 根据 id 从模拟数据中选择用户
      const user = mockUsers.find(user => user.id === id);
      if (user) {
        target.value = user;
      } else {
        // 处理未找到的情况
        target.value.username = '未知用户';
      }
    });

        const search = () => {
            console.log('Searching for:', searchQuery.value);
        };

        const back = () => {
            console.log('Going back');
        };

        const showSendModal = () => {
            sendModalVisible.value = true;
        };

        const sendMessage = () => {
            console.log('Sending message:', messageContent.value);
            sendModalVisible.value = false;
            hintModalVisible.value = true;
            ElMessage.success('Message sent successfully!');
        };

        return {
            searchQuery,
            sendModalVisible,
            hintModalVisible,
            messageContent,
            target,
            search,
            back,
            showSendModal,
            sendMessage
        };
    }
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>