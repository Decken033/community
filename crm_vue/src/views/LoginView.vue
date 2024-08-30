<template>
<div class="login-container">
    <div class="left-side">
        <h2>高科教育国际留学</h2>
        <div style="text-align:left">中国高科集团目前聚焦职业教育领域内教育内容的研发及教育服务的提供</div>
    </div>

    <div class="right-side">
        <h1>账号登录</h1>
        <div>
            <el-input class="input1" v-model="username" style="max-width: 600px" placeholder="用户名">
                <template #prepend>
                    <el-button :icon="UserFilled"/>
                </template>
            </el-input>
            <el-input class="input1" v-model="password" style="max-width: 600px" placeholder="密码" type="password" required>
                <template #prepend>
                    <el-button :icon="Lock"/>
                </template>
            </el-input>
            <el-button style="max-width: 600px" class="input1" type="primary" @click="login">登录</el-button>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../utils/api'
export default defineComponent({
  name: 'LoginView',
  setup() {
    const username = ref('');
    const password = ref('');
    const router = useRouter()
    const login = async() => {
      
        const response = await fetch(api.user.login, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value,
          }),
        });
        const data = await response.json();
        console.log(data)
        if(data.code==0){
          // 跳转
          if(data.data.type==1){
            router.push('/home');
          }
          if(data.data.type==0){
            router.push('/home');
          }
          

        }else{
          alert(data.message)
        }
    };

    return {
      username,
      password,
      login,
      UserFilled,
      Lock,
    };
  },
});
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: space-between;

  max-width: 800px;
  height: 400px;
  margin: 100px auto; 
  border: 1px solid #ccc;
  border-radius: 4px;
  background: orange;
}
.login-container .left-side{
  width: 50%;
  background-color: #f4f4f4;
  padding: 20px;
  background-image: url(../assets/bg.jpg);
  background-size: cover; /* 或者 'contain' */
  background-position: center; /* 或者 'top left' 等 */
  background-repeat: no-repeat; /* 防止图片重复 */

  color: white;
  text-align: center;
}
.login-container .right-side{
  width: 50%;
  background-color: whitesmoke;
  padding: 20px;
  text-align: center;
  color: #484747;
}
.input1{
  margin:20px 0;
  width: 300px;
}
</style>

