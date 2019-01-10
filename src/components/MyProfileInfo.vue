<template>
    <div>
        MyProfileInfo {{ info.name }}
    </div>
</template>

<script>
export default {
    name: 'MyProfileInfo',
    props: {
        info: { type: Object, required: true }
    }
}
</script>

<style lang="scss">
</style>
