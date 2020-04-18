<template>
  <div>
    <div class="header">
      <div class="logo">
        <img src="./../assets/logo.png" alt="">
      </div>
      <ul class="nav flexContainer">
        <li class="nav-item" v-for="(el,i) in navList" :key="i"
          @click="handleNav(el)">
          <span :class="{'active': navActive === i}"> {{el.label}} </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header",
    components: {},
    data() {
      return {
        navActive: '',
        navList:[
          
        ],
      };
    },
    mounted() {
      this.navList= [
        {label: 'JavaScript', value: 0, path:''},
        {label: 'HTML', value: 1, path:""},
        {label: 'VUE', value:2, path:''},
        {label: 'React', value:3, path:''},
        {label: 'Node', value:4, path:''},
        {label: 'UNIAPP', value:5, path:''},
      ]
    },
    methods: {
      handleNav(val) {
        this.navActive = val.value;
        this.$router.push('/javascript');
      }

    },
    
  };

</script>

<style lang='scss' scoped>
  .header {
    position: relative;
    z-index: 1000;
    height: 55px;
    line-height: 55px;
    color: #409eff;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 0 1px rgba(0,0,0,0.25);
    transition: background-color 0.3s ease-in-out;
    display: flex;
    display: -ms-flexbox;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    justify-content: center; /* 水平居中 */
    align-items: center;     /* 垂直居中 */
    .logo {
      height: 54px;
      padding: 10px 0;
      box-sizing: border-box;
      img {
        height: 100%;
      }
    }
    .nav{
      min-width: 300px;
      padding: 0 15px;
      .nav-item {
        position: relative;
        cursor: pointer;
        span {
          opacity: .5;
          display: block;
          padding: 0 22px;
          &:hover{
            opacity: 1;
          }
        }
      }
      .active{
        &:after{
          content: "";
          display: inline-block;
          position: absolute;
          bottom: 0;
          left: calc(50% - 15px);
          width: 30px;
          height: 2px;
          background: #409eff;
        }
      }
    }
  }

</style>
