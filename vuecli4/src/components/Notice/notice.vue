<template>
  <div class="box_wrapper" v-if="isShow">
    <div class="box">
      <div class="box_header">
        <h3>{{title}}</h3>
      </div>
      <div class="box_content">
        {{message}}
      </div>
      <div class="box_btns">
        <button @click="confirm"> 确定 </button>
      </div>
      
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Notice',
  props:{
    title:{
      type: String,
      default:''
    },
    message:{
      type: String,
      default: ''
    },
    duration:{
      type:Number,
      default: 1000
    }
  },
  data(){
    return{
      isShow: false
    }
  },
  methods:{
    //显示
    show(){
      this.isShow = true;
    },

    // 隐藏
    hide(){
      this.isShow = false;
    },

    // 确定
    confirm() {
      this.isShow = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.box_wrapper {
  width: 100%;
  height: 100%;
  // position: relative;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 9999;
  background: rgba(0,0,0,0.2);
  &:after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
  }
  .box {
    display: inline-block;
    width: 420px;
    padding-bottom: 10px;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    font-size: 18px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    text-align: left;
    overflow: hidden;
    backface-visibility: hidden;
  }
  .box_header{
    padding: 15px 15px 10px;
  }
  .box_content{
    padding: 10px 15px;
    color: #606266;
    font-size: 14px;
  }
  .box_btns{
    padding: 5px 15px 0;
    text-align: right
  }
}
</style>