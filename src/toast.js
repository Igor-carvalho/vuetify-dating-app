import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

// REF: http://izitoast.marcelodolce.com/#Options
iziToast.settings({
    timeout: 3000,
    resetOnHover: true,
    transitionIn: 'fadeInDown',
    transitionOut: 'fadeOutUp',
    transitionInMobile: 'fadeInDown',
    transitionOutMobile: 'fadeOutUp',
    position: 'topCenter',
    progressBar: false,
    icon: ''
})

export default {
    info: function(message) {
        iziToast.info({
            title: 'Info',
            message: message
        })
    },

    success: function(message) {
        iziToast.success({
            title: 'OK',
            message: message
        })
    },

    error: function(message) {
        iziToast.error({
            title: 'Error',
            message: message
        })
    }
}
