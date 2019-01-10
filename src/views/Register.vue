<template>
    <div>
        <div class="app_header">
            <router-link class="logo" to="/">CloudPad9</router-link>
        </div>
        <div class="auth_wrapper">
            <div class="module padding_bottom">
                <div class="header">
                    <span>{{ $t('Create an Account') }}</span>
                    <router-link to="login">{{ $t('Log in?') }}</router-link>
                </div>
                <p v-if="message" :class="['group', error? 'error' : 'message']">{{ message }}</p>
                <form v-if="!uid" autocomplete="off" v-on:submit.prevent="submitRegistration">
                    <div class="group">
                        <label>{{ $t('Username') }}</label>
                        <input type="text" v-model="username" autocapitalize="none" autocomplete="off" required/>
                    </div>
                    <p class="group">
                        {{ $t('Passwords should contains at least 6 characters') }}
                    </p>
                    <div class="group">
                        <label>{{ $t('Password') }}</label>
                        <input type="password" v-model="password" autocomplete="new-password" required/>
                    </div>
                    <div class="group">
                        <label>{{ $t('Confirm password') }}</label>
                        <input type="password" v-model="password2" autocomplete="new-password" required/>
                    </div>
                    <p class="group">
                        {{ $t('Specify an email address to recover your account in case you forgot your username or password') }}
                    </p>
                    <div class="group">
                        <label>{{ $t('Email') }}</label>
                        <input type="text" v-model="email" autocomplete="off" autocapitalize="none" required/>
                    </div>
                    <div class="group">
                        <label></label>
                        <input type="submit" class="btn" :value="$t('Create Account and Continue')" :disabled="loading"/>
                    </div>
                </form>
                <form v-if="uid" v-on:submit.prevent='tryActivate'>
                    <div class="group">
                        <label>{{ $t('Activation code') }}</label> <input type="text" v-model="verification" required autocomplete="off"/>
                    </div>
                    <div class="group">
                        <input type="submit" class="btn" :value="$t('Continue')" :disabled="loading"/>
                    </div>
                    <div class="group">
                        <p style="font-size:90%">Didn't receive the code? <a href="#" @click="tryResendActivationCode">{{ $t('Re-send') }}</a></p>
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
    name: 'register',
    components: {
        Spinner
    },
    data() {
        return {
            username: '',
            password: '',
            password2: '',
            email: '',
            loading: false,
            error: false,
            message: '',
            uid: '',
            verification: '',
            verified: false
        }
    },
    methods: {
        ...mapActions(['register', 'resendActivationCode', 'activate']),
        submitRegistration() {
            this.loading = true

            const { username, password, password2, email } = this

            this.register({
                username,
                password,
                password2,
                email
            }).then(({data}) => {
                this.error = !data.success
                this.message = data.message

                if (data.uid) {
                    this.uid = data.uid
                }
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
        tryActivate() {
            this.loading = true

            const { uid, verification } = this

            this.activate({
                id: uid,
                verification
            }).then(({data}) => {
                this.error = !data.success
                this.message = data.message

                if (data.token) {
                    this.$router.replace('/')
                }
            }).finally(() => {
                this.loading = false
            })
        }
    }
}
</script>
