<template>
  <div>
    <!-- 管理数据，实现双向绑定 -->
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs">
  </div>
</template>

<script>
export default {
  name: "XInput",
  props:{
    value: String,
    type: {
      type: String,
      default: 'text'
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    onInput(e){
      console.log(e);
      this.$emit('input', e.target.value);
    }
  },
  computed: {},
  watch: {},
}
</script>

<style lang="scss" scoped>

</style>