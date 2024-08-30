<template>
<div>
    <!-- 高科教育内容管理系统 -->
    <div style="text-align:left;margin: 20px;">
        <img style="width: 100px" src="../assets/logo.png" alt="Element logo"/>  
    </div>
    <el-menu :default-active="activeIndex" router>
        <el-sub-menu index="1">
            <template #title>
                <el-icon><Avatar/></el-icon>
                <span>学生管理</span>
            </template>
            <el-menu-item index="/addstudent">新增学生</el-menu-item>
            <el-menu-item index="/studentlist">学生列表</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
            <template #title>
                <el-icon><HomeFilled/></el-icon>
                <span>学校管理</span>
            </template>
            <el-menu-item index="/addschool">新增学校</el-menu-item>
            <el-menu-item index="/schoollist">学校列表</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
            <template #title>
                <el-icon><Promotion/></el-icon>
                <span>代理管理</span>
            </template>
            <el-menu-item index="/addagent">新增代理</el-menu-item>
            <el-menu-item index="/agentlist">代理列表</el-menu-item>
        </el-sub-menu>
        <!-- <el-sub-menu index="3">
            <template #title>
                <el-icon><Grid/></el-icon>
                <span>项目方管理</span>
            </template>
            <el-menu-item index="3-1">新增项目方</el-menu-item>
            <el-menu-item index="3-2">项目方列表</el-menu-item>
        </el-sub-menu> -->

        <el-sub-menu index="5">
            <template #title>
                <el-icon><Money/></el-icon>
                <span>费用记录管理</span>
            </template>
            <el-menu-item index="/addrecord">新增费用记录</el-menu-item>
            <el-menu-item index="/recordlist">费用记录列表</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/result">
            <template #title>
                <el-icon><Money/></el-icon>
                <span>数据查询导出</span>
            </template>
        </el-menu-item>
    </el-menu>
</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const activeIndex = ref('/home')
</script>
<style scoped>

</style>