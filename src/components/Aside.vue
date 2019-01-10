<template>
    <v-navigation-drawer style="margin-top:65px"
            :mini-variant="mini"
            absolute
    >
        <v-list class="pa-1">
            <!--<v-list-tile v-if="mini" @click.stop="mini = !mini">-->
                <!--<v-list-tile-action>-->
                    <!--<v-icon>chevron_right</v-icon>-->
                <!--</v-list-tile-action>-->
            <!--</v-list-tile>-->

            <v-list-tile v-if="!mini" avatar tag="div">
                <v-list-tile-avatar>
                    <!--<img src="https://randomuser.me/api/portraits/men/85.jpg">-->
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title>{{appdefinition.mainNav.title}}</v-list-tile-title>
                </v-list-tile-content>

                <!--<v-list-tile-action>-->
                    <!--<v-btn icon @click.stop="mini = !mini">-->
                        <!--<v-icon>chevron_left</v-icon>-->
                    <!--</v-btn>-->
                <!--</v-list-tile-action>-->
            </v-list-tile>
            <v-divider></v-divider>
        </v-list>


        <v-list v-if="appdefinition.mainNav.items">
            <div v-for="(firstLevel, index) in appdefinition.mainNav.items">
                <v-list-tile v-if="firstLevel.type=='item'">
                    <v-list-tile-action>
                        <v-icon>local_offer</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>{{firstLevel.title}}</v-list-tile-title>
                </v-list-tile>

                <v-list-group v-if="firstLevel.type=='menu'"
                    prepend-icon="local_offer"
                    value="true"
                >
                    <v-list-tile slot="activator">
                        <v-list-tile-title>{{firstLevel.title}}</v-list-tile-title>
                    </v-list-tile>

                    <div v-for="(secondLevel, secondindex) in firstLevel.items">
                        <v-list-tile v-if="secondLevel.type=='item'">
                            <v-list-tile-action>
                                <v-icon>fas {{secondLevel.icon}}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-title>{{secondLevel.title}}</v-list-tile-title>
                        </v-list-tile>
                        <div v-if="secondLevel.type=='menu'">
                            <v-list-group v-if="secondLevel.type=='menu'"
                                    no-action
                                    sub-group
                            >
                                <v-list-tile slot="activator">
                                    <v-list-tile-title>{{secondLevel.title}}</v-list-tile-title>
                                </v-list-tile>

                                <div v-if="secondLevel.items">
                                    <v-list-tile
                                            v-for="(thirdLevel, thirdindex) in secondLevel.items"
                                            :key="thirdindex"
                                            @click=""
                                    >
                                        <v-list-tile-title class="ml-4" v-text="thirdLevel.title"></v-list-tile-title>
                                        <v-list-tile-action>
                                            <v-icon v-text="thirdLevel.icon"></v-icon>
                                        </v-list-tile-action>
                                    </v-list-tile>
                                </div>
                            </v-list-group>
                        </div>
                    </div>
                </v-list-group>
            </div>
        </v-list>
    </v-navigation-drawer>
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
