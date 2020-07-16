#### 实现弹窗组件
> 弹窗这类组件的特点是它们在当前vue实例例之外独⽴立存在，通常挂载于body；   
> 它们是通过JS动态创建的，不需要在任何组件中声明。    

1. 创建 **create函数** 用于动态创建指定组件实例例并挂载至body
2. 创建通知组件 Notice.vue
3. 使用 create api

##### create
> - create 用于动态创建指定组件实例例并挂载至body  
> - render 的作用是得到描述dom结构的虚拟dom  
> - mount 执行挂载函数，但未指定挂载目标，表示只执行初始化工作  

```js
// create.js

import Vue from "vue";
// 创建函数接收要创建组件定义
function create(Component, props) {

  // 创建一个Vue新实例例
  const vm = new Vue({
    render(h) {
      // render函数将传入组件配置对象转换为虚拟dom
      console.log(h(Component, { props }));
      return h(Component, { props });
    }
  }).$mount(); //执行挂载函数，但未指定挂载目标，表示只执行初始化工作

  // 将⽣生成dom元素追加⾄至body
  document.body.appendChild(vm.$el);

  // 给组件实例例添加销毁方法
  const comp = vm.$children[0];
  comp.remove = () => {
    document.body.removeChild(vm.$el);
    vm.$destroy();
  };
  return comp;
}

// 暴露调用接口
export default create;
```

##### 通知组件
```vue
// 创建通知组件， Notice.vue
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
      setTimeout(this.hide, this.duration);
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
```

##### 使用
```vue
<template>
  <div>
    <button @click="open"> 打开弹窗 </button>
  </div>
</template>
<script>
import creare from './create';
import Notice from './notice';
export default {
  name: 'notice',
  data(){
    return{
    }
  },
  methods: {
    // 打开弹窗
    open(){
      const notice = creare(Notice, {
        title: '标题1',
        message: '弹窗内容',
      }).show();
    },
  }
}
</script>
```