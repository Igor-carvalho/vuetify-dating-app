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
            <v-btn flat :to="'/list/'+$route.params.id" class="ml-0 mr-0 pl-0 pr-0" style="min-width: 30px"><v-icon dark left>arrow_back</v-icon></v-btn>
            <v-toolbar-title  class="mr-0 ml-0 pl-0 pr-0 d-flex justify-center" style="width: 100%">
                {{getFormInfo().title}}
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <div class="mr-0 ml-0 pl-0 pr-0" style="min-width: 35px;"></div>
        </v-toolbar>
        <SubmitForm :forminfo="getFormInfo()"/>
    </div>
</template>

<script>
    import {mapState, mapActions, mapMutations} from 'vuex'
    import SubmitForm from '@/components/BuildSubmitForm.vue'

    export default {
        name: 'formview',
        components: {
            SubmitForm,
        },
        computed: {
            ...mapState(['formdefinition']),
            activeTab: {
                get: function () {
                    return this.$store.state.activeTab
                },
                set: function (value) {
                    this.$store.commit('setActiveTab', value)
                }
            },
        },
        created: function () {
            this.loadFormDefinition(this.$route.params.id)
        },
        methods: {
            ...mapActions(['loadFormDefinition']),
            getFormInfo() {
                let forminfo = this.formdefinition
                if(forminfo.tabs !=undefined && forminfo.tabs.length==1) {
                    for (let tab of forminfo.tabs) {
                        for (let field of forminfo.tabs[0].fields) {
                            forminfo['fields'].push(field)
                        }
                    }

                    delete forminfo.tabs
                }
                return forminfo
            }
        }
    }
</script>

<style>
    .v-toolbar__content {
        padding: 0px 5px!important;
    }
</style>
