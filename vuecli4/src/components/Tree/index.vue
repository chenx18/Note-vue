<template>
  <div>
    <tree-node :model="treeDate" />
  </div>
</template>

<script>
import Tree from './Tree'
import TreeNode from './TreeNode'
export default {
  data(){
    return{
      treeDate:{
          title: '树组件',
          children:[
            {
              title: '01 树组件1级'
            },
            {
              title: '02 树组件1级',
              children:[
                {
                  title: '01 树组件2级'
                },
                {
                  title: '02 树组件2级',
                }
              ]
            },
            {
              title: '全栈开发',
              expand: true,
            }
          ]
        },
       
      
    }
  },
  components:{
    TreeNode
  }
}
</script>

<style>

</style>