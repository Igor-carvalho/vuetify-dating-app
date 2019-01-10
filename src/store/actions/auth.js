import axios from 'axios'
import appConfig from '@/app.config.js'
import router from '@/router'

const API_BASE = appConfig.API_BASE

export default {
    login (context, { username, password, verification }) {
        return axios.post(API_BASE + '/auth/login', {
            username,
            password,
            verification
        }).then(response => {
            if (response.data.success && response.data.token) {
                context.commit('setToken', response.data.token)
            }

            return response
        })
    },

    resendActivationCode (context, { id }) {
        return axios.post(API_BASE + '/auth/resendActivationCode', {
            id
        }).then(response => {
            return response
        })
    },

    activate (context, { id, verification }) {
        return axios.post(API_BASE + '/auth/activate', {
            id,
            verification
        }).then(response => {
            if (response.data.success && response.data.token) {
                context.commit('setToken', response.data.token)
            }

            return response
        })
    },

    facebookLogin (context, payload) {
        return axios.post(API_BASE + '/auth/facebookLogin', payload)
        .then(response => {
            if (response.data.success && response.data.token) {
                context.commit('setToken', response.data.token)
            }

            return response
        })
    },

    googleLogin (context, payload) {
        return axios.post(API_BASE + '/auth/googleLogin', payload)
        .then(response => {
            if (response.data.success && response.data.token) {
                context.commit('setToken', response.data.token)
            }

            return response
        })
    },

    logout (context) {
        context.commit('clearUserData')

        router.push('login')
    },

    register (context, { username, password, password2, email }) {
        return axios.post(API_BASE + '/auth/register', {
            username,
            password,
            password2,
            email
        }).then(response => {
            if (response.data.success) {
                context.commit('setToken', response.data.token)
            }

            return response
        })
    },

    forgot (context, { username, email, mode }) {
        return axios.post(API_BASE + '/auth/forgot', {
            username,
            email,
            mode
        }).then(response => {
            return response
        })
    },

    verify (context, { id, verification }) {
        return axios.post(API_BASE + '/auth/verify', {
            id,
            verification
        }).then(response => {
            return response
        })
    },

    reset (context, { id, verification, password, password2 }) {
        return axios.post(API_BASE + '/auth/reset', {
            id,
            verification,
            password,
            password2
        }).then(response => {
            return response
        })
    }
}
