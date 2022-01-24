import {createRouter, createWebHashHistory} from 'vue-router'
import {getToken} from "../utils/auth";

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        redirect: '/home/male',
        component: () => import('../views/home/index.vue'),
        meta: {
            title: '首页',
            keepAlive: true
        },
        children: [
            {
                path: '/home/female',
                component: () => import('../views/home/female.vue')
            },
            {
                path: '/home/male',
                component: () => import('../views/home/male.vue')
            },
            {
                path: '/home/picture',
                component: () => import('../views/home/picture.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach((to, form, next) => {
    const {title, isLogin} = to.meta
    const token = getToken()
    if (title) {
        document.title = title
    }
    if (isLogin && !token) {
        next('login')
        return
    }
    next()
})
export default router