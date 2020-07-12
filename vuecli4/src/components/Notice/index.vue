<template>
  <div>
    <p>1. 弹窗组件特点是在当前 vue 实例之外独立存在，通常挂载于 body</p>
    <p>2. 它们是通过 js 动态创建，不需要在任何组件声明</p>

    <br>

    <div>
      <button @click="open"> 打开弹窗 </button>
    </div>

    <br>
    <div>
      <vk-date-picker2 type="datetime" v-model="startTime" placeholder="请选择开始时间"/>
      <vk-date-picker2 type="datetime" v-model="endTime" placeholder="请选择结束时间"/>
    </div>

  </div>
</template>

<script>
import creare from './create';
import Notice from './notice';
export default {
  name: 'notice',
  data(){
    return{
      startTime:"",
      endTime:""
    }
  },
  methods: {
    // 打开弹窗
    open(){
      const notice = creare(Notice, {
        title: '标题1',
        message: '弹窗内容',
      })
      notice.show();
    },
  }
}
</script>

<style>

</style>

<style lang="scss" scoped>

</style>
