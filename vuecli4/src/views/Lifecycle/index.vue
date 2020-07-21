<template>
  <div>
    <!-- md文档 -->
    <div class="markdown" v-html="md"></div>
  </div>


</template>

<script>
  import Mark from './lifecycle.md'
  export default {
    data() {
      return {
        md: Mark,

      }
    },
    components: {
    }
  }

</script>

<style>

</style>
