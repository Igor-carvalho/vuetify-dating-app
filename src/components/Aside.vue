<template>
    <div>
        <v-toolbar
                absolute
                color="teal lighten-3"
                dark
                scroll-off-screen
                scroll-target="#scrolling-techniques"
        >
            <img :src="appdefinition.logo" width="30" height="30">

            <v-toolbar-title>{{appdefinition.title}}</v-toolbar-title>

            <v-spacer></v-spacer>
        </v-toolbar>

        <div style="margin-top:65px; max-height: calc( 100vh - 120px);height: calc( 100vh - 120px);width: 100%">
            <v-list class="pa-1">
                <v-list-tile-content>
                    <v-list-tile-title v-if="appdefinition.mainNav!=undefined">{{appdefinition.mainNav.title}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list>

            <v-list v-if="appdefinition.mainNav!=undefined && appdefinition.mainNav.items">
            <v-divider></v-divider>
            <div v-for="(firstLevel, index) in appdefinition.mainNav.items">
                <v-list-tile v-if="firstLevel.type=='item'" :to="firstLevel.path">
                    <v-list-tile-action>
                        <v-icon>local_offer</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title v-if="firstLevel!=undefined">{{firstLevel.title}}</v-list-tile-title>
                </v-list-tile>

                <v-list-group v-else-if="firstLevel.type=='menu'"
                    prepend-icon="local_offer"
                    value="true"
                >
                    <v-list-tile slot="activator">
                        <v-list-tile-title  v-if="firstLevel!=undefined">{{firstLevel.title}}</v-list-tile-title>
                    </v-list-tile>
                    <div v-if="firstLevel!=undefined && firstLevel.items">
                        <div v-for="(secondLevel, secondindex) in firstLevel.items">
                            <v-list-tile v-if="secondLevel.type=='item'"
                                         :key="secondindex"
                                         :to="secondLevel.path">
                                <v-list-tile-action>
                                    <v-icon>fas {{secondLevel.icon}}</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-title v-if="secondLevel!=undefined">{{secondLevel.title}}</v-list-tile-title>
                            </v-list-tile>
                            <div v-else-if="secondLevel.type=='menu'">
                                <v-list-group v-if="secondLevel.type=='menu'"
                                        no-action
                                        sub-group
                                >
                                    <v-list-tile slot="activator">
                                        <v-list-tile-title v-if="secondLevel!=undefined">{{secondLevel.title}}</v-list-tile-title>
                                    </v-list-tile>

                                    <div v-if="secondLevel!=undefined && secondLevel.items">
                                        <v-list-tile
                                                v-for="(thirdLevel, thirdindex) in secondLevel.items"
                                                :key="thirdindex"
                                                @click=""
                                                :to="thirdLevel.path"
                                        >
                                            <v-list-tile-title v-if="thirdLevel!=undefined" class="ml-4" v-text="thirdLevel.title"></v-list-tile-title>
                                            <v-list-tile-action>
                                                <v-icon v-text="thirdLevel.icon"></v-icon>
                                            </v-list-tile-action>
                                        </v-list-tile>
                                    </div>
                                </v-list-group>
                            </div>
                        </div>
                    </div>
                </v-list-group>
            </div>
        </v-list>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex'

    export default {
        data: () => ({
            mini: false,
        }),
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
