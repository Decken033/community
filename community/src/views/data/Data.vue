<template>
  <div class="container">
    <div class="leftsidebar">
      <leftsidebar></leftsidebar>
    </div>

    <el-main class="content">
      <div v-for="(item, index) in statistics" :key="index">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <span>{{ item.label }}</span>
          </el-form-item>
          <el-form-item>
            <el-date-picker
                v-model="item.startDate"
                type="date"
                placeholder="年/月/日"
            />
          </el-form-item>
          <el-form-item>
            <el-date-picker
                v-model="item.endDate"
                type="date"
                placeholder="年/月/日"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleStatistics(item)">开始统计</el-button>
          </el-form-item>
        </el-form>
        <div>
          <p>统计结果: {{ item.result }}</p>
        </div>
        <el-divider></el-divider>
      </div>
    </el-main>
  </div>
</template>

<script setup lang="ts">
import leftsidebar from "@/components/Leftsidebar.vue";
import { ref } from 'vue';
import axios  from "axios";


const statistics = ref([
  {
    label: '网站 UV',
    startDate: '',
    endDate: '',
    result: '',
    endpoint: '/data/uv',
    resultKey: 'uvResult',
    startKey: 'uvStartDate',
    endKey: 'uvEndDate',
  },
  {
    label: '活跃用户',
    startDate: '',
    endDate: '',
    result: '',
    endpoint: '/data/dau',
    resultKey: 'dauResult',
    startKey: 'dauStartDate',
    endKey: 'dauEndDate',
  },
]);

const handleStatistics = async (item) => {
  try {
    const response = await axios.post(item.endpoint, {
      [item.startKey]: item.startDate,
      [item.endKey]: item.endDate,
    });

    item.result = `统计结果: ${response.data[item.resultKey]}`;
  } catch (error) {
    console.error('统计失败', error);
    item.result = '统计失败';
  }
};


</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
  height: 100vh; /* 确保容器高度覆盖整个视窗 */
}

.leftsidebar {
  width: 25%;
  background-color: #f5f5f5; /* 可选：添加背景色，便于查看布局 */
}

.content {
  width: 75%;
  padding: 20px;
  overflow-y: auto; /* 可选：使内容区域可滚动 */
}
</style>
