// create 函数用于创建指定组件实例并挂载到body

import Vue from 'vue';

// 创建函数接收要创建组件定义
function create(Component, props) {
  // 创建一个 vue 实例
  const vm = new Vue({
    render(h){
      // render 函数将传入组件配置对象转换为虚拟 dom
      // console.log(h(Component, { props }));
      return h(Component, { props });
    }
  }).$mount()  // 执行挂载函数，但未指定挂载目标，表示只执行初始工作

  // 将生成 dom 元素追加到 body
  document.body.appendChild(vm.$el);

  // 给组件实例添加销毁方法
  const comp = vm.$children[0];
  comp.remove = () => {
    document.body.removeChild(vm.$el);
    vm.$destroy();
  }

  return comp;
}

export default create;