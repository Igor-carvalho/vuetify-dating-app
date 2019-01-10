export default {
    install(Vue, options) {
        window.googleAsyncInit = function() {
            gapi.load('auth2', function(){
                Vue.prototype.$google = gapi.auth2.init(options)
            })
        };

        // Load the SDK asynchronously
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://apis.google.com/js/platform.js?onload=googleAsyncInit";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'google-jssdk'));
    }
}
