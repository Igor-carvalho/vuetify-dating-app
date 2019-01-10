<template>
    <div id="app">
        <v-content>
            <MainNav></MainNav>
            <Aside></Aside>
            <div id="core-view" style="margin: 65px 0px 0px 300px ;">
                <v-fade-transition mode="out-in">
                    <router-view />
                </v-fade-transition>
            </div>
            <Footer></Footer>
        </v-content>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Footer from './components/Footer.vue'
import MainNav from "./components/MainNav";
import Aside from "./components/Aside";

export default {
    components: {
        Aside,
        MainNav,
        Footer
    },
    computed: {
        ...mapGetters(['isLoggedIn']),
        ...mapState(['appdefinition']),
    },
    created() {
        if (this.isLoggedIn) {
            // this.loadUserData
        }
    },
    methods: {
        ...mapActions(['loadUserData','logout'])
    }
}
</script>
