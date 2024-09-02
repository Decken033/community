// api-config.js
const ip = 'http://localhost:8080/community/';

export default {
    user:{
        login:ip+'login',
        verifycode:ip+'verifycode',
        header:ip+'header',
        uploadavatar:ip+'user/upload',
        changenickname:ip+'user/changeName',
        changepassword:ip+'user/changePassword'
    },
    school:{
        addschool:ip+'school/addschool',
        schoollist:ip+'school/schoollist',
        allschool:ip+'school/allschool'
    },
    student:{
        addstudent:ip+'student/addstudent',
        studentlist:ip+'student/studentlist',
        allstudent:ip+'student/allstudent'
    },
    comment:{

    }
};