<template>
<div class="common-layout">

    <el-container class="box1">

        <el-header class="head">

            <Header></Header>

        </el-header>

        <el-container>

            <el-aside width="200px" class="left-side">

                <LeftSide></LeftSide>

            </el-aside>

            <el-container>

                <el-main class="main">

                    <el-page-header @back="goBack">

                        <template #content>

                            <span>

                                操作记录详情

                            </span>
                        </template>
                    </el-page-header>
                    <el-divider/>
                    <div class="box">
                        <el-timeline style="max-width: 1000px">
                            <el-timeline-item timestamp="2018/4/12" placement="top"
                            v-for="index,i in 6">
                                <el-card>
                                    <h4>类别：学费款项</h4>
                                    <p>电汇  <span style="color:red">30000元</span> 2018/4/12 20:46</p>
                                    <p>备注：无</p>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </div>

                </el-main>
                <el-footer class="foot">
                    <Footer></Footer>
                </el-footer>
            </el-container>

        </el-container>
    </el-container>
</div>
</template>
    <script lang="ts" setup>
    import { reactive, ref, onMounted } from 'vue';
    import LeftSide from '../../components/LeftSide.vue'
    import Header from '../../components/Header.vue'
    import Footer from '../../components/Footer.vue'
    import api from '../../utils/api'
    
    </script>
                
    <style scoped>
    .box {
        width: 90%;
        margin: 0px auto;
    }
    .head {
        border-bottom: 2px solid whitesmoke;
    }
    
    .left-side {
        /* background: #348ada; */
        border-right: 2px solid whitesmoke;
    }
    
    .main {
        min-height: 560px;
    }
    
    .foot {
        border-top: 2px solid whitesmoke;
        background-color: #f8f9fa;
        /* padding: 20px 0; */
        color: #666;
        text-align: center;
        font-size: 12px;
    }
    </style>
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                       