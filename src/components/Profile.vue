<template>
    <div>
        <ProtectedProfile :profile="profile" v-if="mode == 'protected'"/>
        <PublicProfile :profile="profile" v-else/>
    </div>
</template>

<script>
import PublicProfile from './PublicProfile'
import ProtectedProfile from './ProtectedProfile'

export default {
    name: 'Profile',
    props: {
        profile: { type: Object, required: true },
        mode: { type: String, required: true }
    },
    components: {
        PublicProfile,
        ProtectedProfile
    }
}
</script>

<style lang="scss">
</style>
