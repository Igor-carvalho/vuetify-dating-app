<template>
    <v-toolbar
            absolute
            color="teal lighten-3"
            dark
            scroll-off-screen
            scroll-target="#scrolling-techniques"
    >
        <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
        <img :src="appdefinition.logo" width="30" height="30">

        <v-toolbar-title>{{appdefinition.title}}</v-toolbar-title>

        <v-spacer></v-spacer>

        <!--<v-btn icon>-->
            <!--<v-icon>search</v-icon>-->
        <!--</v-btn>-->

        <!--<v-btn icon>-->
            <!--<v-icon>favorite</v-icon>-->
        <!--</v-btn>-->

        <!--<v-btn icon>-->
            <!--<v-icon>more_vert</v-icon>-->
        <!--</v-btn>-->
    </v-toolbar>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex'

    export default {
        computed: {
            ...mapGetters(['isLoggedIn']),
            ...mapState(['appdefinition']),
        },
        created() {
            if (this.isLoggedIn) {
                this.loadAppDefinition()
            }
        },
        methods: {
            ...mapActions(['loadAppDefinition', 'logout'])
        }
    }
</script>

<style>
    #core-footer {
        z-index: 0;
    }
</style>
