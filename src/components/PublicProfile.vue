<template>
    <div>
        Component::PublicProfile
        <pre>
            Name: {{ profile.name }}
            Ben tren la Avatar + ten + tag + profile background
            Ben duoi gồm có các tab là , PHOTOS (như cua zalo, click vao se show chi tiet ra + desc)
        </pre>
        <div>
            <v-tabs color="cyan" dark slider-color="yellow">
                <v-tab ripple>PROFILE</v-tab>
                <v-tab ripple>PHOTOS</v-tab>
                <v-tab-item>
                    PROFILE (có expectation bên trong, phân tách bằng v-divider)
                </v-tab-item>
                <v-tab-item>
                    <ProfilePhotos :photos="profile.photos" />
                </v-tab-item>
            </v-tabs>
        </div>
    </div>
</template>

<script>
import ProfilePhotos from '@/components/ProfilePhotos'

export default {
    name: 'PublicProfile',
    components: {
        ProfilePhotos
    },
    props: {
        profile: { type: Object, required: true }
    }
}
</script>

<style lang="scss">
</style>
