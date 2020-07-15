<template>
  <div >
    <tree-node v-for="(item,index) in data" :key="index" :model="item"/>
  </div>
</template>

<script>
import TreeNode from './TreeNode'
export default {
  name: 'Tree',
  props:{
    data: Array
  },
  data(){
    return{

    }
  },
  components:{
    TreeNode
  }
}
</script>

<style>

</style>