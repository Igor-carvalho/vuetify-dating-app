<template>
    <div>
        Component::ProfilePhotos
        <pre>
            PHOTOS (như cua zalo, click vao se show chi tiet ra + desc)
        </pre>
        <div v-for="item in photos">
            <img :src="item.photo" width="100px" height="100px"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProfilePhotos',
    props: {
        photos: { type: Object, required: true }
    }
}
</script>

<style lang="scss">
</style>
