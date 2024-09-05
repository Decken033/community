// api-config.js
const ip = 'http://192.168.189.193:8080/community/';

export default {
    user: {
        login: ip + 'login',
        logout: ip + 'logout',
        verifycode: ip + 'verifycode',
        header: ip + 'header',
        uploadavatar: ip + 'user/upload',
        changenickname: ip + 'user/changeName',
        changepassword: ip + 'user/changePassword'
    },
    school: {
        addschool: ip + 'school/addschool',
        schoollist: ip + 'school/schoollist',
        allschool: ip + 'school/allschool'
    },
    student: {
        addstudent: ip + 'student/addstudent',
        studentlist: ip + 'student/studentlist',
        allstudent: ip + 'student/allstudent'
    },
    comment: {},
    letter: {
        list: ip + 'letter/list'
    },
    notice: {
        list: ip + 'notice/list',
        detail: ip + 'notice/detail/like'
    },
    home: {
        index: ip + 'index'
    },
    discuss: {
        delete: ip + 'discuss/delete',
        add: ip + 'discuss/add',
    },
    profile: {
        user: ip + 'user/profile/'
    },
    follow: {
        follow: ip + 'follow',
        unfollow: ip + 'unfollow',
    }
};