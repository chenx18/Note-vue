<template>
  <el-container class="conta">
    <el-row class="main">
      Home
    </el-row>
  </el-container>
</template>

<script>;
  export default {
    name: "Home",
    data() {
      return {};
    },
    created() {
    
    },
    mounted() {
      
    },
    methods: {},
    computed: {},
    watch: {},
    components: {}
  };
</script>
<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    background: #f2f2f2;
    overflow: auto;

    .main {
      width: calc(100% - 300px);
      padding: 10px;
      transition-duration: 0.2s;
      box-sizing: border-box;
    }
  }
</style>