import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

import HomeView from '../views/HomeView.vue'

import AddStudent from '../views/student/AddStudent.vue'
import StudentList from '../views/student/StudentList.vue'

import AddSchool from '../views/school/AddSchool.vue'
import SchoolList from '../views/school/SchoolList.vue'

import AddAgent from '../views/agent/AddAgent.vue'
import AgentList from '../views/agent/AgentList.vue'

import AddRecord from '../views/record/AddRecord.vue'
import RecordList from '../views/record/RecordList.vue'

import Result from '../views/search/Result.vue'
import Detail from '../views/search/Detail.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },

    // student
    {
      path: '/addstudent',
      name: 'addstudent',
      component: AddStudent
    },
    {
      path: '/studentlist',
      name: 'studentlist',
      component: StudentList
    },

    // school
    {
      path: '/addschool',
      name: 'addschool',
      component: AddSchool
    },
    {
      path: '/schoollist',
      name: 'schoollist',
      component: SchoolList
    },
     // agent
     {
      path: '/addagent',
      name: 'addagent',
      component: AddAgent
    },
    {
      path: '/agentlist',
      name: 'agentlist',
      component: AgentList
    },   
    // record
    {
      path: '/addrecord',
      name: 'addrecord',
      component: AddRecord
    },
    {
      path: '/recordlist',
      name: 'recordlist',
      component: RecordList
    },    
    // search
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/result',
      name: 'result',
      component: Result
    },
  ]
})

export default router
