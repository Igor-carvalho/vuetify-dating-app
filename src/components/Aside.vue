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
            <img :src="appdefinition.logo" width="30" height="30">

            <v-toolbar-title>{{appdefinition.title}}</v-toolbar-title>

            <v-spacer></v-spacer>
        </v-toolbar>

        <div style="margin-top:65px; max-height: calc( 100vh - 120px);height: calc( 100vh - 120px);width: 100%">
            <v-list class="pa-1">
                <v-list-tile-content>
                    <v-list-tile-title
                            v-if="appdefinition.mainNav!=undefined && appdefinition.mainNav.title!='' && appdefinition.mainNav.title!=null">
                        {{appdefinition.mainNav.title}}
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list>

            <v-list v-if="appdefinition.mainNav!=undefined && appdefinition.mainNav.items">
                <v-divider></v-divider>
                <div v-for="(firstLevel, index) in appdefinition.mainNav.items">
                    <v-list-tile v-if="firstLevel.type=='item'" @click="gotoNewPage(firstLevel.path)">
                        <v-list-tile-action v-if="firstLevel!=undefined" class="flex align-center justify-center">
                            <font-awesome-icon v-if="checkIcon(firstLevel.icon)"
                                               :icon="['fas', firstLevel.icon.replace('fa-', '')]"/>
                            <img v-else :src="firstLevel.icon" width="20" height="20"/>
                            <v-icon></v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title v-if="firstLevel!=undefined">{{firstLevel.title}}</v-list-tile-title>
                    </v-list-tile>

                    <v-list-group v-if="firstLevel.type=='menu'"
                                  value="false"
                    >
                        <v-list-tile slot="activator">
                            <v-list-tile-action v-if="firstLevel!=undefined && firstLevel.logo!=undefined"
                                                class="flex align-center justify-center">
                                <font-awesome-icon v-if="checkIcon(firstLevel.logo)"
                                                   :icon="['fas', firstLevel.logo.replace('fa-', '')]"/>
                                <img v-else :src="firstLevel.logo" width="20" height="20"/>
                                <v-icon></v-icon>
                            </v-list-tile-action>
                            <v-list-tile-title v-if="firstLevel!=undefined" class="flex align-center justify-center">
                                {{firstLevel.title}}
                            </v-list-tile-title>
                        </v-list-tile>
                        <div v-if="firstLevel!=undefined && firstLevel.items">
                            <div v-for="(secondLevel, secondindex) in firstLevel.items">
                                <v-list-tile v-if="secondLevel.type=='item'"
                                             :key="secondindex"
                                             @click="gotoNewPage(secondLevel.path)">

                                    <v-list-tile-action v-if="secondLevel!=undefined && secondLevel.icon!=undefined"
                                                        class="flex align-center justify-center ml-3">
                                        <font-awesome-icon v-if="checkIcon(secondLevel.icon)"
                                                           :icon="['fas', secondLevel.icon.replace('fa-', '')]"/>
                                        <img v-else :src="secondLevel.icon" width="20" height="20"/>
                                        <v-icon></v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-title v-if="secondLevel!=undefined">{{secondLevel.title}}
                                    </v-list-tile-title>
                                </v-list-tile>

                                <v-list-group v-if="secondLevel.type=='menu'"
                                              no-action
                                              sub-group
                                >
                                    <v-list-tile slot="activator">
                                        <v-list-tile-action v-if="secondLevel!=undefined && secondLevel.logo!=undefined"
                                                            class="flex align-center justify-center">
                                            <font-awesome-icon v-if="checkIcon(secondLevel.logo)"
                                                               :icon="['fas', secondLevel.logo.replace('fa-', '')]"/>
                                            <img v-else :src="secondLevel.logo" width="20" height="20"/>
                                            <v-icon></v-icon>
                                        </v-list-tile-action>
                                        <v-list-tile-title v-if="secondLevel!=undefined">{{secondLevel.title}}
                                        </v-list-tile-title>
                                    </v-list-tile>

                                    <div v-if="secondLevel!=undefined && secondLevel.items">
                                        <v-list-tile
                                                v-for="(thirdLevel, thirdindex) in secondLevel.items"
                                                :key="thirdindex"
                                                @click=""
                                                @click="gotoNewPage(thirdLevel.path)"
                                        >

                                            <v-list-tile-action v-if="thirdLevel!=undefined"
                                                                class="flex align-center justify-center">
                                                <font-awesome-icon v-if="checkIcon(thirdLevel.icon)"
                                                                   :icon="['fas', thirdLevel.icon.replace('fa-', '')]"/>
                                                <img v-else :src="thirdLevel.icon" width="20" height="20"/>
                                                <v-icon></v-icon>
                                            </v-list-tile-action>
                                            <v-list-tile-title v-if="thirdLevel!=undefined"
                                                               v-text="thirdLevel.title"></v-list-tile-title>
                                        </v-list-tile>
                                    </div>
                                </v-list-group>
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
            ...mapActions(['loadAppDefinition', 'logout']),
            gotoNewPage(path) {
                if (path.includes('/web/')) {
                    // window.open(path.replace('/web/', ""), '_blank')
                    this.$router.push({path: '/web', query: {weburl: path.replace('/web/', "")}});
                }
                else
                // window.location.href = path
                    this.$router.push({path: path})
            },
            checkIcon(icon) {
                if (icon.includes('fa-')) {
                    return true
                } else
                    return false
            }
        }
    }
</script>

<style>
    #core-footer {
        z-index: 0;
    }

    .v-list__tile {
        padding: 0px !important;
    }

    .v-list__group__items--no-action .v-list__tile {
        padding-left: 25px !important;
    }
</style>
