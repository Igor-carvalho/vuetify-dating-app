<template>
    <div>
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
