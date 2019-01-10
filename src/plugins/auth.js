import axios from 'axios'

import store from '@/store'
import router from '@/router'

export default {
    install(Vue, options) {
        axios.interceptors.request.use((config) => {
            const token = store.state.token
            const hasAuthHeader = config.headers.Authorization

            if (token && !hasAuthHeader) {
                config.headers.Authorization = `Bearer ${token}`
            }

            return config
        })

        axios.interceptors.response.use(response => {
            return response
        }, err => {
            if (err.response && err.response.status & err.response.status === 401) {
                store.commit('clearUserData')
            }

            return Promise.reject(err)
        })

        Vue.prototype.$auth = Vue.auth = this
    }
}
