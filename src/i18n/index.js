import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from './en'
import vi from './vi'

Vue.use(VueI18n)

const messages = {
    en: en,
    vi: vi
}

const i18n = new VueI18n({
    locale: 'vi',
    fallbackLocale: 'en',
    messages
})

export default i18n
