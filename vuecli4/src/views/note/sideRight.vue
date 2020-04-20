<template>
  <div class="side-right">
    <div class="item" v-for="(item,i) in List" :key="i">
      <a :href="'#'+item.label">{{item.label}}</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SideRight",
    props:{
      List: Array
    },
    components: {},
    data() {
      return {
      };
    },
    mounted() {
      const basedata ={
        name: 'chenx18',
        houseName: 'vueNode',
      }
      // https://api.github.com/repos/chenx18/vueNode   // 仓库信息
      // https://api.github.com/repos/chenx18/vueNode/contents   // 获取某个repo的内容列表
      // https://api.github.com/repos/chenx18/vueNode/contents/
     
    },
    methods: {
    },
    computed: {
    }
  };

</script>

<style lang='scss' scoped>
  .side-right {
    position: fixed;
    top: 75px;
    right: 50px;
    width: 190px;
    padding: 10px;
    max-height: 80%;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08);
    z-index: 9999;
    overflow: auto;
    .item {
      a{
        display: block;
        width: 100%;
        height: 21px;
        font-size: 14px;
        color: #42A8E1;
        overflow: hidden;
        &:hover{
          color: #2a6496;
          text-decoration: underline;
        }
      }
    }
  }

</style>
