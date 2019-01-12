<template>
    <!--<v-container>-->
        <v-layout
                text-xs-center
                wrap
        >
            <v-flex xs12 sm12 md12 v-if="draftitems[$route.params.id]!=undefined && Object.keys(draftitems[$route.params.id]).length>0">
                <v-subheader>Draft documents</v-subheader>
                <v-list two-line>
                    <template v-for="(item, index) in draftitems[$route.params.id]">
                        <v-list-tile
                                avatar
                                @click="openDraft(item, index)"
                        >
                            <v-list-tile-avatar>
                                <v-icon>local_offer</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title>Draft_{{index}}</v-list-tile-title>
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
    import { mapMutations, mapState} from 'vuex'
    import VSubheader from "vuetify/lib/components/VSubheader/VSubheader";
    export default {
        name: 'DraftList',
        components: {VSubheader},
        computed: {
            ...mapState(['draftitems']),
        },
        methods: {
            openDraft(draftData, index) {
                this.$store.state.formdata=draftData
                this.$store.state.draftid=index
                this.$router.push({path:'/form/'+this.$route.params.id})
            }
        }
    }
</script>

<style lang="scss">
</style>
