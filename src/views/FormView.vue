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
      <!--<img width="30" height="30">-->
      <v-icon>account_box</v-icon>

      <v-toolbar-title>FormView</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>
    <SubmitForm :forminfo="formdefinition" :formdata="currentFormData" />
  </div>
</template>

<script>
    import { mapState, mapActions, mapMutations } from 'vuex'
    import SubmitForm from '@/components/BuildSubmitForm.vue'

    export default {
        components: {
            SubmitForm,
        },
        computed:{
            ...mapState(['formdefinition', 'formdata',]),
            activeTab: {
                get: function () {
                    return this.$store.state.activeTab
                },
                set: function (value) {
                    this.$store.commit('setActiveTab', value)
                }
            },
            currentFormData() {
                return localStorage.getItem('draft')?JSON.parse(localStorage.getItem('draft')):this.formdata
            }
        },
        created: function () {
            this.loadFormDefinition()
        },
        methods: {
            ...mapActions(['loadFormDefinition'])
        }
    }
</script>
