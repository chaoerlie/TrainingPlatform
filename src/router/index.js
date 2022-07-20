import {createRouter,createWebHistory} from "vue-router"
import login from '/src/components/login.vue'
import index from '/src/components/index.vue'
import admin from '/src/components/admin/admin.vue'
import student from '/src/components/student/student.vue'
import engineer from '/src/components/engineer/engineer.vue'
import teacher from '/src/components/teacher/teacher.vue'
import member from "../components/admin/member.vue"
import myInfo from "../components/myInfo.vue";
import classInfo from '../components/admin/classInfo.vue'
import classAssign from '../components/admin/classAssign.vue'
import project from  '../components/project.vue'
import newTranning from '../components/admin/newTrainning.vue'
import groupAssign from '../components/engineer/groupAssign.vue'
import groupinfo from '../components/engineer/groupinfo.vue'
import teachingPlan from '../components/engineer/teachingPlan.vue'
import engLeave from "../components/engineer/engLeave.vue";
import stuLeave from "../components/student/stuLeave.vue";
import teaLeave from "../components/teacher/teaLeave.vue";
import attendance from "../components/engineer/attendance.vue"
import teateachingPlan from "../components/teacher/teachingPlan.vue"
import stuteachingPlan from "../components/student/teachingPlan.vue"
import homework from "../components/engineer/homework.vue";
import teachingPlan2 from "../components/engineer/teachingPlan2.vue";
import stuAtt from  "../components/student/attendance.vue"
const routes = [
    {
        path:"/",
        name:'login',
        component: login,
    },
    {
        path:"/admin",
        name:'admin',
        component: admin,
        children: [
            {
                path: 'member',
                component: member
            },
            {
                path: 'teachingPlan',
                component: teachingPlan
            },
            {
                path: 'myInfo',
                component: myInfo
            },
            {
                path: 'classInfo',
                component: classInfo
            },
            {
                path:'classAssign',
                component: classAssign
            },
            {
                path:'project',
                component: project
            },
            {
                path:'newTraining',
                component: newTranning
            }

        ]
    },
    {
        path:"/student",
        name:'student',
        component: student,
        children: [
            {
                path: 'index',
                component: index
            }, {
                path: 'teachingPlan',
                component: stuteachingPlan
            },{
                path: 'project',
                component: project
            },{
                path: 'leave',
                component: stuLeave
            },
            {
                path: 'myInfo',
                component: myInfo
            },


        ]
    },
    {
        path:"/teacher",
        name:'teacher',
        component: teacher,
        children: [
            {
                path: 'teachingPlan',
                component: teateachingPlan
            },
            {
                path:'classInfo',
                component: classInfo
            },
            {
                path: 'leave',
                component: teaLeave
            }

        ]

    },
    {
        path:"/engineer",
        name:'engineer',
        component: engineer,
        children: [
            {
                path: 'groupAssign',
                component: groupAssign
            },{
                path: 'groupinfo',
                component: groupinfo
            },{
                path: 'homework',
                component: homework
            },{
                path: 'leave',
                component: engLeave
            },{
                path: 'teachingPlan',
                component: teachingPlan2
            },
            {
                path: 'attendance',
                component: attendance
            }


        ]

    },

];

const router = createRouter({
    history:createWebHistory(),
    routes:routes
});


export default router;
