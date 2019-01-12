import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import auth from './plugins/auth'
import fb from './plugins/fb'
import google from './plugins/google'
import messages from './plugins/messages'
import Vuetify from 'vuetify'
import VueAnalytics from 'vue-analytics'

import 'vuetify/dist/vuetify.min.css'

import '@/assets/app.css'

Vue.config.productionTip = false

Vue.use(Vuetify)

Vue.use(auth)

Vue.use(require('vue-moment'));

Vue.use(fb, {
    appId            : '169849697193499',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v3.2'
})

Vue.use(google, {
    client_id: '313730714044-5d72rshrhaoqau05fk5b0cu8rec2paka.apps.googleusercontent.com',
    cookiepolicy: 'single_host_origin',
    // Request scopes in addition to 'profile' and 'email'
    //scope: 'additional_scope'
})

Vue.use(messages)

Vue.use(VueAnalytics, {
    id: 'UA-111896817-1',
    checkDuplicatedScript: true,
    router
})

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
