import {computed} from 'vue';
import {useI18n} from 'vue-i18n';

export function useCommonTranslations() {
    const {t} = useI18n();

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
  const followees = computed(() => t('message.followees'));
  const followers = computed(() => t('message.followers'));
  const notification = computed(() => t('message.notification'));
  const publishtime = computed(() => t('message.publishtime'));
  const friendmessage = computed(() => t('message.friendmessage'));
  const videochat = computed(() => t('message.videochat'));
  const from = computed(() => t('message.from'));
  const privateMessage = computed(() => t('message.privateMessage'));
  const back = computed(() => t('message.back'));
  const sendMessageTo = computed(() => t('message.sendMessageTo'));
  const cancel = computed(() => t('message.cancel'));
  const send = computed(() => t('message.send'));
  const sendTo = computed(() => t('message.sendTo'));
  const content = computed(() => t('message.content'));
  const hint = computed(() => t('message.hint'));
  const sentSuccessfully = computed(() => t('message.sentSuccessfully'));
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
    followees,
    followers,
    notification,
    publishtime,
    friendmessage,
    videochat,
    from,
    privateMessage,
    back,
    sendMessageTo,
    cancel,
    send,
    sendTo,
    content,
    hint,
    sentSuccessfully
  };

    const enterUsername = computed(() => t('message.enterUsername'));
    const enterPassword = computed(() => t('message.enterPassword'));
    const passwordLength = computed(() => t('message.passwordLength'));
    const enterCode = computed(() => t('message.enterCode'));
    const loginSuccess = computed(() => t('message.loginSuccess'));
    const loginFailed = computed(() => t('message.loginFailed'));
    const settings = computed(() => t('message.settings'));
    const followees = computed(() => t('message.followees'));
    const followers = computed(() => t('message.followers'));
    const notification = computed(() => t('message.notification'));
    const publishtime = computed(() => t('message.publishtime'));
    const friendmessage = computed(() => t('message.friendmessage'));

    // settings
    const nickname = computed(() => t('message.nickname'));
    const enterNickname = computed(() => t('message.enterNickname'));
    const originalPassword = computed(() => t('message.originalPassword'));
    const enterOriginalPassword = computed(() => t('message.enterOriginalPassword'));
    const newPassword = computed(() => t('message.newPassword'));
    const enterNewPassword = computed(() => t('message.enterNewPassword'));
    const confirmPassword = computed(() => t('message.confirmPassword'));
    const enterConfirmPassword = computed(() => t('message.enterConfirmPassword'));
    const seletcAvatar = computed(() => t('message.seletcAvatar'));
    const uploadnow = computed(() => t('message.uploadnow'));


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
        followees,
        followers,
        notification,
        publishtime,
        friendmessage,
        nickname,
        enterNickname,
        originalPassword,
        enterOriginalPassword,
        newPassword,
        enterNewPassword,
        confirmPassword,
        enterConfirmPassword,
        seletcAvatar,
        uploadnow,
    };

}
