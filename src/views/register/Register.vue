<template>
	<div class="nk-container">
		<!-- Header -->
		<header class="bg-dark sticky-top">
			<div class="container">
				<!-- Navigation -->
				<el-menu class="el-menu-demo" mode="horizontal" background-color="#333" text-color="#fff"
					active-text-color="#ffd04b">
					<!-- 首页 -->
					<el-menu-item index="1">
						<router-link to="/">首页</router-link>
					</el-menu-item>

					

					<!--个人主页>-->
					<!-- < <el-menu-item index="5">
						<router-link to="/profile">个人主页</router-link>
						</el-menu-item> -->

						<!--账号设置>-->
						<!-- <el-menu-item index="6">
							<router-link to="/settings">账号设置</router-link>
						</el-menu-item> -->

						<!--退出登录>-->
						<el-menu-item index="7">
							<router-link to="/">退出注册</router-link>
						</el-menu-item>
				</el-menu>
			</div>
		</header>

		<!-- Content -->
		<div class="main">
			<div class="container pl-5 pr-5 pt-3 pb-3 mt-3 mb-3">
				<h3 class="text-center text-info border-bottom pb-3">注&nbsp;&nbsp;册</h3>
				<el-form :model="form" :rules="rules" ref="registerForm" label-width="80px" class="mt-5">
					<el-form-item label="账号" prop="username">
						<el-input v-model="form.username" placeholder="请输入您的账号"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input v-model="form.password" type="password" placeholder="请输入您的密码"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="confirmPassword">
						<el-input v-model="form.confirmPassword" type="password" placeholder="请再次输入密码"></el-input>
					</el-form-item>
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="form.email" type="email" placeholder="请输入您的邮箱"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="handleSubmit">立即注册</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';

export default {
	name: 'Register',
	setup() {
		const form = ref({
			username: '',
			password: '',
			confirmPassword: '',
			email: '',
		});

		const rules = {
			username: [
				{ required: true, message: '请输入账号', trigger: 'blur' },
				{ min: 3, message: '账号长度不能少于3位', trigger: 'blur' }
			],
			password: [
				{ required: true, message: '请输入密码', trigger: 'blur' },
				{ min: 8, message: '密码长度不能少于8位', trigger: 'blur' }
			],
			// 确认密码
			confirmPassword: [
				{ required: true, message: '请确认密码', trigger: 'blur' },
				{
					validator: (rule, value, callback) => {
						if (value !== form.value.password) {
							callback(new Error('两次输入的密码不一致'));
						} else {
							callback();
						}
					}, trigger: 'blur'
				}
			],
			email: [
				{ required: true, message: '请输入邮箱', trigger: 'blur' },
				{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
			]
		};

		const registerForm = ref(null);

		const handleSubmit = () => {
			registerForm.value.validate((valid) => {
				if (valid) {
					postData();
				} else {
					ElMessage.error('请修正表单中的错误!');
				}
			});
		};

		const postData = () => {
			axios
				.post('/register', form.value)
				.then((response) => {
					ElMessage.success('注册成功');
					console.log(response);
				})
				.catch((error) => {
					ElMessage.error('注册失败，请稍后重试');
					console.error(error);
				});
		};

		return {
			form,
			rules,
			registerForm,
			handleSubmit,
		};
	},
};
</script>

<style scoped>
/* Your styles here */
</style>