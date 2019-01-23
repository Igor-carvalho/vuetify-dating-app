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
            <!--<img :src="" width="30" height="30">-->

            <v-toolbar-title class="ml-5">Settings</v-toolbar-title>

            <v-spacer></v-spacer>
        </v-toolbar>

        <div style="margin-top:65px; max-height: calc( 100vh - 120px);height: calc( 100vh - 120px);width: 100%">

            <v-list >
                <v-divider></v-divider>
                <v-list-tile :to="'/profile'">
                    <v-list-tile-avatar  class="flex align-center justify-center">
                        <v-icon>person</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-title >Profile</v-list-tile-title>
                    <v-list-tile-action>
                        <v-icon >keyboard_arrow_right</v-icon>
                    </v-list-tile-action>
                </v-list-tile>

                <v-divider></v-divider>
                <v-list-tile  :to="'/changelang'">
                    <v-list-tile-avatar  class="flex align-center justify-center">
                        <v-icon>translate</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-title >Change language</v-list-tile-title>
                    <v-list-tile-action>
                        <v-icon >keyboard_arrow_right</v-icon>
                    </v-list-tile-action>
                </v-list-tile>

                <v-divider></v-divider>
                <v-list-tile  :to="'/changepwd'">
                    <v-list-tile-avatar  class="flex align-center justify-center">
                        <v-icon>vpn_key</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-title >Change password</v-list-tile-title>
                    <v-list-tile-action>
                        <v-icon >keyboard_arrow_right</v-icon>
                    </v-list-tile-action>
                </v-list-tile>

                <v-divider></v-divider>
                <v-list-tile  @click="logout()">
                    <v-list-tile-avatar  class="flex align-center justify-center">
                        <v-icon>power_settings_new</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-title >Sign Out</v-list-tile-title>
                </v-list-tile>
                <v-divider></v-divider>
            </v-list>

        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    computed:{
        ...mapState(['connections', 'profile', 'expectation']),
    },
    created: function () {
    },
    methods: {
        ...mapActions(['loadUserData']),
        logout() {
            this.$store.state.token = '';
            this.$router.push('/login')
        }
    }
}
</script>
