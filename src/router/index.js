import { createRouter, createWebHistory ,createWebHashHistory} from "vue-router";

//导入组件
import LoginVue from '@/views/Login.vue'
import LayoutVue from "@/views/Layout.vue";
import { componentSizes } from "element-plus";
import Servers from "@/views/server/Servers.vue";
import UploadZipFile from "@/views/server/UploadZipFile.vue";
import Bot from "@/views/bot/Bot.vue"
import UserManage from "@/views/user/UserManage.vue"

//定义路由关系
const routes = [
    { path: '/login', component: LoginVue },
    {
        path: '/', component: LayoutVue, redirect: '/server/servers', children: [
            {
                path: '/server/servers', component: Servers, children: [
                   
                ]
            },
            { path: '/server/uploadzipfile', component: UploadZipFile },
            // {path:'/user/info',component:UserInfo},
            // {path:'/user/avatar',component:UserAvatar},
            // {path:'/user/resetPassword',component:UserResetPassword},
            { path: '/bot/bot', component: Bot },
            { path: '/user/manage', component: UserManage },

        ]
    }
]

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

//导出路由
export default router

