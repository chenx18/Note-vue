<template>
  <div>
    <children>
      <!-- 具名插槽 -->
      <template v-slot:header> 三千越甲可吞吴 </template>

      <!-- 匿名插槽 -->
      <template>
        <p>有志者事竟成破釜沉舟百二秦关终属楚</p>
        <p>苦心人天不负卧薪尝胆三千越甲可吞吴</p>
      </template>

      <!-- 作用域插槽 -->
      <template v-slot:footer="{fc}">{{fc}}</template>
    </children>

    <!-- md文档 -->
    <div class="markdown" v-html="md"></div>
  </div>
</template>

<script>
import Children from './children'
import file from './slotMark.md'
export default {
  name: 'Slots',
  data(){
    return{
      md:file
    }
  },
  mounted(){
  },
  methods:{
  },
  computed:{
  },
  watch:{},
  components:{
    Children
  }
}
</script>

<style>

</style>