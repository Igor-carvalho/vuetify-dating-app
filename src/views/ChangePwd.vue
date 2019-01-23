<template>
    <div>
        <v-toolbar
                absolute
                color="teal lighten-3"
                dark
                scroll-off-screen
                scroll-target="#scrolling-techniques"
                style="position: fixed"
        >
            <v-btn flat :to="'/settings'" class="ml-0 mr-0 pl-0 pr-0" style="min-width: 30px">
                <v-icon dark left>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title class="mr-0 ml-0 pl-0 pr-0 d-flex justify-center" style="width: 100%">
                Change password
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <div class="mr-0 ml-0 pl-0 pr-0" style="min-width: 35px;"></div>
        </v-toolbar>

        <div class="text-xs-center pt-3 pb-2">
            <h3>Please update a new password for your account</h3>
        </div>
        <v-flex xs12 sm6 offset-sm3 class="text-xs-center justify-center">
            <v-text-field
                    :append-icon="show1 ? 'visibility_off' : 'visibility'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-2"
                    label="Enter current password"
                    hint="At least 8 characters"
                    class="input-group--focused  ml-4 mr-4"
                    @click:append="show1 = !show1"
                    height="50"
            ></v-text-field>

            <v-text-field
                    :append-icon="show2 ? 'visibility_off' : 'visibility'"
                    :rules="[rules.required, rules.min]"
                    :type="show2 ? 'text' : 'password'"
                    name="input-10-2"
                    label="Enter new password"
                    hint="At least 8 characters"
                    class="input-group--focused ml-4 mr-4"
                    @click:append="show2 = !show2"
                    height="50"
            ></v-text-field>

            <v-text-field
                    :append-icon="show3 ? 'visibility_off' : 'visibility'"
                    :rules="[rules.required, rules.min]"
                    :type="show3 ? 'text' : 'password'"
                    name="input-10-2"
                    label="Confirm new password"
                    hint="At least 8 characters"
                    class="input-group--focused  ml-4 mr-4"
                    @click:append="show3 = !show3"
                    height="50"
            ></v-text-field>
        </v-flex>

        <div class="text-xs-center">
            <v-btn round color="teal" dark large class="title" style="width: 200px;height: 50px;text-transform: none">
                Update
            </v-btn>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show1: false,
                show2: false,
                show3: false,
                password: 'Password',
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                    emailMatch: () => ('The email and password you entered don\'t match')
                }
            }
        }
    }
</script>

<style>
    .v-text-field__slot input:focus {
        border: none;
    }
</style>
