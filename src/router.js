import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Aside from './components/Aside.vue'
import ListView from './views/ListView.vue'
import store from '@/store'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: Aside
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/Login.vue'),
            meta: { isPublic: true, requiresNotAuthed: true }
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('./views/Register.vue'),
            meta: { isPublic: true, requiresNotAuthed: true }
        },
        {
            path: '/forgot',
            name: 'forgot',
            component: () => import('./views/ForgotPassword.vue'),
            meta: { isPublic: true, requiresNotAuthed: true }
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('./views/About.vue')
        },
        {
            path: '/search',
            name: 'search',
            component: () => import('./views/ProfileSearch.vue')
        },
        {
            path: '/profile/:user_id',
            name: 'profile',
            component: () => import('./views/ProfileView.vue')
        },
        {
            path: '/itemslist',
            name: 'itemslist',
            component: () => import('./views/ListView.vue')
        },
        {
            path: '/itemslist/new',
            name: 'newitem',
            component: () => import('./views/FormView.vue')
        },
        {
            path: '/form/:id',
            name: 'formveiw',
            component: () => import('./views/FormView.vue'),
        },
        {
            path: '/list/:id',
            name: 'listview',
            component: ListView
        },
        {
            path: '/web',
            name: 'webview',
            component: () => import('./views/WebView.vue')
        },
        {
            path: '/settings',
            name: 'sSettings',
            component: () => import('./views/Settings.vue')
        },
        {
            path: '/profile',
            name: 'account',
            component: () => import('./views/ProfileView.vue')
        },
        {
            path: '/changepwd',
            name: 'changepwd',
            component: () => import('./views/ChangePwd.vue')
        },
        {
            path: '/changelang',
            name: 'changelang',
            component: () => import('./views/ChangeLang.vue')
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})

router.beforeEach((to, from, next) => {
    const isPublic = to.meta && to.meta.isPublic
    const requiresNotAuthed = to.meta && to.meta.requiresNotAuthed
    const authRequired = !isPublic
    const loggedIn = store.state.token
    store.commit('setToken', loggedIn)

    if (authRequired && !loggedIn) {
        return next('/login')
    }

    if (requiresNotAuthed && loggedIn) {
        return next('/')
    }

    next()
})

export default router
