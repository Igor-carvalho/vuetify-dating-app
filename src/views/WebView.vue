<template>
    <iframe :src="iframeurl" class="p-0 m-0  mx-auto">
    </iframe>
</template>

<script>
export default {
  name: 'WebView',
  data(){
      return {
          iframeurl:''
      }
  },
  created() {
      this.iframeurl = this.$route.query.weburl
      // console.log(this.$route.query)
  }
}
</script>

<style>
  iframe {
    width: 100%;
    margin: -65px 0px;
    height: calc( 100vh - 56px);
  }
</style>
