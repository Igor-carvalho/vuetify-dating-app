<template>
    <!--<v-container>-->
        <v-layout
                text-xs-center
                wrap
        >
            <v-flex xs12 sm12 md12>
                <v-toolbar
                        color="teal lighten-3"
                        dark
                        scroll-off-screen
                        scroll-target="#scrolling-techniques"
                >
                    <!--<img width="30" height="30">-->
                    <v-toolbar-side-icon></v-toolbar-side-icon>

                    <v-toolbar-title>DraftList</v-toolbar-title>

                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-list two-line>
                    <template v-for="(item, index) in draftlist">
                        <v-list-tile
                                :key="item.title"
                                avatar
                                @click="openDraft(item)"
                        >
                            <v-list-tile-avatar>
                                <v-icon>chat</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title>Draft</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-icon>keyboard_arrow_right</v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
                        <v-divider
                                :key="index"
                        ></v-divider>
                    </template>
                </v-list>
            </v-flex>

        </v-layout>
    <!--</v-container>-->
</template>


<script>
    export default {
        name: 'DraftList',
        props: {
            draftlist: { required: true }
        },
        methods: {
            openDraft(draftData) {
                this.$store.state.formdata=draftData
                this.$router.push('/form/'+this.$route.params.id)
            }
        }
    }
</script>

<style lang="scss">
</style>
