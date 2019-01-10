<template>
    <div>
        <div class="app_header">
            <router-link class="logo" to="/">CloudPad9</router-link>
        </div>
        <div class="auth_wrapper">
            <div class="module padding_bottom">
                <div class="header">
                    <span>{{ $t('Reset Your Password') }}</span>
                    <router-link to="/login">{{ $t('Log in?') }}</router-link>
                </div>
                <p v-if="message" :class="['group', error? 'error' : 'message']">{{ message }}</p>
                <form v-if="!uid" v-on:submit.prevent='submitForgot'>
                    <div class="has-radio">
                        <input v-model="mode" id="radio_1" type="radio" value="username">
                        <label for="radio_1">{{ $t('I know my username') }}</label>
                        <p class="group" v-if="mode=='username'">
                            {{ $t('Enter your username and we will send a link to reset your password to the email address on file.') }}
                        </p>
                        <div class="group" v-if="mode=='username'">
                            <input type="text" v-model="username" autocapitalize="none" placeholder="Username" autocomplete="off"/>
                        </div>
                    </div>
                    <div class="has-radio">
                        <input v-model="mode" id="radio_2" type="radio" value="email">
                        <label for="radio_2">{{ $t('I know my email address') }}</label>
                        <p class="group" v-if="mode=='email'">
                            {{ $t('Enter your account email address and we will send you a link to reset your password.') }}
                        </p>
                        <div class="group" v-if="mode=='email'">
                            <input type="text" v-model="email" autocomplete="off" autocapitalize="none" placeholder="Email"/>
                        </div>
                    </div>
                    <div class="group">
                        <input type="submit" name="btn" class="btn" :value="$t('Continue')" :disabled="loading"/>
                    </div>
                </form>
                <form v-if="uid && !verified" v-on:submit.prevent='submitVerify'>
                    <div class="group">
                        <label>{{ $t('Verification code') }}</label> <input type="text" v-model="verification" required autocomplete="off"/>
                    </div>
                    <div class="group">
                        <input type="submit" class="btn" :value="$t('Continue')" :disabled="loading"/>
                    </div>
                    <div class="group">
                        <p style="font-size:90%">Didn't receive the code? <a href="#" @click="submitForgot">{{ $t('Re-send') }}</a></p>
                    </div>
                </form>
                <form v-if="uid && verified" v-on:submit.prevent='submitReset'>
                    <div class="group">
                        <label>{{ $t('New password') }}</label> <input type="password" v-model="password" required autocomplete="new-password"/>
                    </div>
                    <div class="group">
                        <label>{{ $t('Confirm password') }}</label>
                        <input type="password" v-model="password2" autocomplete="new-password" required/>
                    </div>
                    <div class="group">
                        <input type="submit" class="btn" :value="$t('Reset Password')" :disabled="loading"/>
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
    name: 'forgot',
    components: {
        Spinner
    },
    data() {
        return {
            username: '',
            email: '',
            uid: '',
            mode: 'username',
            loading: false,
            error: false,
            message: '',
            verification: '',
            verified: false,
            password: '',
            password2: ''
        }
    },
    methods: {
        ...mapActions(['forgot', 'reset', 'verify']),
        submitForgot() {
            this.loading = true
            this.verification = ''

            const { username, email, mode } = this

            this.forgot({
                username,
                email,
                mode
            }).then(({data}) => {
                this.error = !data.success
                this.message = data.message

                this.uid = data.uid
            }).finally(() => {
                this.loading = false
            })
        },
        submitVerify() {
            this.loading = true

            const { uid, verification } = this

            this.verify({
                id: uid,
                verification
            }).then(({data}) => {
                this.error = !data.success
                this.message = data.message

                if (data.success) {
                    this.verified = true
                }
            }).finally(() => {
                this.loading = false
            })
        },
        submitReset() {
            this.loading = true

            const { uid, verification, password, password2 } = this

            this.reset({
                id: uid,
                verification,
                password,
                password2
            }).then(({data}) => {
                if (data.success) {
                    this.$messages.push('login', data.message)
                    this.$router.push('login')
                } else {
                    this.error = true
                    this.message = data.message
                }
            }).finally(() => {
                this.loading = false
            })
        }
    }
}
</script>
