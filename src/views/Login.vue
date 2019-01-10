<template>
    <div>
        <div class="app_header">
            <router-link class="logo" to="/">CloudPad9</router-link>
        </div>
        <div class="auth_wrapper">
            <div class="module padding_bottom">
                <div class="header">
                    <span>{{ $t('Log In to Your Account') }}</span>
                    <router-link to="register">{{ $t('Sign up?') }}</router-link>
                </div>
                <div class="google_row"><div @click="tryGoogleLogin" class="button-flat"><span>{{ $t('Continue with Google') }}</span></div></div>
                <div class="facebook_row"><div @click="tryFacebookLogin" class="button-flat"><span>{{ $t('Continue with Facebook') }}</span></div></div>
                <div class="break_row"><span>{{ $t('or with email') }}</span></div>
                <p v-if="message" :class="['group', error? 'error' : 'message']">{{ message }}</p>
                <form autocomplete="off" v-on:submit.prevent='submitForm'>
                    <div v-if="notActivated">
                        <p style="font-size:90%;margin-left: 16px;">{{ $t('Enter the activation code which is sent to the email address of your account') }}</p>
                        <div class="group">
                            <label>{{ $t('Activation code') }}</label>
                            <input type="text" v-model="verification" required autocomplete="off"/>
                        </div>
                        <p style="font-size:90%;margin-left: 16px;">{{ $t('Didn\'t receive the code?') }} <a href="#" @click="tryResendActivationCode">{{ $t('Re-send') }}</a></p>
                    </div>
                    <div class="group">
                        <label>{{ $t('Username') }}</label>
                        <input type="text" v-model="username" autocapitalize="none" required autocomplete="off"/>
                    </div>
                    <div class="group">
                        <label>{{ $t('Password') }}</label>
                        <input type="password" v-model="password" required autocomplete="new-password"/>
                    </div>
                    <div class="group">
                        <label></label>
                        <input type="submit" class="btn" :value="$t('Sign in and Continue')" :disabled='loading'/>
                    </div>
                    <div class="group">
                        <label></label>
                        <p class="c"><router-link to="forgot">{{ $t('Forgot username or password?') }}</router-link></p>
                    </div>
                </form>
                <spinner :show="loading"></spinner>
            </div>
        </div>
    </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue'
import { mapActions, mapGetters } from 'vuex'
import toast from '@/toast'

export default {
    name: 'login',
    components: {
        Spinner
    },
    data() {
        return {
            username: '',
            password: '',
            loading: false,
            error: false,
            message: '',
            notActivated: false,
            verification: '',
            uid: ''
        }
    },
    created(){
        this.message = this.$messages.consume('login')
    },
    methods: {
        ...mapActions(['login', 'resendActivationCode', 'facebookLogin', 'googleLogin']),

        submitForm() {
            this.loading = true

            const { username, password, verification } = this

            this.login({
                username,
                password,
                verification
            }).then(({data}) => {
                this.error = !data.success
                this.message = data.message

                if (data.token) {
                    this.$router.replace('/')
                }

                if (data.uid) {
                    this.uid = data.uid
                }

                this.notActivated = data.error == 'not_activated'
            }).finally(() => {
                this.loading = false
            })
        },

        tryResendActivationCode() {
            this.loading = true

            const { uid } = this

            this.resendActivationCode({
                id: uid
            }).then(({data}) => {
                this.error = !data.success
                this.message = data.message
            }).finally(() => {
                this.loading = false
            })
        },

        tryFacebookLogin() {
            this.loading = true

            this.$fb.login(response => {
                if (response.status === 'connected') {
                    this.facebookLogin(response.authResponse)
                    .then(({data}) => {
                        this.error = !data.success
                        this.message = data.message

                        if (data.token) {
                            this.$router.replace('/')
                        }

                    }).finally(() => {
                        this.loading = false
                    })
                }
            }, {scope: 'public_profile,email'});
        },

        tryGoogleLogin() {
            this.$google.signIn().then(() => {
                var googleUser = this.$google.currentUser.get();
                var profile = googleUser.getBasicProfile();

                var id_token = googleUser.getAuthResponse().id_token;
                var id = profile.getId();
                var name = profile.getName();
                var email = profile.getEmail();
                var image = profile.getImageUrl();

                this.googleLogin({id_token: id_token, id: id, name: name, email: email, image: image})
                .then(({data}) => {
                    this.error = !data.success
                    this.message = data.message

                    if (data.token) {
                        this.$router.replace('/')
                    }
                }).finally(() => {
                    this.loading = false
                })
            })
        }
    }
}
</script>
