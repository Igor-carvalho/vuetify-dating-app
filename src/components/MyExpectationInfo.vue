<template>
    <div>
        MyExpectationInfo {{ expectation.description }}
    </div>
</template>

<script>
export default {
    name: 'MyExpectationInfo',
    props: {
        expectation: { type: Object, required: true }
    }
}
</script>

<style lang="scss">
</style>
