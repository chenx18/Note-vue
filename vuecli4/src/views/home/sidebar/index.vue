<template>
  <div style="height: 100%">
    <el-menu class="el-menu-vertical-demo"
      :default-active="activeMenu"   
      @open="handleOpen" 
      @close="handleClose"
    >
      <el-menu-item  v-for="item in sideList" :key="item.path" :index="item.path">
        <div @click="handleItem(item)">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.meta.menuName}}</span>
        </div>
        
      </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
  import {routes} from '@/router'
  export default {
    name: "Home",
    data() {
      return {
        sideList: [],
        isCollapse: true
      };
    },
    mounted() {
      if(routes) {
        this.sideList = routes[0].children[0].children;
        console.log(this.sideList)
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleItem(val) {
        this.$router.push({path:val.path, name:val.name})
      }
    },
    computed: {
      activeMenu() {
        const route = this.$route;
        const { meta, path } = route;
        console.log(route)
        return path;
      }
    },
    watch: {
    },
    components: {}
  };

</script>

<style lang="scss" scoped>
.el-menu-vertical-demo{
  height: 100%
}
</style>
