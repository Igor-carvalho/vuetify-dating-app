import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Aside from './components/Aside.vue'
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
            component: () => import('./views/FormView.vue')
        },
        {
            path: '/list/:id',
            name: 'listview',
            component: () => import('./views/ListView.vue')
        },
        {
            path: '/web/:id',
            name: 'webview',
            component: () => import('./views/WebView.vue')
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
    // const loggedIn = store.state.token
    const loggedIn = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImp0aSI6ImNsb3VkcGFkOS5jb20ifQ.eyJpc3MiOiJjbG91ZHBhZDkuY29tIiwianRpIjoiY2xvdWRwYWQ5LmNvbSIsImlhdCI6MTU0Njg2Mjc4OCwibmJmIjoxNTQ2ODYyNzg4LCJleHAiOjE1NDc3MjY3ODgsInVpZCI6IjViODdiZTU2MDA5MWZhN2RlMTBlOTViNiIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfQ.h5PxAEzQG2CG7XcL5r5U01bxnRzfWlFgikPFf1Cf6ww'
    store.commit('setToken', loggedIn)

    // console.log(!loggedIn)
    if (authRequired && !loggedIn) {
        return next('/login')
    }

    if (requiresNotAuthed && loggedIn) {
        return next('/')
    }

    next()
})

export default router
