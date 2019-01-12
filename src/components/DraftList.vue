<template>
    <!--<v-container>-->
        <v-layout
                text-xs-center
                wrap
        >
            <v-flex xs12 sm12 md12>
                <v-subheader>Draft documents</v-subheader>
                <v-list two-line>
                    <template v-for="(item, index) in draftlist">
                        <v-list-tile
                                :key="item.title"
                                avatar
                                @click="openDraft(item)"
                        >
                            <v-list-tile-avatar>
                                <v-icon>local_offer</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title>Draft</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-icon color="grey">chat_bubble</v-icon>
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
    import VSubheader from "vuetify/lib/components/VSubheader/VSubheader";
    export default {
        name: 'DraftList',
        components: {VSubheader},
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
