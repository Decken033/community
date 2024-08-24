<template>
	<el-container>
		<!-- Header -->
		<el-header>
			<el-menu class="el-menu-demo" mode="horizontal">
				<!-- 首页 -->
				<el-menu-item index="1">
					<router-link to="/">{{ translations.home }}</router-link>
				</el-menu-item>

				<!-- 消息 -->
				<el-menu-item index="2">
					<router-link to="/letter">{{ translations.news }}</router-link>
					<el-badge :value="12" class="item" />
				</el-menu-item>

				<!-- 注册 -->
				<el-menu-item index="3">
					<router-link to="/register">{{ translations.register }}</router-link>
				</el-menu-item>

				<!-- 登录 -->
				<el-menu-item index="4">
					<router-link to="/login">{{ translations.login }}</router-link>
				</el-menu-item>


				<!-- 个人主页 -->
				<el-menu-item index="5">
					<router-link to="/profile">{{ translations.profile }}</router-link>
				</el-menu-item>

				<!-- 账号设置 -->
				<el-menu-item index="7">
					<router-link to="/settings">{{ translations.accountSettings }}</router-link>
				</el-menu-item>

				<!-- 搜索 -->
				<el-menu-item index="8">
					<el-input v-model="searchQuery" @keyup.enter="search" />
					<el-button @click="search" type="primary">{{ translations.search }}</el-button>
				</el-menu-item>

				<el-menu-item index="9">
					<el-button type="primary" class="float-right" @click="openPublishModal">{{ translations.publish
						}}</el-button>
				</el-menu-item>

				<el-menu-item index="10">
					<el-select v-model="selectedLanguage" @change="changeLanguage" placeholder="Select Language">
						<el-option label="English" value="en"></el-option>
						<el-option label="中文" value="zh"></el-option>
						<el-option label="Español" value="sp"></el-option>
					</el-select>
				</el-menu-item>



			</el-menu>
		</el-header>

		<!-- Content -->
		<el-main>

			<el-form :model="form" :rules="rules" ref="registerForm" label-width="80px" class="mt-5">
				<el-form-item label="账号" prop="username">
					<el-input v-model="form.username" class="form-input" placeholder="请输入您的账号"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="form.password" type="password" class="form-input"
						placeholder="请输入您的密码"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="confirmPassword">
					<el-input v-model="form.confirmPassword" type="password" class="form-input"
						placeholder="请再次输入密码"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<div class="email-wrapper">
						<el-input v-model="form.email" type="email" class="form-input" placeholder="请输入您的邮箱"></el-input>
						<el-button type="primary" class="send-code-btn" @click="sendEmail">发送验证码</el-button>
					</div>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleSubmit">立即注册</el-button>
				</el-form-item>
			</el-form>


		</el-main>

	</el-container>
</template>

<script>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import { useCommonTranslations } from '@/lang/i18nhelper';
import { useI18n } from 'vue-i18n';



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


		const translations = useCommonTranslations();

		const { t, locale } = useI18n({ useScope: "global" });
		const selectedLanguage = ref('zh');
		const changeLanguage = () => {
			locale.value = selectedLanguage.value;
		};

		const searchQuery = ref('');
		const search = () => {
			console.log('Search query:', searchQuery.value);
		};


		return {
			form,
			rules,
			registerForm,
			handleSubmit,
			postData,
			translations,
			t,
			locale,
			selectedLanguage,
			changeLanguage,
			searchQuery,
			search
		};
	},


};
</script>

<style>
.el-header {
	background-color: #f0f0f0;
}

.el-container {
	background-color: rgb(230, 124, 18);
}

.el-main {
	background-color: rgb(244, 247, 236);
	padding-top: 0px;
}


.el-menu-demo {
	/* display: flex; */
	justify-content: space-between;
	align-items: center;
	/* width: 100%; */
}

.el-tabs {
	width: 300px;
	max-width: 100%;

	margin-top: auto;
	margin-bottom: auto;

	padding-top: 0;
	padding: 0px;
	height: auto;
}

.form-input {
  width: 40%; /* 或者设置为具体的宽度，如 300px */
}

.email-wrapper {
	display: flex;
	align-items: center;
}

.send-code-btn {
	margin-left: 100px;
	/* 控制按钮与输入框之间的距离 */
}
</style>