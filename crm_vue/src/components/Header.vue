<template>
<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
    <h1 style="text-align: left;width: 100%;">高科教育内容管理系统</h1>
    <!-- <el-menu-item index="0"> -->
       
        <!-- <img style="width: 100px" src="../assets/gk.jpg" alt="Element logo"/> -->
    <!-- </el-menu-item> -->
     <!-- <el-menu-item index="0">
        <img style="width: 90px" src="../assets/logo.png" alt="Element logo"/>
    </el-menu-item> -->
    <div class="flex-grow"/>
    <el-sub-menu index="0">
        <template #title>财务用户1
        </template>
        <el-menu-item index="0-1">个人中心</el-menu-item>
        <el-menu-item index="0-2">退出登录</el-menu-item>
    </el-sub-menu>
</el-menu>
</template>
<style scoped>
.flex-grow {
    flex-grow: 1;
}
</style>>