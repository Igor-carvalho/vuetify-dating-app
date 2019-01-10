<template>
    <v-container>
        <v-layout
                text-xs-center
                wrap
        >
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-toolbar color="pink" dark>
                        <v-toolbar-side-icon></v-toolbar-side-icon>
                        <v-toolbar-title>Submitted Items</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon :to="{path: '/itemslist/new'}">
                            <v-icon>add_circle</v-icon>
                        </v-btn>
                    </v-toolbar>

                    <v-list two-line>
                        <!--<v-subheader>-->
                            <!--Today-->
                        <!--</v-subheader>-->
                        <template v-for="(item, index) in itemslist">
                            <v-divider
                                    :key="index"
                            ></v-divider>
                            <v-list-tile
                                    :key="item.title"
                                    avatar
                                    @click=""
                            >
                                <v-list-tile-avatar>
                                    <img :src="item.image">
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                    <v-list-tile-sub-title v-html="item.desc"></v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-icon>keyboard_arrow_right</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                        </template>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
    export default {
        name: 'ItemsList',
        props: {
            itemslist: { required: true }
        },
        data() {
            return {
                dialog: false
            }
        }
    }
</script>

<style lang="scss">
</style>
