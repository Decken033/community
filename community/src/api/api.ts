// api-config.js
const ip = 'http://localhost:8080/community/';

export default {
    user:{
        login:ip+'login',
        verifycode:ip+'verifycode',
        header:ip+'header',
        uploadavatar:ip+'uploadavatar',
        changenickname:ip+'changenickname',
        changepassword:ip+'changepassword'
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

    },
    letter:{
        list:ip+'letter/list'
    }
};