import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export function useCommonTranslations() {
  const { t } = useI18n();

  // 使用 computed 来确保翻译内容在语言切换时自动更新
  const home = computed(() => t('message.home'));
  const news = computed(() => t('message.news'));
  const register = computed(() => t('message.register'));
  const login = computed(() => t('message.login'));
  const post = computed(() => t('message.post'));
  const latest = computed(() => t('message.latest'));
  const hottest = computed(() => t('message.hottest'));
  const like = computed(() => t('message.like'));
  const reply = computed(() => t('message.reply'));
  const profile = computed(() => t('message.profile'));
  const accountSettings = computed(() => t('message.accountSettings'));
  const search = computed(() => t('message.search'));
  const publish = computed(() => t('message.publish'));

  const enterUsername = computed(() => t('message.enterUsername'));
  const enterPassword = computed(() => t('message.enterPassword'));
  const passwordLength = computed(() => t('message.passwordLength'));
  const enterCode = computed(() => t('message.enterCode'));
  const loginSuccess = computed(() => t('message.loginSuccess'));
  const loginFailed = computed(() => t('message.loginFailed'));
  const settings = computed(() => t('message.settings'));

  return {
    home,
    news,
    register,
    login,
    post,
    latest,
    hottest,
    like,
    reply,
    profile,
    accountSettings,
    search,
    publish,
    t, // 如果你还需要动态使用 `t` 函数
    enterUsername,
    enterPassword,
    passwordLength,
    enterCode,
    loginSuccess,
    loginFailed,
    settings,
  };
}
