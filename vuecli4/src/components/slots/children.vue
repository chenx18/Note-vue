<template>
<div class="cont">
  <!-- 具名插槽 -->
  <div class="header">
    <slot name="header" />
  </div>
  <!-- 匿名插槽 -->
  <div class="body">
    <slot />
  </div>
  <!-- 作用域插槽 -->
  <div class="footer">
    <slot name="footer" :fc="footerCont"/>
  </div>
</div>
</template>

<script>
export default {
  data(){
    return{}
  },
  mounted(){},
  methods:{},
  computed:{
    footerCont() {
      return '--出自蒲松龄撰自勉联'
    }
  },
  watch:{},
  components:{}
}
</script>

<style lang="scss" scoped>
.cont{
  width: 300px;
  margin: auto;
  text-align: center
}
.header{
  padding: 10px;
  font-size: 14px;
  font-weight: 600
}
.body{
  p{
    line-height: 40px;
  }
}
.footer{
  text-align: right;
}
</style>