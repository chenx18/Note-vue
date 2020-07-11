<template>
  <div>
    <!-- 管理数据，实现双向绑定 -->
    <!-- :value, @input -->
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
      // <!--v-model是语法糖-->
      // <!-- <Input v-model="username"> -->
      // <!--默认等效于下⾯面这⾏行行-->
      // <!-- <Input :value="username" @input="username=$event"> -->
      
      // 触发 input 默认行为 @input 对value 赋值
      this.$emit('input', e.target.value);

      // 触发校验
      this.$parent.$emit('validate')
    }
  },
  computed: {},
  watch: {},
}
</script>

<style lang="scss" scoped>

</style>