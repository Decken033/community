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
                                  新增学生
                              </span>
                          </template>
                      </el-page-header>
                      <el-divider/>
                      <div class="box">
                          <el-form :model="form" label-width="auto" style="max-width: 80%" :inline="true"  class="demo-form-inline">
                              <el-form-item label="学生名称">
                                  <el-input v-model="form.name"/>
                              </el-form-item>
                              <el-form-item label="手机号">
                                  <el-input v-model="form.phone"/>
                              </el-form-item>
                              <el-form-item label="性别">
                                  <el-select v-model="form.sex" placeholder="选择性别">
                                      <el-option label="男" value="1"/>
                                      <el-option label="女" value="0"/>
                                  </el-select>
                              </el-form-item>
                              <el-form-item label="身份证号">
                                  <el-input v-model="form.idcard"/>
                              </el-form-item>
                              <el-form-item label="名族">
                                  <el-input v-model="form.nation"/>
                              </el-form-item>
                              <el-form-item label="邮箱">
                                  <el-input v-model="form.email"/>
                              </el-form-item>
                              <el-form-item label="前置学校">
                                  <el-input v-model="form.frontSchool"/>
                              </el-form-item>
                              <el-form-item label="前置专业">
                                  <el-input v-model="form.frontMajor"/>
                              </el-form-item>
                              <el-form-item label="学生来源">
                                  <el-input v-model="form.origin"/>
                              </el-form-item>
                              <el-form-item label="是否代收学费">
                                  <el-select v-model="form.fee" placeholder="选择">
                                      <el-option label="是" value="1"/>
                                      <el-option label="否" value="0"/>
                                  </el-select>
                              </el-form-item>
                              <el-form-item label="是否拿到offer">
                                <el-select v-model="form.state" placeholder="选择">
                                      <el-option label="是" value="1"/>
                                      <el-option label="否" value="0"/>
                                  </el-select>
                              </el-form-item>
                              <el-form-item label="销售人员">
                                  <el-input v-model="form.salesman"/>
                              </el-form-item>
                              <el-form-item label="代理">
                                  <el-select v-model="form.stagentId" placeholder="选择">
                                    <!-- 网络请求 -->
                                      <el-option label="1" value="1"/>
                                      <el-option label="2" value="2"/>
                                  </el-select>
                              </el-form-item>
                              <el-form-item label="报名学校">
                                  <el-select v-model="form.schoolId" placeholder="选择">
                                    <!-- 网络请求 -->
                                      <el-option label="1" value="1"/>
                                      <el-option label="7" value="7"/>
                                  </el-select>
                              </el-form-item>
                              <el-form-item label="报名专业">
                                  <el-input v-model="form.major"/>
                              </el-form-item>
                              <el-form-item label="报名学位">
                                  <el-select v-model="form.degree" placeholder="选择">
                                      <el-option label="博士" value="博士"/>
                                      <el-option label="硕士" value="硕士"/>
                                      <el-option label="学士" value="学士"/>
                                      <el-option label="访问学者" value="访问学者"/>
                                      <el-option label="桥梁课" value="桥梁课"/>
                                      <el-option label="语言班" value="语言班"/>
                                  </el-select>
                              </el-form-item>
                              <el-form-item label="学制">
                                  <el-select v-model="form.other1" placeholder="选择">
                                      <el-option label="1年制" value="1"/>
                                      <el-option label="2年制" value="2"/>
                                      <el-option label="3年制" value="3"/>
                                      <el-option label="4年制" value="4"/>
                                  </el-select>
                              </el-form-item>
                              <el-form-item label="备注">
                                  <el-input v-model="form.notes"/>
                              </el-form-item>
                              <el-form-item label="相关文件">
                                  <el-upload
                                      v-model:file-list="fileList"
                                      class="upload-demo"
                                      multiple
                                      :limit="1"
                                      :auto-upload="false"
                                      :on-change="handleFileChange">
                                      <el-button type="warning">点击上传文件</el-button>
                                  </el-upload>
                              </el-form-item>
                              <el-divider></el-divider>
                              <el-form-item style="text-align: center;">
                                  <el-button type="primary" @click="onSubmit">确定</el-button>
                                  <el-button>返回</el-button>
                              </el-form-item>
                          </el-form>
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
  import { reactive, ref } from 'vue';
  import LeftSide from '../../components/LeftSide.vue'
  import Header from '../../components/Header.vue'
  import Footer from '../../components/Footer.vue'
  import api from '../../utils/api'
  const form = reactive({
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
  })
  const fileList = ref<File[]>([]);
  const handleFileChange = (file: any, fileList: any[]) => {
        form.contract = file.raw;};
  
  const onSubmit = async ()=>{
      const formDataObject = new FormData();
      formDataObject.append('name', form.name);
      formDataObject.append('phone', form.phone);
      formDataObject.append('sex', form.sex);
      formDataObject.append('idcard', form.idcard);
      formDataObject.append('nation', form.nation);
      formDataObject.append('email', form.email);
      formDataObject.append('frontSchool', form.frontSchool);
      formDataObject.append('frontMajor', form.frontMajor);
      formDataObject.append('origin', form.origin);
      formDataObject.append('fee', form.fee);
      formDataObject.append('state', form.state);
      formDataObject.append('salesman', form.salesman);
      formDataObject.append('notes', form.notes);
      formDataObject.append('stagentId', form.stagentId);
      formDataObject.append('schoolId', form.schoolId);
      formDataObject.append('major', form.major);
      formDataObject.append('degree', form.degree);
      formDataObject.append('other1', form.other1);
      formDataObject.append('contract', form.contract);
      console.log(formDataObject)
      const response = await fetch(api.student.addstudent, {
            method: 'POST',
            body: formDataObject,
          });
          const data = await response.json();
          console.log(data)
          alert(data.message)
  }
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


  .demo-form-inline .el-input {
   --el-input-width: 350px;
  }

.demo-form-inline .el-select {
  --el-select-width: 350px;
}

  </style>
          
          
          
          
          
          
          
          
          
          
          
          
          
          
               