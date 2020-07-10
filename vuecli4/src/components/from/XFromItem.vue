<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "XFromItem",
  inject: ['form'],
  props: {
    label: String,
    prop: String,
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