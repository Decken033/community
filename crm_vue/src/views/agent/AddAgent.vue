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
                                新增代理
                            </span>
                        </template>
                    </el-page-header>
                    <el-divider/>
                    <div class="box">
                        <el-form :model="form" label-width="auto" style="max-width: 600px">
                            <el-form-item label="学校名称">
                                <el-input v-model="form.schoolName"/>
                            </el-form-item>
                            <el-form-item label="所在国家">
                                <el-input v-model="form.schoolAddress"/>
                            </el-form-item>
                            <el-form-item label="学校类型">
                                <el-select v-model="form.schoolType" placeholder="选择学校类型">
                                    <el-option label="国际" value="国际"/>
                                    <el-option label="国内" value="国内"/>
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

                            <el-form-item>
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
    schoolName: '',
    schoolAddress: '',
    schoolType: '',
    notes: '',
    contract: null,
})
const fileList = ref<File[]>([]);
const handleFileChange = (file: any, fileList: any[]) => {
      form.contract = file.raw;
    };

const onSubmit = async ()=>{
    const formDataObject = new FormData();
    formDataObject.append('schoolName', form.schoolName);
    formDataObject.append('schoolAddress', form.schoolAddress);
    formDataObject.append('schoolType', form.schoolType);
    formDataObject.append('notes', form.notes);
    formDataObject.append('contract', form.contract);
    console.log(formDataObject)
    const response = await fetch(api.school.addschool, {
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
</style>
        
        
        
        
        
        
        
        
        
        
        
        
        
        
             