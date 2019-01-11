<template>
    <v-bottom-nav fixed style="bottom:56px;z-index: 10;">
        <v-btn color="teal" flat :to="'/'">
            <span>Home</span>
            <v-icon class="ma-0" style="font-size: 35px;">home</v-icon>
        </v-btn>
        <v-btn v-for="(item, index) in appdefinition.bottomNav"  color="teal" @click="gotoNewPage(item.path)">
            <span>{{item.title}}</span>
            <img :src="item.icon" width="30" height="30"/><v-icon></v-icon>
        </v-btn>
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
            ...mapActions(['loadAppDefinition', 'logout']),
            gotoNewPage(path) {
                if(path.includes('/web/')) {
                    window.open(path.replace('/web/', ""), '_blank')
                }
                else
                    window.location.href = path
                // this.$router.push({ path: path })
            }
        }
    }
</script>

<style>
    #core-footer {
        z-index: 0;
    }
</style>
