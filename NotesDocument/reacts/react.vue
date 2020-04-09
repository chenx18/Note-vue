<template>
  <el-container class="container">
    <side-menu id="HTML" :sideData='sideData'></side-menu>
    <el-main class="content" >
      <router-view id="md"></router-view>
    </el-main>
  </el-container>
</template>

<script>
import sideMenu from './../../components/sideMenu/sideMenu'
import pageConfig from './pageConfig.js';
export default {
  name: 'Html',
  data() {
    return {
      sideData: [],
    }
  },
  mounted() {
    this.sideData = pageConfig.children;
  },
  methods: {},
  components:{
    sideMenu
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 61px 0;
  overflow: hidden;
  margin: 0 auto;
  box-sizing: border-box;
  background: #fff;
  .content {
    position: relative;
    padding: 2.2em 0;
    max-width: 1200px;
    min-height: 800px;
    margin: 0 auto;
    padding-left: 50px;
    margin-left: 320px;
  }
}
</style>
