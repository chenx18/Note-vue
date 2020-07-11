<template>
  <div>
    <!-- 显示label -->
    <label v-if="label">{{label}}</label>

    <!-- 显示表单元素 -->
    <slot></slot>

    <!-- 错误提示 -->
    <p class="errmsg">{{message}}</p>

  </div>
</template>

<script>
import Schema from 'async-validator'

// props: label、prop
export default {
  name: "XFromItem",
  inject: ['form'],
  props: {
    label: String,
    prop: String,
  },
  data() {
    return {
      message: ''
    };
  },
  mounted() {
    this.$on('validate', ()=>{
      this.validate()
    })
  },
  methods: {
    validate(){
      // 当前表单项校验
      // element 使用的是 async-validator
      // 获取校验规则和当前数据
      const rule = this.form.rules[this.prop];
      const value = this.form.model[this.prop];
      console.log('rule', rule)
      console.log('value', value)
      // 使用表单验证库 async-validator
      const schema = new Schema({[this.prop]: rule});
      return schema.validate({[this.prop]: value}, err => {
        if(err){
          console.log('err',err)
          this.message=err[0].message;
        }else{
          console.log('通过校验')
          this.message='';
        }
      })

    }
  },
  computed: {},
  watch: {},
}
</script>

<style lang="scss" scoped>
.errmsg{
  font-size:12px;
  color: red;
}
</style>