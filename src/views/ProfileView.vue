<template>
    <div>
        <Profile :profile="profile" :mode="mode"/>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import Profile from '@/components/Profile'

export default {
    name: 'ProfileView',
    components: {
        Profile
    },
    computed:{
        ...mapState({
            profile: state => state.viewing.profile,
            mode: state => state.viewing.mode
        })
    },
    mounted: function () {
        this.loadViewingProfile({ user_id: this.$route.params.user_id })
    },
    methods: {
        ...mapActions(['loadViewingProfile'])
    }
}
</script>
