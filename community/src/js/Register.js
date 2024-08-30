import {defineAsyncComponent, ref} from "vue";
import {useRouter} from "vue-router";
import {useCommonTranslations} from "@/lang/i18nhelper.js";
import {useI18n} from "vue-i18n";
import axios from "axios";
import {ElMessage} from "element-plus";

export default {

    setup() {

        // 定义异步组件particlesidebar
        const isLoaded = ref(false);
        const ParticleSidebar = defineAsyncComponent(() =>
            import('@/codepen/ParticleSidebar.vue').then((component) => {
                isLoaded.value = true;
                return component;
            })
        );

        const form = ref({
            username: '',
            password: '',
            code: '',
            rememberMe: false,
        });
        //加入返回按钮

        const router = useRouter();

        // const handleBack = () => {
        //     // router.push('/');
        //     window.location.href = '/';
        // };
        const kaptchaSrc = ref('/kaptcha');
        const translations = useCommonTranslations();

        const { t, locale } = useI18n({ useScope: "global" });
        const selectedLanguage = ref('zh');
        const changeLanguage = () => {
            locale.value = selectedLanguage.value;
        };

        const rules = {
            username: [
                { required: true, message: t('message.enterUsername'), trigger: 'blur' },
            ],
            password: [
                { required: true, message: t('message.enterPassword'), trigger: 'blur' },
                { min: 8, message: t('message.passwordLength'), trigger: 'blur' },
            ],
            code: [
                { required: true, message: t('message.enterCode'), trigger: 'blur' },
            ],
        };


        // const loginForm = ref(null);

        const refreshKaptcha = () => {
            kaptchaSrc.value = `/kaptcha?${new Date().getTime()}`;
        };

        const handleSubmit = () => {
            loginForm.value.validate((valid) => {
                if (valid) {
                    postData();
                } else {
                    console.log('表单验证失败');
                    return false;
                }
            });
        };

        const postData = () => {
            axios
                .post('/login', form.value)
                .then((response) => {
                    console.log("登录成功");
                    ElMessage.success(t('message.loginSuccess'));
                })
                .catch((error) => {
                    console.error('登录失败:', error);
                    ElMessage.error(t('message.loginFailed'));
                });
        };

        return {
            form,
            rules,
            kaptchaSrc,
            loginForm,
            refreshKaptcha,
            handleSubmit,
            translations,
            selectedLanguage,
            changeLanguage,
            handleBack,
            ParticleSidebar,
        };
    },
};