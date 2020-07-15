<template>

  <div>
    <div @click="toggle">
      <label >{{model.title}}</label>
      <span v-if="isFloder">[{{open?'-':'+'}}]</span>
    </div>
    <div v-show="open" v-if="isFloder">
      <tree-node v-for="item in model.children"
        :model="item" :key="item.title" 
        :level="level + 1" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeNode',
  props:{
    model: Object,
    level: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      open: false
    }
  },
  mounted(){

  },
  methods:{
    toggle(){
      if(this.isFloder){
        this.open = !this.open;
      }
    }
  },
  computed:{
    isFloder(){
      return this.model.children && this.model.children.length;
    }
  },
  watch:{},
  components:{}
}
</script>

<style>

</style>
