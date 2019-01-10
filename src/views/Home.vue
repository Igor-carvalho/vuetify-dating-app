<template>
    <div>
        <v-tabs v-model="activeTab" color="cyan" dark slider-color="yellow">
            <v-tab ripple>CONNECTIONS</v-tab>
            <v-tab ripple>PROFILE</v-tab>
            <v-tab ripple>EXPECTATION</v-tab>
            <v-tab ripple :to="{path: '/itemslist'}">ITEMS LIST</v-tab>
            <v-tab-item>
                <ConnectionList :connections="connections" />
            </v-tab-item>
            <v-tab-item>
                <MyProfileInfo :info="profile.info" />
            </v-tab-item>
            <v-tab-item>
                <MyExpectationInfo :expectation="profile.expectation" />
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import ConnectionList from '@/components/ConnectionList.vue'
import MyProfileInfo from '@/components/MyProfileInfo.vue'
import MyExpectationInfo from '@/components/MyExpectationInfo.vue'

export default {
    components: {
        ConnectionList,
        MyProfileInfo,
        MyExpectationInfo
    },
    computed:{
        ...mapState(['connections', 'profile', 'expectation']),
        activeTab: {
            get: function () {
                return this.$store.state.activeTab
            },
            set: function (value) {
                this.$store.commit('setActiveTab', value)
            }
        }
    },
    created: function () {
        this.loadUserData()
    },
    methods: {
        ...mapActions(['loadUserData'])
    }
}
</script>
