<template>
<div class="common-layout">
    <el-container class="box1">
      
        <el-aside width="200px" class="left-side">
                <LeftSide></LeftSide>
            </el-aside>
        <el-container>
            <el-container>
                <el-header class="head">
            <Header></Header>
        </el-header>
                <el-main class="main">
                    <!-- <h3 style="text-align:center">{{title}}</h3> -->
                    <!-- <el-divider/> -->
                    <div class="content">
                        <el-row :gutter="20">
                            <el-col :span="4" v-for="(item, index) in items" :key="index">
                                <el-card>
                                    <h3>{{ item.title }}</h3>
                                    <p>{{ item.number }}</p>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                    <!-- <el-divider/> -->
                    <div id="mainchart" style="width: 100%;height: 425px;"></div>

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
import { defineComponent,reactive,ref,onMounted } from 'vue';
import LeftSide from '../components/LeftSide.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import * as echarts from 'echarts'
onMounted(()=>{
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('mainchart'));
// 绘制图表
myChart.setOption({
  tooltip: {},
  xAxis: {
    data: ['马来西亚大学', '剑桥大学', '阿尔卡拉大学', '林肯大学', '世纪大学', 
    '敦阿都拉萨大学','格林尼治大学', '敦胡先翁大学', '国家能源大学','敦胡先翁大学', '国家能源大学','马来西亚大学', '剑桥大学', '阿尔卡拉大学', '林肯大学', '世纪大学', 
    '敦阿都拉萨大学','格林尼治大学', '敦胡先翁大学', '国家能源大学','敦胡先翁大学', '国家能源大学'],
    axisLabel: {
          rotate: 45,  // 标签旋转45度
          formatter: (value) => {
            return value.split(' ').join('\n'); // 自动换行
          },
          rich: {
            align: 'center'
          }
        }
  },
  yAxis: {},
  series: [
    {
      name: '学生数量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20,5, 20, 36,10,10,5, 20, 36, 10, 10, 20,5, 20, 36,10,10],
      itemStyle: {color:"#b5001e"}
    }
  ]
})})
const title = ref("业务内容管理系统")
const items = ref([
      { title: '学生数量', number: '1000' },
      { title: '代理方', number: '50' },
      { title: '项目方', number: '10' },
      { title: '合作学校', number: '19' },
      { title: '总收入', number: '100,0000' },
      { title: '总支出', number: '60,0000' }
    ]);
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
    min-height: 580px;
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