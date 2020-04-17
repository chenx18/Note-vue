<template>
  <div class="container">
    <HeadBar />
    <div class="main"> <router-view /> </div>
  </div>
</template>

<script>
  import HeadBar from "./header";
  export default {
    name: "Layout",
    components: {
      HeadBar,
    },
    data() {
      return {

      };
    },
    methods: {
      
    },
    mounted() {
      
    },
  };

</script>

<style lang='scss'>
  .container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    min-width: 300px;
    // display: flex;
    // display: -ms-flexbox;
    // display: -webkit-box;
    // display: -moz-box;
    // display: -webkit-flex;

    .main {
      width: 100%;
      height: calc(100% - 55px);
      overflow-y: hidden !important;
      overflow-x: auto;
      // position: relative;
    }
  }

</style>
