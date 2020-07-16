<template>
  <div class="content">
    <div class="sidebar">
      <Sidebar />
    </div>
    
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from './sidebar'
  export default {
    name: "Home",
    data() {
      return {
        startDate: '',
        startDate2: '1399-04-19 15:30'
      };
    },
    mounted() {},
    methods: {},
    computed: {},
    watch: {
      startDate(val) {
        console.log(val)
      },
      $route() {
        // [{name:'home',path:'/'},{name:'list',path:'/list'}]
        console.log(this.$route.matched);
        // ['home','list']
        let d = this.$route.matched.map(m => m.name)
        console.log(d)
      }
    },
    components: {
      Sidebar
    },
  };
</script>
<style lang="scss" scoped>
  .content {
    width: 100%;
    height: calc(100% - 55px);
    overflow-y: hidden !important;
    overflow-x: auto;
    display: flex;
    .sidebar{
      height: 100%;
      flex-shrink: 0;
      flex-grow: 0;
      flex-basis: 200px;
    }
    .main{
      flex: auto;
      padding: 10px;
      box-sizing: border-box;
      overflow-y: scroll;
    }
  }
</style>