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
                Profile
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <div class="mr-0 ml-0 pl-0 pr-0" style="min-width: 35px;"></div>
        </v-toolbar>

        <v-flex
                xs12
                sm6
                md6
                offset-sm3
                offset-md3
                align-center
                justify-center
                layout
                text-xs-center
                class="pt-4"
        >
            <v-avatar size="150" color="grey lighten-4">
                <img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" alt="avatar">
            </v-avatar>
        </v-flex>

        <v-flex
                xs12
                sm6
                offset-sm3
                align-center
                justify-center
                text-xs-center
                class="pt-4"
        >
            <div class="mb-4">
                <h1>Susan Rose</h1>
                <h3>Agent Manager</h3>
            </div>
            <v-list two-line>
                    <template>
                        <v-subheader inset class="mt-2"><h2>PERSONAL</h2></v-subheader>
                        <v-divider></v-divider>
                        <v-list-tile avatar ripple v-for="item in items">
                            <v-list-tile-avatar></v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>{{item.title}}</v-list-tile-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <span class="pr-4">{{item.subtitle}}</span>
                            </v-list-tile-action>

                        </v-list-tile>

                        <v-subheader inset class="mt-3"><h2>NETWORK</h2></v-subheader>
                        <v-divider></v-divider>
                        <v-list-tile avatar ripple v-for="item in items2">
                            <v-list-tile-avatar></v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>{{item.title}}</v-list-tile-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <span class="pr-4">{{item.subtitle}}</span>
                            </v-list-tile-action>

                        </v-list-tile>
                        <v-divider></v-divider>
                    </template>
                </v-list>
        </v-flex>
        <!--<Profile :profile="profile" :mode="mode"/>-->
    </div>
</template>

<script>
    import {mapState, mapActions, mapMutations} from 'vuex'
    import Profile from '@/components/Profile'

    export default {
        name: 'ProfileView',
        components: {
            Profile
        },
        data () {
            return {
                items: [
                    { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Photos', subtitle: 'Jan 9, 2014' },
                    { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Recipes', subtitle: 'Jan 17, 2014' },
                    { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Work', subtitle: 'Jan 28, 2014' }
                ],
                items2: [
                    { icon: 'assignment', iconClass: 'blue white--text', title: 'Vacation itinerary', subtitle: 'Jan 20, 2014' },
                    { icon: 'call_to_action', iconClass: 'amber white--text', title: 'Kitchen remodel', subtitle: 'Jan 10, 2014' }
                ]
            }
        },
        computed: {
            ...mapState({
                profile: state => state.viewing.profile,
                mode: state => state.viewing.mode
            })
        },
        mounted: function () {
            this.loadViewingProfile({user_id: this.$route.params.user_id})
        },
        methods: {
            ...mapActions(['loadViewingProfile'])
        }
    }
</script>
