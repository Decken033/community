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
                                    搜索查询
                                </span>
                                <span style="margin-left:30px;"><el-button type="primary" @click="exportschool">导出结果</el-button></span>
                            </template>
                        </el-page-header>
                        <el-divider/>
                        <div class="box">
                            <el-table :data="schools" style="width: 100%">
                                <!-- <el-table-column fixed prop="id" label="编码"/> -->
                                <el-table-column prop="name" label="姓名"/>
                                <el-table-column prop="phone" label="手机号"/>
                                <el-table-column prop="sex" label="性别"/>
                                <el-table-column prop="idcard" label="身份证号"/>
                                <el-table-column prop="frontSchool" label="前置学校"/>
                                <el-table-column prop="frontMajor" label="前置学位"/>
                                <el-table-column prop="origin" label="来源"/>
                                <el-table-column prop="fee" label="是否代缴学费"/>
                                <el-table-column prop="state" label="Offer"/>
                                <el-table-column prop="salesman" label="销售"/>
                                <el-table-column prop="notes" label="备注"/>
                                <el-table-column prop="stagentId" label="代理"/>
                                <el-table-column prop="schoolId" label="学校"/>
                                <el-table-column prop="major" label="目标专业"/>
                                <el-table-column prop="degree" label="目标学位"/>
                                <el-table-column prop="other1" label="学制"/>
                                <el-table-column prop="contract" label="合同"/>
                                
    
                                <!-- <el-table-column fixed="right" label="操作">
                                    <template #default>
                                        <el-button link type="danger" size="small" @click="handleClick">
                                            删除
                                        </el-button>
    
                                        <el-button link type="primary" size="small" disabled="">修改</el-button>
                                    </template>
                                </el-table-column> -->
                            </el-table>
                            <div class="pagination-container">
                                <el-pagination background layout="prev, pager, next" :total="total_page"  v-model:current-page="curent_page" @current-change="handleCurrentChange"/>
                            </div>
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
    import * as XLSX from 'xlsx';
    interface School{
        id: '',
        name: '',
      phone: '',
      sex: '',
      idcard: '',
      nation: '',
      email: '',
      frontSchool: '',
      frontMajor: '',
      origin: '',
      fee: '',
      state: '',
      salesman: '',
      notes: '',
      stagentId: '',
      schoolId: '',
      major: '',
      degree: '',
      other1: '',
      contract: '',
    }
    const schools = ref<School[]>([]);
    const curent_page = ref(1)
    const total_page = ref(0)
    const page_size = ref(10)
    
    const handleCurrentChange = (newPage: number)=>{
        curent_page.value = newPage
        getschool_by_page(curent_page.value)
    }
    const exportschool = async ()=>{
        const response = await fetch(api.student.allstudent, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              }
            });
            const data = await response.json();
            console.log(data)
            // data.schools
            const worksheet = XLSX.utils.json_to_sheet(data.students);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    
          // 生成Excel文件
          const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
          // 导出文件
          const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
          const href = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = href;
          link.download = "allschool.xlsx";  // 文件名
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(href);
    }
    
    const getschool_by_page = async (page: number)=>{
        const response = await fetch(api.student.studentlist, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                page: page,
                pagesize: page_size.value,
              }),
            });
            const data = await response.json();
            console.log(data)
            schools.value = data.students
            curent_page.value = data.pagination.page
            total_page.value = data.pagination.total
    }
    onMounted(() => {
        getschool_by_page(curent_page.value)
    })
    
    </script>
                
    <style scoped>
    .box {
        width: 90%;
        margin: 0px auto;
    }
    
    .search {
        color: #606266
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
    .pagination-container {
      display: flex;
      justify-content: center; /* 水平居中 */
      align-items: center; /* 垂直居中 */
      height: 100px; /* 根据需要调整高度 */
    }
    </style>
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                      