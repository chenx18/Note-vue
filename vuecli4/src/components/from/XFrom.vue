<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "XFrom",
  props:{
    model: {
      type: Object,
      required: true
    },
    rules:{
      type: Object
    }
  },
  provide(){
    return{
      'form': this
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {},
  watch: {},
}
</script>

<style lang="scss" scoped>

</style>