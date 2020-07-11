<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
// props: model rules
export default {
  name: "XForm",
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
  methods: {
    // 全局校验方法：
    // 1. 执行内部所有FormItem 校验方法，统一处理结果
    // 将 FormItem 数组转换为 Promise 数组
    validate(cb){
      const filte = this.$children.filter(item => item.prop);
      console.log('filte', filte)

      const tasks = filte.map(item => item.validate())
      console.log('tasks', tasks)

      // 2.统一检查校验结果
      Promise.all(tasks)
      .then(() => cb(true))
      .catch(() => cb(false))

    }
  },
  computed: {},
  watch: {},
}
</script>

<style lang="scss" scoped>

</style>