<template>
    <!--<v-container>-->
        <v-layout
                text-xs-center
                wrap
        >
            <v-flex xs12 sm12 md12>
                <!--<v-card>-->
                    <v-list two-line>
                        <v-subheader>
                            Submitted documents
                        </v-subheader>
                        <template v-for="(item, index) in itemslist">
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
                                    <v-icon color="teal">chat_bubble</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-divider
                                    :key="index"
                            ></v-divider>
                        </template>
                    </v-list>
                <!--</v-card>-->
            </v-flex>

        </v-layout>
    <!--</v-container>-->
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
