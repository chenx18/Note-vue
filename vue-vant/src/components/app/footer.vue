<template>
  <!-- footer -->
  <van-tabbar v-model="active" active-color="#07c160" @change="selectTab">
    <van-tabbar-item icon="home-o">Home</van-tabbar-item>
    <van-tabbar-item icon="search">Todo</van-tabbar-item>
    <van-tabbar-item icon="setting-o">About</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    }
  },
  mounted() {},
  methods: {
    selectTab(val) {
      console.log(val);
      let pathName = '';
      switch (val) {
        case 0:
        pathName = 'home';
        break
        case 1:
        pathName = 'todos';
        break;
        case 2:
        pathName = 'about';
        break;
      }
      this.$router.push({
        name: pathName,
        
      })
    }
  },
}
</script>