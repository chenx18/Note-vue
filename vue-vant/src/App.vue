<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>

export default {
  name: 'APP',
  data() {
    return {
    }
  },
  mounted(){},
  methods: {}, 
}
</script>

<style lang="scss">
@import './assets/css/index.scss';
@import url('http://at.alicdn.com/t/font_730713_j5z0ob8kylq.css');
#app {
  width: 100%;
  height: 100%;
  font-size: 12px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
