<template>
  <!-- 组件化常用技术 -->
  <div class="markdown" v-html="md"></div>
</template>

<script>
import compt from './compt.md'  // 组件化常用技术
export default {
  name: "IFrom",
  data() {
    return {
      md: compt
    };
  },
  mounted() {},
  methods: {},
  computed: {},
  watch: {},
  components:{
  }
}
</script>

<style lang="scss" scoped>

</style>