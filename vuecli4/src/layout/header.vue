<template>
  <div class="content">
    <div class="header">
      <h1 class="logo"><a >云</a></h1>
      <ul class="table-list">
        <li class="item">
          <span>
            <a class="z-slt"><em>发现</em>
            <sub class="cor">&nbsp;</sub></a></span>
        </li>
      </ul>
    </div>
    <div class="nav">
      <div class="wrap">
        <ul class="nav">
          <li>
            <a hidefocus="true" data-module="discover" href="/discover" class="z-slt"><em>推荐</em></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header",
    components: {},
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
  .content {

    .header {
      position: relative;
      z-index: 1000;
      height: 70px;
      box-sizing: border-box;
      background: #242424;
      border-bottom: 1px solid #000;
      display: flex;
      display: -ms-flexbox;
      display: -webkit-box;
      display: -moz-box;
      display: -webkit-flex;
      .table-list{

      }
    }

    .nav {
      z-index: 90;
      height: 35px;
      box-sizing: border-box;
      background-color: #C20C0C;
      border-bottom: 1px solid #a40011;
    }
  }

</style>
