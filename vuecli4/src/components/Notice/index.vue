<template>
  <div>
    <div>
      <button @click="open"> 打开弹窗 </button>
    </div>

    <!-- md文档 -->
    <div class="markdown" v-html="md"></div>
  </div>
</template>

<script>
import creare from './create';
import Notice from './notice';
import NoticeMark from './noticeMark.md'
export default {
  name: 'notice',
  data(){
    return{
      md: NoticeMark
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
