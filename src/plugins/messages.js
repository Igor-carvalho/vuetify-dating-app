const messages = {}

export default {
    push: function (key, message) {
        messages[key] = message
    },

    consume: function (key) {
        var message = messages[key]

        messages[key] = ''

        return message
    },

    install(Vue, options) {
        Vue.prototype.$messages = this
    }
}
