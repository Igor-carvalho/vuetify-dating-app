<template>
    <div id="app">
        <v-content>
            <!--<Aside></Aside>-->
            <div style="margin: 65px 0px 65px 0px ;">
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
import Aside from "./components/Aside";

export default {
    components: {
        Aside,
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
