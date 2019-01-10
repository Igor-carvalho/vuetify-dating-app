<template>
    <v-bottom-nav style="position: fixed; bottom:56px;z-index: 10;">
        <div style="flex: unset;width: 120px;">
            <v-btn color="teal" flat value="recent" :to="'/'">
                <span>Home</span>
                <v-icon class="ma-0" style="font-size: 35px;">home</v-icon>
            </v-btn>
        </div>
        <div v-for="(item, index) in appdefinition.bottomNav" style="flex: unset;width: 120px;">
            <v-btn color="teal" flat value="recent" :to="item.path">
                <span>{{item.title}}</span>
                <img :src="item.icon" width="30" height="30">
            </v-btn>
        </div>
    </v-bottom-nav>
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
