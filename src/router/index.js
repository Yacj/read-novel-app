import {createRouter, createWebHashHistory} from 'vue-router'
import {getToken, isLogin} from "../utils/auth";
import {Toast} from "vant";

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/home/index.vue'),
        meta: {
            title: '首页',
            keepAlive: true
        }
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('../views/search/index.vue'),
        meta: {
            title: '搜索'
        }
    },
    {
        path: '/search/list',
        name: 'searchList',
        component: () => import('../views/search/list.vue'),
        meta: {
            title: '搜索列表'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/user/login.vue'),
        meta: {
            title: '用户登录'
        }
    },
    {
        path: '/user',
        name: 'user',
        component: () => import('../views/user/index.vue'),
        meta: {
            title: '用户中心',
            needLogin: true,
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach((to, form, next) => {
    const {title, needLogin} = to.meta
    if (title) {
        document.title = title
    }
    if (needLogin && !isLogin()) {
        Toast.fail('暂未登录，请登录后再试')
        next('login')
        return
    }
    next()
})
export default router