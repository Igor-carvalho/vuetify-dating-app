<template>
  <div>
    TODO::WebView
  </div>
</template>

<script>
export default {
  name: 'WebView',
  components: {
  },
  created() {
      window.open(this.$route.params.id, '_blank')
  }
}
</script>
